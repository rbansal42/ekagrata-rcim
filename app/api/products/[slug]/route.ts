import { NextRequest, NextResponse } from "next/server";

import clientPromise from "@/lib/mongodb";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const client = await clientPromise;
    const db = client.db();

    const product = await db.collection("products").findOne({ slug });

    if (!product) {
      return NextResponse.json({ data: null }, { status: 404 });
    }

    const formattedProduct = { ...product, _id: product._id.toString() };

    return NextResponse.json({ data: formattedProduct });
  } catch (error) {
    console.error("Error in GET /api/products/[slug]:", error);
    return NextResponse.error();
  }
}
