"use client";

import { useEffect, useState } from "react";

import { getProducts, getCategories } from "@/lib/api/fetcher";
import { Product, Category } from "@/types/index";
import { ProductsSection } from "@/components/sections/ProductsSection";

interface ProductFilters {
  category?: string;
  priceRange?: { min?: number; max?: number };
  sortBy?: string;
  page?: number;
  pageSize?: number;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<ProductFilters>({
    page: 1,
    pageSize: 12,
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const apiFilters: {
          page?: number;
          pageSize?: number;
          category?: string;
          minPrice?: number;
          maxPrice?: number;
        } = {
          page: filters.page,
          pageSize: filters.pageSize,
        };

        if (filters.category) {
          apiFilters.category = filters.category;
        }
        if (filters.priceRange) {
          if (filters.priceRange.min !== undefined)
            apiFilters.minPrice = filters.priceRange.min;
          if (filters.priceRange.max !== undefined)
            apiFilters.maxPrice = filters.priceRange.max;
        }

        const [productsRes, categoriesRes] = await Promise.all([
          getProducts(apiFilters),
          getCategories(),
        ]);

        setProducts(productsRes?.data || []);
        setCategories(categoriesRes?.data || []);
      } catch (error) {
        setProducts([]);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filters]);

  const handleFilterChange = (newFilters: Partial<ProductFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.05)_1px,transparent_0)] [background-size:40px_40px] -z-10" />

      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 mb-12">
          <h1 className="text-4xl font-bold text-gray-900 font-work-sans mb-2">
            Our Products
          </h1>
          <p className="text-gray-600 font-work-sans">
            Discover our curated collection of artisan products
          </p>
        </div>

        <ProductsSection
          categories={categories}
          filters={filters}
          loading={loading}
          products={products}
          onFilterChange={handleFilterChange}
        />
      </div>
    </div>
  );
}
