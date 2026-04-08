import { NextRequest, NextResponse } from 'next/server';
import { analyzeWithAI } from '@/lib/services/nvidiaAI';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { imageBase64, language, ageGroup } = body;

    if (!imageBase64) {
      return NextResponse.json(
        { error: 'Image is required' },
        { status: 400 }
      );
    }

    if (!language || !ageGroup) {
      return NextResponse.json(
        { error: 'Language and ageGroup are required' },
        { status: 400 }
      );
    }

    // Extract base64 data if it includes data URL prefix
    const base64Data = imageBase64.includes(',')
      ? imageBase64.split(',')[1]
      : imageBase64;

    // Perform AI analysis with image
    const analysis = await analyzeWithAI({
      productData: null,
      imageBase64: base64Data,
      language,
      ageGroup,
    });

    return NextResponse.json({
      success: true,
      analysis,
    });
  } catch (error) {
    console.error('Image analysis error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to analyze image' },
      { status: 500 }
    );
  }
}
