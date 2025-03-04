// This script migrates data from MongoDB to Sanity
// Run with: node scripts/migrate-to-sanity.js

import { createClient } from '@sanity/client'
import fetch from 'node-fetch'
import { MongoClient } from 'mongodb'
import fs from 'fs'
import path from 'path'

// Sanity client configuration
const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2023-05-03',
  token: process.env.SANITY_API_TOKEN, // Need a write token
  useCdn: false,
})

// MongoDB connection
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017'
const dbName = process.env.MONGO_DB_NAME || 'ekagrata'

async function uploadImageToSanity(imagePath) {
  try {
    // For images in the public folder
    const fullPath = path.join(process.cwd(), 'public', imagePath)
    const imageBuffer = fs.readFileSync(fullPath)
    const fileName = path.basename(imagePath)
    
    // Upload to Sanity
    return await sanityClient.assets.upload('image', imageBuffer, {
      filename: fileName
    })
  } catch (error) {
    console.error(`Failed to upload image ${imagePath}:`, error)
    return null
  }
}

async function migrateCategories(mongoDb) {
  try {
    console.log('Migrating categories...')
    const categories = await mongoDb.collection('categories').find({}).toArray()
    
    for (const category of categories) {
      console.log(`Processing category: ${category.name}`)
      
      // Upload category image
      let imageAsset = null
      if (category.image && category.image.url) {
        console.log(`Uploading image: ${category.image.url}`)
        imageAsset = await uploadImageToSanity(category.image.url)
      }
      
      // Create category document
      await sanityClient.create({
        _id: `category-${category._id}`, // Avoid ID collisions
        _type: 'category',
        name: category.name,
        slug: {
          _type: 'slug',
          current: category.slug
        },
        description: category.description || '',
        image: imageAsset ? {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: imageAsset._id
          },
          alternativeText: category.image.alternativeText || ''
        } : undefined,
        featured: category.featured || false,
        order: category.order || 999
      })
      
      console.log(`Category ${category.name} migrated successfully`)
    }
    
    console.log('All categories migrated successfully!')
  } catch (error) {
    console.error('Error migrating categories:', error)
  }
}

async function migrateProducts(mongoDb) {
  try {
    console.log('Migrating products...')
    const products = await mongoDb.collection('products').find({}).toArray()
    
    for (const product of products) {
      console.log(`Processing product: ${product.name}`)
      
      // Upload product images
      const imageAssets = []
      for (const image of product.images || []) {
        if (image.url) {
          console.log(`Uploading image: ${image.url}`)
          const imageAsset = await uploadImageToSanity(image.url)
          if (imageAsset) {
            imageAssets.push({
              _type: 'image',
              asset: {
                _type: 'reference',
                _ref: imageAsset._id
              },
              alternativeText: image.alternativeText || ''
            })
          }
        }
      }
      
      // Upload featured image
      let featuredImageAsset = null
      if (product.featuredImage) {
        console.log(`Uploading featured image: ${product.featuredImage}`)
        featuredImageAsset = await uploadImageToSanity(product.featuredImage)
      }
      
      // Create product document
      await sanityClient.create({
        _id: `product-${product._id}`, // Avoid ID collisions
        _type: 'product',
        name: product.name,
        slug: {
          _type: 'slug',
          current: product.slug
        },
        shortDescription: product.shortDescription || '',
        longDescription: [{
          _type: 'block',
          _key: 'longDesc',
          style: 'normal',
          markDefs: [],
          children: [
            {
              _type: 'span',
              _key: 'longDesc-span',
              text: product.longDescription || '',
              marks: []
            }
          ]
        }],
        price: product.price || 0,
        images: imageAssets,
        featuredImage: featuredImageAsset ? {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: featuredImageAsset._id
          }
        } : undefined,
        categories: (product.categories || []).map(catId => ({
          _type: 'reference',
          _ref: `category-${catId}`
        })),
        featured: product.featured || false
      })
      
      console.log(`Product ${product.name} migrated successfully`)
    }
    
    console.log('All products migrated successfully!')
  } catch (error) {
    console.error('Error migrating products:', error)
  }
}

async function createHomePage() {
  try {
    console.log('Creating home page document...')
    
    // Create a default home page document
    await sanityClient.create({
      _id: 'homePage',
      _type: 'homePage',
      heroTitle: 'Empowering artisans, preserving heritage',
      heroSubtitle: 'Connect directly with skilled local artisans and discover their unique handcrafted creations. Every purchase creates sustainable opportunities and supports their livelihoods.',
      heroButtonText: 'Shop Artisan Products',
      featuredCategories: [],
      featuredProducts: [],
      storySection: {
        title: 'Artisan Stories',
        description: 'Meet the skilled artisans behind our products and learn about their craft.'
      }
    })
    
    console.log('Home page document created successfully!')
  } catch (error) {
    console.error('Error creating home page:', error)
  }
}

async function migrateToSanity() {
  let mongoClient
  
  try {
    console.log('Connecting to MongoDB...')
    mongoClient = new MongoClient(mongoUri)
    await mongoClient.connect()
    console.log('Connected to MongoDB')
    
    const db = mongoClient.db(dbName)
    
    // Run migrations
    await migrateCategories(db)
    await migrateProducts(db)
    await createHomePage()
    
    console.log('Migration completed successfully!')
  } catch (error) {
    console.error('Migration failed:', error)
  } finally {
    if (mongoClient) {
      await mongoClient.close()
      console.log('MongoDB connection closed')
    }
  }
}

// Run the migration
migrateToSanity() 