import { NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";

import { categories, products } from "@/lib/constants";

export async function POST() {
  try {
    const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017";
    const dbName = process.env.MONGO_DB_NAME || "ekagrata";

    const client = new MongoClient(mongoUri);

    await client.connect();
    const db = client.db(dbName);

    // Clean existing data
    await db.collection("categories").deleteMany({});
    await db.collection("products").deleteMany({});

    // Convert and insert categories
    const categoriesWithObjectIds = categories.map((category) => ({
      ...category,
      _id: new ObjectId(category._id),
    }));
    const categoriesResult = await db
      .collection("categories")
      .insertMany(categoriesWithObjectIds);

    // Convert and insert products
    const productsWithObjectIds = products.map((product) => ({
      ...product,
      _id: new ObjectId(product._id),
      categories: product.categories.map((catId) => new ObjectId(catId)),
    }));
    const productsResult = await db
      .collection("products")
      .insertMany(productsWithObjectIds);

    await client.close();

    return NextResponse.json({
      success: true,
      categoriesInserted: categoriesResult.insertedCount,
      productsInserted: productsResult.insertedCount,
    });
  } catch (error) {
    console.error("Seeding error:", error);

    return NextResponse.json(
      { success: false, error: "Seeding failed" },
      { status: 500 },
    );
  }
}
