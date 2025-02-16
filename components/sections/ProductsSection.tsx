/* Minimal ProductsSection component implementation */
"use client";

import React, { useEffect } from "react";
import { Slider } from "@heroui/react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import { Product, Category } from "@/types/index";

interface ProductsSectionProps {
  products: Product[];
  categories: Category[];
  loading: boolean;
  filters: {
    category?: string;
    priceRange?: { min?: number; max?: number };
    sortBy?: string;
    page?: number;
    pageSize?: number;
  };
  onFilterChange: (
    newFilters: Partial<ProductsSectionProps["filters"]>,
  ) => void;
}

const ProductsSection: React.FC<ProductsSectionProps> = ({
  products,
  categories,
  loading,
  filters,
  onFilterChange,
}) => {
  const maxPrice = Math.max(...products.map((p) => p.price), 10000);
  const minPrice = Math.min(...products.map((p) => p.price), 0);

  useEffect(() => {
    // Initialize price range if not set
    if (!filters.priceRange) {
      onFilterChange({
        priceRange: { min: minPrice, max: maxPrice },
      });
    }
  }, []);

  const handlePriceRangeChange = (value: number | number[]) => {
    if (Array.isArray(value) && value.length === 2) {
      onFilterChange({
        priceRange: { min: value[0], max: value[1] },
      });
    }
  };

  const handleCategoryChange = (categoryId: string) => {
    onFilterChange({
      category: categoryId === filters.category ? undefined : categoryId,
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filter Sidebar */}
        <div className="w-full md:w-1/4">
          <div className="sticky top-24 space-y-6 p-6 rounded-xl bg-white/90 backdrop-blur-xl border border-white/30 shadow-lg">
            <div>
              <h3 className="text-lg font-semibold mb-4 font-work-sans">
                Categories
              </h3>
              <div className="space-y-2">
                <button
                  className={`w-full text-left px-4 py-2.5 rounded-lg transition-all duration-300 font-work-sans ${
                    !filters.category
                      ? "bg-gray-900 text-white shadow-md"
                      : "hover:bg-gray-100/80 hover:shadow-sm"
                  }`}
                  onClick={() => onFilterChange({ category: undefined })}
                >
                  All Products
                </button>
                {categories.map((category) => (
                  <button
                    key={category._id}
                    className={`w-full text-left px-4 py-2.5 rounded-lg transition-all duration-300 font-work-sans ${
                      filters.category === category._id
                        ? "bg-gray-900 text-white shadow-md"
                        : "hover:bg-gray-100/80 hover:shadow-sm"
                    }`}
                    onClick={() => handleCategoryChange(category._id)}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 font-work-sans">
                Price Range
              </h3>
              <div className="px-2 space-y-4">
                <Slider
                  className="max-w-full"
                  defaultValue={[
                    filters.priceRange?.min || minPrice,
                    filters.priceRange?.max || maxPrice,
                  ]}
                  formatOptions={{ style: "currency", currency: "INR" }}
                  label="Price Range"
                  maxValue={maxPrice}
                  minValue={minPrice}
                  step={100}
                  onChange={handlePriceRangeChange}
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>₹{filters.priceRange?.min?.toLocaleString("en-IN") || minPrice}</span>
                  <span>₹{filters.priceRange?.max?.toLocaleString("en-IN") || maxPrice}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product, index) => (
                <motion.div
                  key={product._id}
                  animate={{ opacity: 1, y: 0 }}
                  className="group relative bg-white/90 backdrop-blur-xl rounded-xl overflow-hidden border border-white/30 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
                  initial={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="aspect-square overflow-hidden">
                    <Image
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      src={
                        product.featuredImage ||
                        product.images?.[0]?.url ||
                        "/placeholder.png"
                      }
                      width={600}
                      height={600}
                    />
                  </div>
                  <div className="p-6">
                    <h2 className="text-xl font-semibold mb-2 line-clamp-1 font-work-sans">
                      {product.name}
                    </h2>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2 font-work-sans">
                      {product.shortDescription}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold font-work-sans">
                        ₹{product.price.toLocaleString("en-IN")}
                      </span>
                      <Link
                        className="inline-flex items-center text-rose-800 text-sm font-work-sans"
                        href={`/products/${product.slug}`}
                      >
                        View Details
                        <svg
                          className="w-4 h-4 ml-2 transform transition-transform group-hover:translate-x-1"
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
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 bg-white/90 backdrop-blur-xl rounded-xl border border-white/30 shadow-lg">
              <p className="text-gray-500 font-work-sans">
                No products available.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export { ProductsSection };
