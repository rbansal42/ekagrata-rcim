import { NextResponse } from "next/server";

import clientPromise from "@/lib/mongodb";

export async function GET(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("ekagrata");

    const categories = await db.collection("categories").find({}).toArray();
    // Convert _id to string
    const formattedCategories = categories.map((category) => ({
      ...category,
      _id: category._id.toString(),
    }));
    console.log("categories");
    console.log(formattedCategories);

    return NextResponse.json({ data: formattedCategories });
  } catch (error) {
    console.log("Error in GET /api/categories:", error);

    return NextResponse.error();
  }
}
