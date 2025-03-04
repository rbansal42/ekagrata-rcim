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

export const ProductDetail: FC<ProductDetailProps> = ({ product }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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

    // Set the initial selected image to the featured image or first image
    if (product.featuredImage) {
      setSelectedImage(
        typeof product.featuredImage === 'object' 
          ? urlFor(product.featuredImage).url() 
          : product.featuredImage
      );
    } else if (product.images && product.images.length > 0) {
      setSelectedImage(product.images[0].url);
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
  const getImageUrl = (image: any) => {
    if (!image) return '/placeholder.png';
    if (typeof image === 'object' && 'asset' in image) {
      return urlFor(image).url();
    }
    return typeof image === 'string' ? image : image.url;
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
                  src={selectedImage || getImageUrl(product.featuredImage) || (product.images[0] && getImageUrl(product.images[0]))}
                  width={600}
                />
              </CardBody>
            </Card>
          </div>

          {/* Additional Images */}
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <Card
                  key={index}
                  className={`aspect-square overflow-hidden bg-white/30 backdrop-blur-md border cursor-pointer ${
                    getImageUrl(image) === selectedImage ? 'border-rose-500 ring-2 ring-rose-500' : 'border-white/20 hover:border-rose-300'
                  }`}
                  onClick={() => setSelectedImage(getImageUrl(image))}
                >
                  <CardBody className="p-0">
                    <Image
                      alt={
                        image.alternativeText ||
                        `${product.name} image ${index + 1}`
                      }
                      className="w-full h-full object-cover"
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
