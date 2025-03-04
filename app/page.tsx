import Link from "next/link";
import { Suspense } from 'react'

import { Button } from "@heroui/button";
import { ProductCard } from "@/components/ui/ProductCard";
import { CategoryCard } from "@/components/ui/CategoryCard";
import { Category, Product } from "@/types/index";
// import clientPromise from '@/lib/mongodb'
import { getCategories, getFeaturedProducts, getHomePageData } from "@/lib/sanity.queries";

export const revalidate = 3600; // Revalidate every hour

// Replacing MongoDB functions with Sanity functions
// async function getProducts() {
//   try {
//     const client = await clientPromise
//     const db = client.db("ekagrata")  // replace with your database name
//     return await db.collection("products").find({}).toArray()
//   } catch (error) {
//     console.error('Failed to fetch products:', error)
//     return []
//   }
// }

// async function getCategories(): Promise<Category[]> {
//   try {
//     const client = await clientPromise;
//     const db = client.db("ekagrata");
//     const categories = await db.collection<Category>("categories").find({}).toArray();
    
//     return categories.map(category => ({
//       ...category,
//       _id: category._id.toString(),
//       products: category.products?.map(id => id.toString()) || []
//     }));
//   } catch (error) {
//     console.error('Failed to fetch categories:', error);
//     return [];
//   }
// }

// async function getFeaturedProducts(): Promise<Product[]> {
//   try {
//     const client = await clientPromise;
//     const db = client.db("ekagrata");
//     const products = await db.collection<Product>("products")
//       .find({ featured: true })
//       .toArray();

//     return products.map(product => ({
//       ...product,
//       _id: product._id.toString(),
//       categories: product.categories.map(id => id.toString())
//     }));
//   } catch (error) {
//     console.error('Failed to fetch featured products:', error);
//     return [];
//   }
// }

export default async function HomePage() {
  const [categories, featuredProducts, homePageData] = await Promise.all([
    getCategories(),
    getFeaturedProducts(),
    getHomePageData()
  ]);

  // Use homePageData if available, otherwise fallback to default content
  const heroTitle = homePageData?.heroTitle || "Empowering artisans, preserving heritage";
  const heroSubtitle = homePageData?.heroSubtitle || 
    "Connect directly with skilled local artisans and discover their unique handcrafted creations. Every purchase creates sustainable opportunities and supports their livelihoods.";
  const heroButtonText = homePageData?.heroButtonText || "Shop Artisan Products";
  
  // Use featured categories/products from homePageData if available, otherwise use all
  const displayCategories = homePageData?.featuredCategories || categories;
  const displayProducts = homePageData?.featuredProducts || featuredProducts;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative flex flex-col items-center justify-center text-center min-h-[80vh] sm:min-h-[90vh] px-4 sm:px-6 py-16 sm:py-32">
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-rose-100/30 via-transparent to-transparent opacity-70" />

          {/* Content */}
          <div className="relative flex flex-col items-center gap-6 sm:gap-12 max-w-5xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-light leading-tight">
              {heroTitle.split("artisans").length > 1 ? (
                <>
                  {heroTitle.split("artisans")[0]}
                  <span className="font-normal bg-gradient-to-r from-rose-900 via-rose-800 to-rose-900 bg-clip-text text-transparent">
                    artisans
                  </span>
                  {heroTitle.split("artisans")[1]}
                </>
              ) : (
                heroTitle
              )}
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl font-light leading-relaxed tracking-wide px-2 sm:px-0">
              {heroSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-2 sm:mt-4 w-full sm:w-auto">
              <Button
                as="a"
                className="bg-rose-900 hover:bg-rose-800 text-white font-light px-8 sm:px-10 py-5 sm:py-7 text-base sm:text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto"
                href="/products"
                size="lg"
              >
                {heroButtonText}
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 sm:flex sm:flex-row flex-wrap justify-center gap-4 sm:gap-12 mt-8 text-xs sm:text-sm text-gray-600 px-4">
              <div className="flex items-center gap-2 sm:gap-3 justify-center">
                <span className="text-rose-900">✦</span>
                <span className="font-light tracking-wide">
                  100% Authentic
                </span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 justify-center">
                <span className="text-rose-900">✦</span>
                <span className="font-light tracking-wide">
                  Direct Support
                </span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 justify-center col-span-2 sm:col-span-1">
                <span className="text-rose-900">✦</span>
                <span className="font-light tracking-wide">
                  Sustainable Practices
                </span>
              </div>
            </div>

            {/* Initiative Text */}
            <div className="text-sm text-gray-600 font-light tracking-wide mt-8">
              An Initiative by{" "}
              <span className="text-rose-900">
                Rotaract Club of Ingenious Minds
              </span>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <span className="text-rose-900 opacity-50">↓</span>
          </div>
        </section>

        {/* Categories Section */}
        {displayCategories.length > 0 && (
          <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              Browse Categories
            </h2>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {displayCategories.map((category: Category) => (
                <CategoryCard 
                  key={category._id.toString()} 
                  category={{
                    ...category,
                    _id: category._id.toString(),
                  } as Category} 
                />
              ))}
            </div>
          </section>
        )}

        {/* Featured Products Section */}
        {displayProducts.length > 0 && (
          <section className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-rose-50/50 to-transparent rounded-3xl" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.05)_1px,transparent_0)] [background-size:40px_40px]" />

            <div className="relative">
              <div className="flex flex-col items-center text-center mb-16">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 font-work-sans mb-4">
                  Featured Artisan Products
                </h2>
                <p className="text-gray-600 max-w-2xl font-work-sans">
                  Discover our handpicked selection of exceptional artisan
                  creations, each piece telling a unique story of craftsmanship
                  and heritage.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {displayProducts.slice(0, 4).map((product: Product) => (
                  <ProductCard key={product._id} featured product={product} />
                ))}
              </div>

              <div className="mt-16 text-center">
                <Link
                  className="inline-flex items-center px-8 py-3 rounded-xl bg-rose-900 text-white font-work-sans hover:bg-rose-800 transition-colors shadow-lg hover:shadow-xl"
                  href="/products"
                >
                  View All Products
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Value Proposition Section */}
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto h-12 w-12 text-gray-900">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="mt-6 text-lg font-medium text-gray-900">
                Authentic Craftsmanship
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Every piece tells a story of tradition, skill, and dedication
                passed down through generations
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto h-12 w-12 text-gray-900">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="mt-6 text-lg font-medium text-gray-900">
                Direct from Artisans
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Support skilled craftspeople directly and learn about their unique
                creative processes
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto h-12 w-12 text-gray-900">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="mt-6 text-lg font-medium text-gray-900">
                Preserving Heritage
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Each purchase helps preserve India&apos;s rich cultural heritage
                and traditional craft forms
              </p>
            </div>
          </div>
        </section>
      </main>
    </Suspense>
  );
}
