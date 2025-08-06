"use client";

import { FC, useEffect, useState } from "react";
import { Button } from "@heroui/button";
import { Card } from "@heroui/card";
import { CardBody } from "@heroui/card";
import { Image } from "@heroui/image";

import { Product, Category } from "@/types/index";
import { WhatsappIcon } from "@/components/icons/WhatsappIcon";
import { getCategories } from "@/lib/api/fetcher";
import { urlFor } from "@/lib/sanity.client";

interface ProductDetailProps {
  product: Product;
}

interface ImageItem {
  image: any;
  isFeatured: boolean;
  id: string;
}

export const ProductDetail: FC<ProductDetailProps> = ({ product }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getCategories();
        setCategories(res?.data || []);
      } catch (error) {
        console.log("Failed to fetch categories:", error);
        setCategories([]);
      }
    };

    // Set the initial selected image to the featured image
    if (product.featuredImage) {
      setSelectedImageId(getImageId(product.featuredImage));
    } else if (product.images && product.images.length > 0) {
      setSelectedImageId(getImageId(product.images[0]));
    }

    fetchCategories();
  }, [product]);

  const handleWhatsAppOrder = () => {
    const whatsappNumber = process.env.NEXT_PUBLIC_CONTACT_WHATSAPP || "+919927399296";
    const message = encodeURIComponent(`Hello! I'm interested in ordering "${product.name}".`);
    window.open(`https://wa.me/${whatsappNumber.replace(/\D/g, "")}?text=${message}`, "_blank");
  };

  // Get category names for the product
  const productCategories = categories.filter((cat) =>
    product.categories.includes(cat._id),
  );
  
  // Helper function to get image URL
  const getImageUrl = (image: any): string => {
    if (!image) return '/placeholder.png';
    if (typeof image === 'object' && 'asset' in image) {
      return urlFor(image).url();
    }
    return typeof image === 'string' ? image : image.url;
  };

  // Helper function to get unique image ID
  const getImageId = (image: any): string => {
    if (!image) return '';
    
    // For Sanity images with asset object
    if (typeof image === 'object' && image.asset) {
      // Check if it's a Sanity asset with _ref
      if (image.asset._ref) {
        return image.asset._ref;
      }
      // Check if it has _id
      if (image.asset._id) {
        return image.asset._id;
      }
      // Fallback to URL if available
      if (image.url) {
        return image.url;
      }
    }
    
    // For direct URL strings
    if (typeof image === 'string') {
      return image;
    }
    
    // For objects with url property
    if (typeof image === 'object' && image.url) {
      return image.url;
    }
    
    // Final fallback
    return JSON.stringify(image);
  };

  // Get all unique images (featured + additional, avoiding duplicates)
  const getAllImages = (): ImageItem[] => {
    const images: ImageItem[] = [];
    const imageIds = new Set<string>();

    // Add featured image first if it exists
    if (product.featuredImage) {
      const featuredId = getImageId(product.featuredImage);
      if (featuredId && !imageIds.has(featuredId)) {
        images.push({ image: product.featuredImage, isFeatured: true, id: featuredId });
        imageIds.add(featuredId);
      }
    }

    // Add additional images, avoiding duplicates
    if (product.images) {
      product.images.forEach((img) => {
        const imgId = getImageId(img);
        if (imgId && !imageIds.has(imgId)) {
          images.push({ image: img, isFeatured: false, id: imgId });
          imageIds.add(imgId);
        }
      });
    }

    return images;
  };

  const allImages = getAllImages();
  
  // Get the currently selected image object
  const selectedImage = allImages.find(img => img.id === selectedImageId)?.image || product.featuredImage;

  const handleImageClick = (imageId: string) => {
    setSelectedImageId(imageId);
  };

  return (
    <div className="container max-w-7xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-6">
          <div className="relative aspect-square w-full">
            <Card className="w-full h-full overflow-hidden bg-white/30 backdrop-blur-md border border-white/20">
              <CardBody className="p-0">
                <Image
                  alt={product.name}
                  className="w-full h-full object-cover"
                  height={600}
                  src={getImageUrl(selectedImage)}
                  width={600}
                />
              </CardBody>
            </Card>
          </div>

          {/* Image Thumbnails */}
          {allImages.length > 1 && (
            <div className="grid grid-cols-4 gap-4">
              {allImages.map(({ image, isFeatured, id }, index) => (
                <Card
                  key={id}
                  className={`aspect-square overflow-hidden bg-white/30 backdrop-blur-md border cursor-pointer ${
                    id === selectedImageId ? 'border-rose-500 ring-2 ring-rose-500' : 'border-white/20 hover:border-rose-300'
                  }`}
                  onClick={() => handleImageClick(id)}
                >
                  <CardBody 
                    className="p-0 cursor-pointer"
                    onClick={() => handleImageClick(id)}
                  >
                    <Image
                      alt={
                        image.alternativeText ||
                        `${product.name} ${isFeatured ? 'featured' : ''} image ${index + 1}`
                      }
                      className="w-full h-full object-cover pointer-events-none"
                      height={150}
                      src={getImageUrl(image)}
                      width={150}
                    />
                  </CardBody>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div className="bg-white/30 backdrop-blur-md rounded-3xl p-8 border border-white/20">
            <h1 className="text-4xl font-light mb-4 tracking-wide font-work-sans">
              {product.name}
            </h1>
            <p className="text-2xl font-semibold mb-6 text-rose-600">
              ₹{product.price}
            </p>

            {/* Short Description */}
            <div className="prose prose-lg max-w-none mb-4 font-work-sans font-medium">
              <p>{product.shortDescription}</p>
            </div>

            {/* Long Description */}
            <div className="prose prose-lg max-w-none mb-8 font-work-sans font-light">
              <p>{product.longDescription}</p>
            </div>

            {/* Categories */}
            {productCategories.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-medium mb-4">Categories</h2>
                <div className="flex flex-wrap gap-2">
                  {productCategories.map((category: Category) => (
                    <span
                      key={category._id}
                      className="px-3 py-1 bg-rose-100 text-rose-800 rounded-full text-sm font-work-sans"
                    >
                      {category.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Order Button */}
            <Button
              className="w-full md:w-auto font-work-sans"
              color="primary"
              size="lg"
              startContent={<WhatsappIcon className="w-5 h-5" />}
              variant="solid"
              onClick={handleWhatsAppOrder}
            >
              Order via WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
