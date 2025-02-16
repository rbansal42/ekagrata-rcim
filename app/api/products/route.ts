import { NextResponse } from "next/server";

import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("ekagrata");
    
    const products = await db.collection("products").find({}).toArray();
    
    return NextResponse.json({ data: products });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
