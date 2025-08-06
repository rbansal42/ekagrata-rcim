import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface Image {
  url: string;
  alternativeText?: string;
}

export interface Product {
  _id: string;
  name: string;
  slug: string;
  shortDescription: string;
  longDescription: string;
  price: number;
  images: Image[]; // local image paths
  featuredImage: Image;
  categories: string[];  // Array of category IDs
  featured: boolean;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  image: Image;
  products: string[];  // Array of product IDs
  featured: boolean;
  order: number;
}

export interface Story {
  _id: string;
  title: string;
  preview: string;
  content: string;
  image: Image;
}

export interface PaginationMeta {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface ProductFilters {
  categories?: string[];
  page?: number;
  pageSize?: number;
  search?: string;
}
