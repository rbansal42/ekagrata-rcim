import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { apiVersion, dataset, projectId } from '../sanity/env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
})

// Helper function for generating image URLs with only the asset reference
const builder = imageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

// Helper to convert Sanity references to strings for compatibility with existing code
export function mapSanityResults<T>(results: any[]): T[] {
  return results.map(item => {
    // Convert _id to string (for compatibility with MongoDB ObjectId)
    if (item._id) {
      item._id = item._id.toString()
    }
    
    // Handle slug conversion
    if (item.slug && typeof item.slug === 'object' && item.slug.current) {
      item.slug = item.slug.current
    }
    
    // Convert references in arrays (like categories)
    if (item.categories && Array.isArray(item.categories)) {
      item.categories = item.categories.map((cat: any) => 
        typeof cat === 'object' && cat._id ? cat._id.toString() : cat
      )
    }
    
    return item as T
  })
} 