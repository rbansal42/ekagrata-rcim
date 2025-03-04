import Image from "next/image";
import Link from "next/link";

import { Product } from "@/types/index";
import { urlFor } from "@/lib/sanity.client";

interface ProductCardProps {
  product: Product;
  featured?: boolean;
}

export function ProductCard({ product, featured = false }: ProductCardProps) {
  return (
    <div className="group relative">
      <Link
        href={`/products/${product.slug}`}
        className="block relative bg-white/90 backdrop-blur-xl rounded-xl overflow-hidden border border-white/30 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
      >
        <div className="relative">
          {featured && (
            <div className="absolute top-4 left-4 z-10">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-rose-100 text-rose-800 font-work-sans">
                Featured
              </span>
            </div>
          )}
          <div className="aspect-[4/3] overflow-hidden">
            {product.featuredImage ? (
              <Image
                alt={product.name}
                className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                height={300}
                src={typeof product.featuredImage === 'object' 
                  ? urlFor(product.featuredImage).url() 
                  : product.featuredImage}
                width={400}
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center bg-gray-100/50 text-gray-400">
                <svg
                  fill="none"
                  height="48"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="48"
                >
                  <rect height="18" rx="2" ry="2" width="18" x="3" y="3" />
                  <line x1="3" x2="21" y1="9" y2="9" />
                  <line x1="9" x2="9" y1="21" y2="9" />
                </svg>
              </div>
            )}
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-xl font-semibold mb-2 text-gray-900 font-work-sans line-clamp-1">
            {product.name}
          </h3>
          <p className="text-gray-600 text-sm mb-4 font-work-sans line-clamp-2">
            {product.shortDescription}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-gray-900 font-work-sans">
              ₹{product.price.toLocaleString("en-IN")}
            </span>
            <span className="inline-flex items-center text-rose-800 text-sm font-work-sans">
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
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
