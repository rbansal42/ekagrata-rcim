import { NextResponse } from "next/server";

// import clientPromise from "@/lib/mongodb";
import { getProducts } from "@/lib/sanity.queries";

export async function GET(request: Request) {
  try {
    // Extract query parameters
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page') ? parseInt(searchParams.get('page')!) : 1;
    const pageSize = searchParams.get('pageSize') ? parseInt(searchParams.get('pageSize')!) : 10;
    const category = searchParams.get('category') || undefined;
    const search = searchParams.get('search') || undefined;
    const minPrice = searchParams.get('minPrice') ? parseInt(searchParams.get('minPrice')!) : undefined;
    const maxPrice = searchParams.get('maxPrice') ? parseInt(searchParams.get('maxPrice')!) : undefined;

    // Get products from Sanity
    const products = await getProducts();

    // Apply filtering
    let filteredProducts = [...products];
    
    // Filter by category
    if (category) {
      filteredProducts = filteredProducts.filter(product => 
        product.categories.includes(category)
      );
    }

    // Filter by search term
    if (search) {
      const searchLower = search.toLowerCase();
      filteredProducts = filteredProducts.filter(product => 
        product.name.toLowerCase().includes(searchLower) || 
        product.shortDescription.toLowerCase().includes(searchLower)
      );
    }

    // Filter by price
    if (minPrice !== undefined) {
      filteredProducts = filteredProducts.filter(product => product.price >= minPrice);
    }
    if (maxPrice !== undefined) {
      filteredProducts = filteredProducts.filter(product => product.price <= maxPrice);
    }

    // Paginate
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    return NextResponse.json({ 
      data: paginatedProducts,
      meta: {
        total: filteredProducts.length,
        page,
        pageSize,
        pageCount: Math.ceil(filteredProducts.length / pageSize)
      }
    });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
