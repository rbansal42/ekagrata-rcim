export async function getProducts(
  filters: {
    page?: number;
    pageSize?: number;
    category?: string;
    search?: string;
    minPrice?: number;
    maxPrice?: number;
  } = {},
) {
  const params = new URLSearchParams();

  if (filters.page) params.append("page", filters.page.toString());
  if (filters.pageSize) params.append("pageSize", filters.pageSize.toString());
  if (filters.category) params.append("category", filters.category);
  if (filters.search) params.append("search", filters.search);
  if (filters.minPrice !== undefined)
    params.append("minPrice", filters.minPrice.toString());
  if (filters.maxPrice !== undefined)
    params.append("maxPrice", filters.maxPrice.toString());
  const res = await fetch(`/api/products?${params.toString()}`);

  if (!res.ok) throw new Error("Failed to fetch products");

  return await res.json();
}

export async function getCategories() {
  const res = await fetch(`/api/categories`);

  if (!res.ok) throw new Error("Failed to fetch categories");

  return await res.json();
}
