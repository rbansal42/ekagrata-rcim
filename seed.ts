import { MongoClient, ObjectId } from "mongodb";

import { categories, products } from "./lib/constants";

async function seedData() {
  // Use MONGO_URI and MONGO_DB_NAME from environment variables, or fall back to defaults
  const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017";
  const dbName = process.env.MONGO_DB_NAME || "ekagrata";

  console.log("Connecting to MongoDB...");
  const client = new MongoClient(mongoUri);

  try {
    await client.connect();
    console.log("Connected to MongoDB");
    const db = client.db(dbName);

    // Get collections for categories and products
    const categoriesCollection = db.collection("categories");
    const productsCollection = db.collection("products");

    // Clean existing data
    console.log("Deleting old data...");
    await categoriesCollection.deleteMany({});
    await productsCollection.deleteMany({});

    // Convert string IDs to ObjectIds for categories
    const categoriesWithObjectIds = categories.map((category) => ({
      ...category,
      _id: new ObjectId(category._id),
    }));

    // Convert string IDs to ObjectIds for products
    const productsWithObjectIds = products.map((product) => ({
      ...product,
      _id: new ObjectId(product._id),
      categories: product.categories.map((catId) => new ObjectId(catId)),
    }));

    // Insert categories
    console.log("Seeding categories...");
    const resultCategories = await categoriesCollection.insertMany(
      categoriesWithObjectIds,
    );

    console.log(`Inserted categories: ${resultCategories.insertedCount}`);

    // Insert products
    console.log("Seeding products...");
    const resultProducts = await productsCollection.insertMany(
      productsWithObjectIds,
    );

    console.log(`Inserted products: ${resultProducts.insertedCount}`);

    console.log("Seeding completed successfully!");
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    await client.close();
  }
}

seedData();
