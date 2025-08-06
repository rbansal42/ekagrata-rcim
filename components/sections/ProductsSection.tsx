/* Minimal ProductsSection component implementation */
"use client";

import React, { useEffect, useCallback, Suspense } from "react";
import { Slider } from "@heroui/react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import debounce from "lodash/debounce";

import { Product, Category, PaginationMeta } from "@/types/index";
import { urlFor } from "@/lib/sanity.client";

interface ProductsSectionProps {
  products: Product[];
  categories: Category[];
  loading: boolean;
  productsLoading?: boolean;
  paginationMeta: PaginationMeta | null;
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

function ProductsSectionContent({
  products,
  categories,
  loading,
  productsLoading = false,
  paginationMeta,
  filters,
  onFilterChange,
}: ProductsSectionProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const maxPrice = Math.max(...products.map((p: Product) => p.price), 10000);
  const minPrice = Math.min(...products.map((p: Product) => p.price), 0);

  // Update URL when filters change
  const updateURL = useCallback((newFilters: Partial<ProductsSectionProps["filters"]>) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (newFilters.category !== undefined) {
      if (newFilters.category) {
        params.set('category', newFilters.category);
      } else {
        params.delete('category');
      }
    }
    
    if (newFilters.priceRange) {
      if (newFilters.priceRange.min !== undefined) {
        params.set('minPrice', newFilters.priceRange.min.toString());
      } else {
        params.delete('minPrice');
      }
      if (newFilters.priceRange.max !== undefined) {
        params.set('maxPrice', newFilters.priceRange.max.toString());
      } else {
        params.delete('maxPrice');
      }
    }
    
    if (newFilters.page !== undefined) {
      if (newFilters.page > 1) {
        params.set('page', newFilters.page.toString());
      } else {
        params.delete('page');
      }
    }
    
    const newURL = `/products?${params.toString()}`;
    router.replace(newURL, { scroll: false });
  }, [router, searchParams]);

  useEffect(() => {
    // Initialize price range if not set
    if (!filters.priceRange) {
      onFilterChange({
        priceRange: { min: minPrice, max: maxPrice },
      });
    }
  }, []);

  // Helper function to get image URL
  const getImageUrl = (image: any) => {
    if (!image) return '/placeholder.png';
    if (typeof image === 'object' && 'asset' in image) {
      return urlFor(image).url();
    }
    return typeof image === 'string' ? image : image.url;
  };

  // Debounced price range handler
  const debouncedPriceRangeChange = useCallback(
    debounce((value: number[]) => {
      const newFilters = {
        priceRange: { min: value[0], max: value[1] },
        page: 1, // Reset to first page when filters change
      };
      onFilterChange(newFilters);
      updateURL(newFilters);
    }, 500),
    [onFilterChange, updateURL]
  );

  const handlePriceRangeChange = (value: number | number[]) => {
    if (Array.isArray(value) && value.length === 2) {
      debouncedPriceRangeChange(value);
    }
  };

  const handleCategoryChange = (categoryId: string) => {
    const newFilters = {
      category: categoryId === filters.category ? undefined : categoryId,
      page: 1, // Reset to first page when category changes
    };
    onFilterChange(newFilters);
    updateURL(newFilters);
  };

  const handlePageChange = (newPage: number) => {
    const newFilters = { page: newPage };
    onFilterChange(newFilters);
    updateURL(newFilters);
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
                  onClick={() => {
                    const newFilters = { category: undefined, page: 1 };
                    onFilterChange(newFilters);
                    updateURL(newFilters);
                  }}
                >
                  All Products
                </button>
                {categories.map((category: Category) => (
                  <button
                    key={category._id}
                    className={`w-full text-left px-4 py-2.5 rounded-lg transition-all duration-300 font-work-sans ${
                      filters.category === category.slug
                        ? "bg-gray-900 text-white shadow-md"
                        : "hover:bg-gray-100/80 hover:shadow-sm"
                    }`}
                    onClick={() => handleCategoryChange(category.slug)}
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
              <div className="px-2">
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
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid and Pagination */}
        <div className="flex-1">
          {productsLoading ? (
            <div className="flex items-center justify-center min-h-[60vh]">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900" />
            </div>
          ) : products.length > 0 ? (
            <>
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
                        src={getImageUrl(product.featuredImage) || 
                          (product.images?.[0] && getImageUrl(product.images?.[0])) ||
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

              {/* Pagination Controls */}
              {paginationMeta && paginationMeta.pageCount > 1 && (
                <div className="mt-12 flex items-center justify-center">
                  <div className="flex items-center gap-4 bg-white/90 backdrop-blur-xl rounded-xl border border-white/30 shadow-lg px-6 py-4">
                    {/* Previous Button */}
                    <button
                      onClick={() => handlePageChange(paginationMeta.page - 1)}
                      disabled={paginationMeta.page <= 1}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 font-work-sans ${
                        paginationMeta.page <= 1
                          ? "text-gray-400 cursor-not-allowed"
                          : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      }`}
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M15 19l-7-7 7-7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                        />
                      </svg>
                      Previous
                    </button>

                    {/* Page Info */}
                    <div className="text-sm text-gray-600 font-work-sans">
                      Page {paginationMeta.page} of {paginationMeta.pageCount}
                    </div>

                    {/* Next Button */}
                    <button
                      onClick={() => handlePageChange(paginationMeta.page + 1)}
                      disabled={paginationMeta.page >= paginationMeta.pageCount}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 font-work-sans ${
                        paginationMeta.page >= paginationMeta.pageCount
                          ? "text-gray-400 cursor-not-allowed"
                          : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      }`}
                    >
                      Next
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M9 5l7 7-7 7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </>
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
}

const ProductsSection: React.FC<ProductsSectionProps> = (props) => {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900" />
      </div>
    }>
      <ProductsSectionContent {...props} />
    </Suspense>
  );
};

export { ProductsSection };
