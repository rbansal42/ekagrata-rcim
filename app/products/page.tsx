"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

import { getProducts, getCategories } from "@/lib/api/fetcher";
import { Product, Category, PaginationMeta } from "@/types/index";
import { ProductsSection } from "@/components/sections/ProductsSection";

interface ProductFilters {
  category?: string;
  sortBy?: string;
  page?: number;
  pageSize?: number;
}

function ProductsPageContent() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [productsLoading, setProductsLoading] = useState(false);
  const [paginationMeta, setPaginationMeta] = useState<PaginationMeta | null>(null);
  const [filters, setFilters] = useState<ProductFilters>({
    page: 1,
    pageSize: 12,
  });

  // Initialize filters from URL parameters
  useEffect(() => {
    const categoryFromUrl = searchParams.get('category');
    const pageFromUrl = searchParams.get('page');
    
    const newFilters: Partial<ProductFilters> = {};
    
    if (categoryFromUrl) {
      newFilters.category = categoryFromUrl;
    }
    
    if (pageFromUrl) {
      newFilters.page = parseInt(pageFromUrl);
    }
    
    if (Object.keys(newFilters).length > 0) {
      setFilters(prev => ({
        ...prev,
        ...newFilters
      }));
    }
  }, [searchParams]);

  // Initial data load - fetch both products and categories
  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true);
      try {
        const apiFilters: {
          page?: number;
          pageSize?: number;
          category?: string;
        } = {
          page: filters.page,
          pageSize: filters.pageSize,
        };

        if (filters.category) {
          apiFilters.category = filters.category;
        }

        const [productsRes, categoriesRes] = await Promise.all([
          getProducts(apiFilters),
          getCategories(),
        ]);

        setProducts(productsRes?.data || []);
        setCategories(categoriesRes?.data || []);
        setPaginationMeta(productsRes?.meta || null);
      } catch (error) {
        setProducts([]);
        setCategories([]);
        setPaginationMeta(null);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []); // Only run on initial mount

  // Filter-based data load - fetch only products
  useEffect(() => {
    // Skip if this is the initial load (categories not loaded yet)
    if (categories.length === 0) return;

    const fetchProducts = async () => {
      setProductsLoading(true);
      try {
        const apiFilters: {
          page?: number;
          pageSize?: number;
          category?: string;
        } = {
          page: filters.page,
          pageSize: filters.pageSize,
        };

        if (filters.category) {
          apiFilters.category = filters.category;
        }

        const productsRes = await getProducts(apiFilters);
        setProducts(productsRes?.data || []);
        setPaginationMeta(productsRes?.meta || null);
      } catch (error) {
        setProducts([]);
        setPaginationMeta(null);
      } finally {
        setProductsLoading(false);
      }
    };

    fetchProducts();
  }, [filters, categories.length]); // Run when filters change (but not on initial load)

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
          productsLoading={productsLoading}
          products={products}
          paginationMeta={paginationMeta}
          onFilterChange={handleFilterChange}
        />
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900" />
      </div>
    }>
      <ProductsPageContent />
    </Suspense>
  );
}
