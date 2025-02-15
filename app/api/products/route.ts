import { NextResponse } from "next/server";

import clientPromise from "@/lib/mongodb";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const pageSize = parseInt(searchParams.get("pageSize") || "12");
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const minPriceParam = searchParams.get("minPrice");
    const maxPriceParam = searchParams.get("maxPrice");

    const client = await clientPromise;
    const db = client.db();

    const query: any = {};

    if (category) {
      // Assuming product.categories is an array of category slugs
      query.categories = category;
    }
    if (search) {
      // Search by product name, case-insensitive
      query.name = { $regex: search, $options: "i" };
    }
    if (minPriceParam || maxPriceParam) {
      query.price = {};
      if (minPriceParam) query.price.$gte = parseFloat(minPriceParam);
      if (maxPriceParam) query.price.$lte = parseFloat(maxPriceParam);
    }

    const total = await db.collection("products").countDocuments(query);
    const products = await db
      .collection("products")
      .find(query)
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .toArray();

    const formattedProducts = products.map((product) => ({
      ...product,
      _id: product._id.toString(),
    }));

    const pageCount = Math.ceil(total / pageSize);

    return NextResponse.json({
      data: formattedProducts,
      meta: { pagination: { page, pageSize, pageCount, total } },
    });
  } catch (error) {
    console.log("Error in GET /api/products:", error);

    return NextResponse.error();
  }
}
