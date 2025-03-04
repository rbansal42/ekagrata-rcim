import { NextResponse } from "next/server";

// import clientPromise from "@/lib/mongodb";
import { getCategories } from "@/lib/sanity.queries";

export async function GET(request: Request) {
  try {
    // Get categories from Sanity
    const categories = await getCategories();
    
    // Categories are already formatted by our mapSanityResults helper function
    return NextResponse.json({ data: categories });
  } catch (error) {
    console.log("Error in GET /api/categories:", error);

    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}
