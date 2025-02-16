import { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProductDetail } from "@/components/sections/ProductDetail";
import clientPromise from "@/lib/mongodb";
import { Product } from "@/types/index";

type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

async function getProduct(slug: string): Promise<Product | null> {
  try {
    const client = await clientPromise;
    const db = client.db("ekagrata");
    const product = await db.collection<Product>("products").findOne({ slug });
    if (!product) return null;
    return {
      ...product,
      _id: product._id.toString(),
      categories: product.categories.map(id => id.toString()),
    };
  } catch (error) {
    console.error("Failed to fetch product:", error);
    return null;
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const { slug } = await params;
    const product = await getProduct(slug);

    if (!product) {
      return {
        title: "Product Not Found | Ekagrata",
      };
    }

    return {
      title: `${product.name} | Ekagrata`,
      description: product.shortDescription,
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Error | Ekagrata",
    };
  }
}

export default async function ProductPage({ params, searchParams }: PageProps) {
  try {
    const [{ slug }, queryParams] = await Promise.all([params, searchParams]);
    const product = await getProduct(slug);

    if (!product) {
      notFound();
    }

    return <ProductDetail product={product} />;
  } catch (error) {
    console.error("Error loading product page:", error);
    notFound();
  }
}
