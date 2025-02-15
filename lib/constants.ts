import { Product, Category } from "../types";

// Define categories based on the folder structure in public/uploads/products
// Each child folder (e.g. 'mugs') represents a category. The image in the category folder is used as the category image.

export const categories: Category[] = [
  {
    _id: "65f1e8b1a3d92c7a4e5f3d9a",
    name: "Mugs",
    description: "A collection of artisan handcrafted mugs and teacups.",
    slug: "mugs",
    image: {
      url: "/uploads/products/Mugs/category.png",
      alternativeText: "Artisan Mugs Category",
    },
    products: [
      "65f1e8b1a3d92c7a4e5f3d9b",
      "65f1e8b1a3d92c7a4e5f3d9c",
      "65f1e8b1a3d92c7a4e5f3d9d",
      "65f1e8b1a3d92c7a4e5f3d9e",
      "65f1e8b1a3d92c7a4e5f3d9f",
      "65f1e8b1a3d92c7a4e5f3da0",
      "65f1e8b1a3d92c7a4e5f3da1",
      "65f1e8b1a3d92c7a4e5f3da2",
      "65f1e8b1a3d92c7a4e5f3da3",
      "65f1e8b1a3d92c7a4e5f3da4",
    ],
    featured: true,
    order: 1,
  },
];

// Define products based on subfolders within each category folder.
// For example, 'mug 1' and 'mug 2' under the 'mugs' category.

export const products: Product[] = [
  {
    _id: "65f1e8b1a3d92c7a4e5f3d9b",
    name: "Mystic Nomad Mug Set",
    slug: "mystic-nomad-mug-set",
    shortDescription:
      "Handcrafted ceramic mugs with intricate geometric patterns.",
    longDescription:
      "This stunning pair of handcrafted ceramic mugs features intricate geometric patterns inspired by traditional art. The vibrant mix of red, blue, and yellow designs stands out beautifully against the earthy ceramic base, making them a perfect gift for coffee or tea enthusiasts.",
    price: 180,
    images: [
      {
        url: "/uploads/products/Mugs/Mystic Nomad Mug Set/SmartBG_2025-02-13_0ae6a92e-fd8a-4459-bf37-f539323e5d6c.png",
        alternativeText: "Mystic Nomad Mug Set - View 1",
      },
      {
        url: "/uploads/products/Mugs/Mystic Nomad Mug Set/SmartBG_2025-02-13_a3a699f5-6893-4fc4-b57f-0c34dbe76437.png",
        alternativeText: "Mystic Nomad Mug Set - View 2",
      },
      {
        url: "/uploads/products/Mugs/Mystic Nomad Mug Set/SmartBG_2025-02-13_c9b20a06-f64a-4aac-8392-845f9c66ad96.png",
        alternativeText: "Mystic Nomad Mug Set - View 3",
      },
      {
        url: "/uploads/products/Mugs/Mystic Nomad Mug Set/SmartBG_2025-02-13_e3ccd0ff-8a7d-41e4-8f5e-465106479746.png",
        alternativeText: "Mystic Nomad Mug Set - View 4",
      },
    ],
    featuredImage:
      "/uploads/products/Mugs/Mystic Nomad Mug Set/SmartBG_2025-02-13_0ae6a92e-fd8a-4459-bf37-f539323e5d6c.png",
    categories: ["65f1e8b1a3d92c7a4e5f3d9a"],
    featured: true,
  },
  {
    _id: "65f1e8b1a3d92c7a4e5f3d9c",
    name: "Vintage Petal Teacup",
    slug: "vintage-petal-teacup",
    shortDescription: "Elegant teacup with vintage floral patterns.",
    longDescription:
      "A delicate teacup featuring vintage-inspired petal designs, perfect for your afternoon tea ritual. Each piece is carefully crafted to bring elegance to your tea time.",
    price: 150,
    images: [
      {
        url: "/uploads/products/Mugs/Vintage Petal Teacup/SmartBG_2025-02-13_04c0ff7d-3777-4f36-8a16-2f4966faebb8.png",
        alternativeText: "Vintage Petal Teacup - View 1",
      },
      {
        url: "/uploads/products/Mugs/Vintage Petal Teacup/SmartBG_2025-02-13_05308bdd-bbd9-4d43-b72c-de27e36d71b1.png",
        alternativeText: "Vintage Petal Teacup - View 2",
      },
      {
        url: "/uploads/products/Mugs/Vintage Petal Teacup/SmartBG_2025-02-13_210b0826-6c82-4dba-ae89-77af53036344.png",
        alternativeText: "Vintage Petal Teacup - View 3",
      },
    ],
    featuredImage:
      "/uploads/products/Mugs/Vintage Petal Teacup/SmartBG_2025-02-13_04c0ff7d-3777-4f36-8a16-2f4966faebb8.png",
    categories: ["65f1e8b1a3d92c7a4e5f3d9a"],
    featured: false,
  },
  {
    _id: "65f1e8b1a3d92c7a4e5f3d9d",
    name: "Whimsy Wing Teacup",
    slug: "whimsy-wing-teacup",
    shortDescription: "Whimsical teacup with delicate wing-like handles.",
    longDescription:
      "A charming teacup that features unique wing-inspired handles and delicate patterns. Perfect for adding a touch of whimsy to your tea time.",
    price: 160,
    images: [
      {
        url: "/uploads/products/Mugs/Whimsy wing Teacup/SmartBG_2025-02-13_6b80dfad-9af1-4c0f-b39c-6a41f369c029.png",
        alternativeText: "Whimsy Wing Teacup - View 1",
      },
      {
        url: "/uploads/products/Mugs/Whimsy wing Teacup/SmartBG_2025-02-13_9a5c984c-79c0-4125-ae25-61597f988417.png",
        alternativeText: "Whimsy Wing Teacup - View 2",
      },
      {
        url: "/uploads/products/Mugs/Whimsy wing Teacup/SmartBG_2025-02-13_a26fcbe3-99c1-4fb3-a052-5aca39acac09.png",
        alternativeText: "Whimsy Wing Teacup - View 3",
      },
      {
        url: "/uploads/products/Mugs/Whimsy wing Teacup/SmartBG_2025-02-13_f88f5938-f0a5-4486-adf0-d1e3f50b2cef.png",
        alternativeText: "Whimsy Wing Teacup - View 4",
      },
    ],
    featuredImage:
      "/uploads/products/Mugs/Whimsy wing Teacup/SmartBG_2025-02-13_f88f5938-f0a5-4486-adf0-d1e3f50b2cef.png",
    categories: ["65f1e8b1a3d92c7a4e5f3d9a"],
    featured: true,
  },
  {
    _id: "65f1e8b1a3d92c7a4e5f3d9e",
    name: "Berry Blossom Teacup",
    slug: "berry-blossom-teacup",
    shortDescription: "Delicate teacup with berry and blossom motifs.",
    longDescription:
      "A beautifully designed teacup featuring delicate berry and blossom patterns. Each piece is handcrafted to bring nature's beauty to your tea time.",
    price: 155,
    images: [
      {
        url: "/uploads/products/Mugs/Berry Blossom Teacup/SmartBG_2025-02-13_102f387e-1709-4b7c-aa97-4490b7fd7e17.png",
        alternativeText: "Berry Blossom Teacup - View 1",
      },
      {
        url: "/uploads/products/Mugs/Berry Blossom Teacup/SmartBG_2025-02-13_453a7d0d-627b-4975-9e3e-d39a20f3d516.png",
        alternativeText: "Berry Blossom Teacup - View 2",
      },
      {
        url: "/uploads/products/Mugs/Berry Blossom Teacup/SmartBG_2025-02-13_c6d09210-7444-4e81-8a65-41c2eb9ff057.png",
        alternativeText: "Berry Blossom Teacup - View 3",
      },
    ],
    featuredImage:
      "/uploads/products/Mugs/Berry Blossom Teacup/SmartBG_2025-02-13_453a7d0d-627b-4975-9e3e-d39a20f3d516.png",
    categories: ["65f1e8b1a3d92c7a4e5f3d9a"],
    featured: false,
  },
  {
    _id: "65f1e8b1a3d92c7a4e5f3d9f",
    name: "Daisy Charm Mug",
    slug: "daisy-charm-mug",
    shortDescription: "Charming mug with daisy flower accents.",
    longDescription:
      "A delightful mug adorned with charming daisy patterns, bringing a touch of spring to your beverage experience. Perfect for both hot and cold drinks.",
    price: 145,
    images: [
      {
        url: "/uploads/products/Mugs/Daisy Charm Mug/SmartBG_2025-02-13_72fadbb4-e825-4900-9768-7b3bd45f9873.png",
        alternativeText: "Daisy Charm Mug - View 1",
      },
      {
        url: "/uploads/products/Mugs/Daisy Charm Mug/Untitled Project (1).jpg",
        alternativeText: "Daisy Charm Mug - View 2",
      },
    ],
    featuredImage:
      "/uploads/products/Mugs/Daisy Charm Mug/SmartBG_2025-02-13_72fadbb4-e825-4900-9768-7b3bd45f9873.png",
    categories: ["65f1e8b1a3d92c7a4e5f3d9a"],
    featured: true,
  },
  {
    _id: "65f1e8b1a3d92c7a4e5f3da0",
    name: "Phantom Sips Mug",
    slug: "phantom-sips-mug",
    shortDescription: "Mysterious mug with ethereal design patterns.",
    longDescription:
      "An enigmatic mug featuring ethereal patterns that seem to shift in the light. Perfect for those who appreciate unique and mysterious aesthetics.",
    price: 165,
    images: [
      {
        url: "/uploads/products/Mugs/Phantom Sips Mug/SmartBG_2025-02-13_445c894f-fc81-4797-8c1e-c414b91a29a6.png",
        alternativeText: "Phantom Sips Mug - View 1",
      },
      {
        url: "/uploads/products/Mugs/Phantom Sips Mug/SmartBG_2025-02-13_95deb9a9-fdad-48f0-aad9-dd952509cfd3.png",
        alternativeText: "Phantom Sips Mug - View 2",
      },
    ],
    featuredImage:
      "/uploads/products/Mugs/Phantom Sips Mug/SmartBG_2025-02-13_95deb9a9-fdad-48f0-aad9-dd952509cfd3.png",
    categories: ["65f1e8b1a3d92c7a4e5f3d9a"],
    featured: false,
  },
  {
    _id: "65f1e8b1a3d92c7a4e5f3da1",
    name: "Love Mug",
    slug: "love-mug",
    shortDescription: "Romantic mug with heart-themed designs.",
    longDescription:
      "A love-inspired mug featuring beautiful heart patterns and romantic motifs. Perfect for couples or anyone who wants to add a touch of love to their daily routine.",
    price: 170,
    images: [
      {
        url: "/uploads/products/Mugs/Love Mug/SmartBG_2025-02-13_4155630e-ac9e-4dca-b479-8f416db2177f.png",
        alternativeText: "Love Mug - View 1",
      },
      {
        url: "/uploads/products/Mugs/Love Mug/SmartBG_2025-02-13_89269272-0c09-43dc-9a55-9e1defb4703f.png",
        alternativeText: "Love Mug - View 2",
      },
      {
        url: "/uploads/products/Mugs/Love Mug/SmartBG_2025-02-13_a90bdf18-6e06-4405-b420-6ed20916c81d.png",
        alternativeText: "Love Mug - View 3",
      },
    ],
    featuredImage:
      "/uploads/products/Mugs/Love Mug/SmartBG_2025-02-13_4155630e-ac9e-4dca-b479-8f416db2177f.png",
    categories: ["65f1e8b1a3d92c7a4e5f3d9a"],
    featured: true,
  },
  {
    _id: "65f1e8b1a3d92c7a4e5f3da2",
    name: "Blue Bubble Bliss",
    slug: "blue-bubble-bliss",
    shortDescription: "Playful mug with bubble-inspired patterns in blue.",
    longDescription:
      "A cheerful mug featuring playful bubble patterns in various shades of blue. The perfect blend of fun and elegance for your daily beverages.",
    price: 155,
    images: [
      {
        url: "/uploads/products/Mugs/Blue Bubble Bliss/SmartBG_2025-02-13_dba1fe27-2a5c-44b1-b3d4-fa0182c590c6.png",
        alternativeText: "Blue Bubble Bliss - View 1",
      },
      {
        url: "/uploads/products/Mugs/Blue Bubble Bliss/SmartBG_2025-02-13_f786ee4d-1d32-4e94-90a9-9f9655ec93b6.png",
        alternativeText: "Blue Bubble Bliss - View 2",
      },
    ],
    featuredImage:
      "/uploads/products/Mugs/Blue Bubble Bliss/SmartBG_2025-02-13_f786ee4d-1d32-4e94-90a9-9f9655ec93b6.png",
    categories: ["65f1e8b1a3d92c7a4e5f3d9a"],
    featured: false,
  },
  {
    _id: "65f1e8b1a3d92c7a4e5f3da3",
    name: "Royal Mosaic Mug Set",
    slug: "royal-mosaic-mug-set",
    shortDescription: "Set of 2 mugs with royal mosaic patterns.",
    longDescription:
      "A regal set of two mugs featuring intricate mosaic patterns inspired by royal art. Each piece is carefully crafted to bring majesty to your coffee or tea time.",
    price: 190,
    images: [
      {
        url: "/uploads/products/Mugs/Royal Mosaic Mug Set (Set of 2)/SmartBG_2025-02-13_6897f17c-bf91-4ae4-9e9f-9c736ed1986f.png",
        alternativeText: "Royal Mosaic Mug Set - View 1",
      },
      {
        url: "/uploads/products/Mugs/Royal Mosaic Mug Set (Set of 2)/SmartBG_2025-02-13_dd1cd8d8-ab9e-4f69-bf4f-ec4b6780f92e.png",
        alternativeText: "Royal Mosaic Mug Set - View 2",
      },
    ],
    featuredImage:
      "/uploads/products/Mugs/Royal Mosaic Mug Set (Set of 2)/SmartBG_2025-02-13_dd1cd8d8-ab9e-4f69-bf4f-ec4b6780f92e.png",
    categories: ["65f1e8b1a3d92c7a4e5f3d9a"],
    featured: true,
  },
  {
    _id: "65f1e8b1a3d92c7a4e5f3da4",
    name: "Terracotta Bloom",
    slug: "terracotta-bloom",
    shortDescription: "Earthy terracotta mug with blooming flower designs.",
    longDescription:
      "A beautiful terracotta mug featuring blooming flower patterns. The earthy tones and natural aesthetics make it perfect for those who appreciate organic beauty.",
    price: 175,
    images: [
      {
        url: "/uploads/products/Mugs/Terracotta Bloom/SmartBG_2025-02-13_d7b54e5e-3a71-497a-8005-456f87c9cc8f.png",
        alternativeText: "Terracotta Bloom - View 1",
      },
      {
        url: "/uploads/products/Mugs/Terracotta Bloom/SmartBG_2025-02-13_f15098e3-ee10-40eb-8e0f-a386c45705c6.png",
        alternativeText: "Terracotta Bloom - View 2",
      },
    ],
    featuredImage:
      "/uploads/products/Mugs/Terracotta Bloom/SmartBG_2025-02-13_f15098e3-ee10-40eb-8e0f-a386c45705c6.png",
    categories: ["65f1e8b1a3d92c7a4e5f3d9a"],
    featured: false,
  },
];
