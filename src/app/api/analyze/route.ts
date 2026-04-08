import { NextRequest, NextResponse } from 'next/server';
import { analyzeWithAI } from '@/lib/services/nvidiaAI';
import { fetchProduct } from '@/lib/services/openFoodFacts';
import { db } from '@/lib/db';

// Set max duration for this API route (for Vercel/serverless)
// 300 seconds = 5 minutes to match NVIDIA API timeout
export const maxDuration = 300;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { barcode, productData, language, ageGroup } = body;

    if (!language || !ageGroup) {
      return NextResponse.json(
        { error: 'Language and ageGroup are required' },
        { status: 400 }
      );
    }

    let dataToAnalyze = productData;

    // If barcode provided, fetch from Open Food Facts
    if (barcode && !productData) {
      const offData = await fetchProduct(barcode);

      if (offData.status === 1 && offData.product) {
        dataToAnalyze = offData.product;
      } else {
        return NextResponse.json(
          { error: 'Product not found. Please provide product data manually.' },
          { status: 404 }
        );
      }
    }

    if (!dataToAnalyze) {
      return NextResponse.json(
        { error: 'Either barcode or productData is required' },
        { status: 400 }
      );
    }

    // Check cache for existing analysis
    const cacheKey = barcode
      ? { barcode, language, ageGroup }
      : { productData: JSON.stringify(dataToAnalyze), language, ageGroup };

    const existingAnalysis = await db.analysisResult.findFirst({
      where: {
        barcode: barcode || null,
        language,
        ageGroup,
        productData: JSON.stringify(dataToAnalyze),
      },
      orderBy: { createdAt: 'desc' },
    });

    // Cache is valid for 7 days
    const CACHE_TTL = 7 * 24 * 60 * 60 * 1000;
    if (existingAnalysis && Date.now() - existingAnalysis.createdAt.getTime() < CACHE_TTL) {
      return NextResponse.json({
        success: true,
        cached: true,
        analysis: JSON.parse(existingAnalysis.analysisData),
      });
    }

    // Perform AI analysis
    const analysis = await analyzeWithAI({
      productData: dataToAnalyze,
      imageBase64: null,
      language,
      ageGroup,
    });

    // Save to cache
    await db.analysisResult.create({
      data: {
        barcode: barcode || null,
        productData: JSON.stringify(dataToAnalyze),
        analysisData: JSON.stringify(analysis),
        language,
        ageGroup,
      },
    });

    return NextResponse.json({
      success: true,
      cached: false,
      analysis,
    });
  } catch (error) {
    console.error('Analysis error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to analyze product' },
      { status: 500 }
    );
  }
}
