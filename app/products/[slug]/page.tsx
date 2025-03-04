import { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProductDetail } from "@/components/sections/ProductDetail";
import { getProductBySlug } from "@/lib/sanity.queries";
import { Product } from "@/types/index";

type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const { slug } = await params;
    const product = await getProductBySlug(slug);

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
    const product = await getProductBySlug(slug);

    if (!product) {
      notFound();
    }

    return <ProductDetail product={product} />;
  } catch (error) {
    console.error("Error loading product page:", error);
    notFound();
  }
}
