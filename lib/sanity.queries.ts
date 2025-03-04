import { Category, Product, Story } from '@/types'
import { client, mapSanityResults } from './sanity.client'

export async function getProducts(): Promise<Product[]> {
  const products = await client.fetch(`
    *[_type == "product"] {
      _id,
      name,
      slug,
      shortDescription,
      "longDescription": coalesce(pt::text(longDescription), ''),
      price,
      "images": images[] {
        "url": asset->url,
        "alternativeText": alternativeText,
        "asset": asset
      },
      featuredImage,
      "categories": categories[]->_id,
      featured
    }
  `)
  
  return mapSanityResults<Product>(products)
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const products = await client.fetch(`
    *[_type == "product" && slug.current == $slug] {
      _id,
      name,
      slug,
      shortDescription,
      "longDescription": coalesce(pt::text(longDescription), ''),
      price,
      "images": images[] {
        "url": asset->url,
        "alternativeText": alternativeText,
        "asset": asset
      },
      featuredImage,
      "categories": categories[]->_id,
      featured
    }
  `, { slug })
  
  const mappedProducts = mapSanityResults<Product>(products)
  return mappedProducts.length > 0 ? mappedProducts[0] : null
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const products = await client.fetch(`
    *[_type == "product" && featured == true] {
      _id,
      name,
      slug,
      shortDescription,
      price,
      featuredImage,
      "categories": categories[]->_id,
      featured
    }
  `)
  
  return mapSanityResults<Product>(products)
}

export async function getCategories(): Promise<Category[]> {
  const categories = await client.fetch(`
    *[_type == "category"] | order(order asc) {
      _id,
      name,
      slug,
      description,
      image,
      "products": *[_type == "product" && references(^._id)]._id,
      featured,
      order
    }
  `)
  
  return mapSanityResults<Category>(categories)
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const categories = await client.fetch(`
    *[_type == "category" && slug.current == $slug] {
      _id,
      name,
      slug,
      description,
      image,
      "products": *[_type == "product" && references(^._id)]._id,
      featured,
      order
    }
  `, { slug })
  
  const mappedCategories = mapSanityResults<Category>(categories)
  return mappedCategories.length > 0 ? mappedCategories[0] : null
}

export async function getStories(): Promise<Story[]> {
  const stories = await client.fetch(`
    *[_type == "story"] {
      _id,
      title,
      preview,
      "content": pt::text(content),
      image
    }
  `)
  
  return mapSanityResults<Story>(stories)
}

export async function getHomePageData() {
  const homePage = await client.fetch(`
    *[_type == "homePage"][0] {
      heroTitle,
      heroSubtitle,
      heroButtonText,
      "featuredCategories": featuredCategories[]-> {
        _id,
        name,
        slug,
        description,
        image,
        featured,
        order
      },
      "featuredProducts": featuredProducts[]-> {
        _id,
        name,
        slug,
        shortDescription,
        price,
        featuredImage,
        featured
      },
      storySection
    }
  `)
  
  return homePage ? {
    ...homePage,
    featuredCategories: mapSanityResults<Category>(homePage.featuredCategories || []),
    featuredProducts: mapSanityResults<Product>(homePage.featuredProducts || [])
  } : null
} 