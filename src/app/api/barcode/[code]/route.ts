import { NextRequest, NextResponse } from 'next/server';
import { fetchProduct, extractProductInfo } from '@/lib/services/openFoodFacts';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  try {
    const { code } = await params;

    if (!code || !/^\d+$/.test(code)) {
      return NextResponse.json(
        { error: 'Invalid barcode format. Please enter numbers only.' },
        { status: 400 }
      );
    }

    console.log(`Looking up barcode: ${code}`);
    const data = await fetchProduct(code);

    if (data.status !== 1 || !data.product) {
      return NextResponse.json(
        { 
          error: data.error || 'Product not found in Open Food Facts database. Try uploading a photo for AI analysis instead.',
          code,
          suggestion: 'Use the Upload tab to analyze a product image with AI.'
        },
        { status: 404 }
      );
    }

    const productInfo = extractProductInfo(data);

    if (!productInfo) {
      return NextResponse.json(
        { error: 'Could not extract product information.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      barcode: code,
      product: productInfo,
      raw: data.product,
      source: data.fromCache ? 'cache' : data.fromSampleData ? 'sample' : 'api',
    });
  } catch (error) {
    console.error('Barcode lookup error:', error);
    
    // Handle JSON parsing errors specifically
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { 
          error: 'Invalid response from product database. The service may be temporarily unavailable. Please try the Upload tab to analyze with AI instead.',
          suggestion: 'Use the Upload tab to upload a product image for AI-powered analysis.'
        },
        { status: 502 }
      );
    }
    
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch product data' },
      { status: 500 }
    );
  }
}
