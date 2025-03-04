import { NextRequest, NextResponse } from "next/server";

// import clientPromise from "@/lib/mongodb";
import { getProductBySlug } from "@/lib/sanity.queries";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    
    // Get product from Sanity
    const product = await getProductBySlug(slug);

    if (!product) {
      return NextResponse.json({ data: null }, { status: 404 });
    }

    return NextResponse.json({ data: product });
  } catch (error) {
    console.error("Error in GET /api/products/[slug]:", error);
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}
