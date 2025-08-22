"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import { CircleDoodle } from "@/components/ui-brutalist/doodles";

export type Product = {
  _id: string;
  name: string;
  price: number;
  salePrice?: number | null;
  description?: string;
  images?: string[];
  category: string;
  subcategory?: string;
  inStock: boolean;
  dateAdded: string;
  rating: number;
  reviews: number;
  isSale?: boolean;
  isNew?: boolean;
  isFeatured?: boolean;
  discount?: number;
  colors?: string[];
  sizes?: string[];
};

interface ProductCardProps {
  product: any; // Use 'any' to handle the inconsistent incoming data
}

export default function ProductCard({ product }: ProductCardProps) {
  // Map the inconsistent incoming data to the expected 'Product' type
  const mappedProduct = {
    _id: product.id || product._id,
    name: product.title || product.name,
    price: product.price,
    salePrice: product.sale_price || product.salePrice,
    description: product.description,
    images: product.images,
    category: product.metadata?.category || "N/A",
    inStock: (product.stock !== undefined && product.stock > 0) || (product.inStock !== undefined ? product.inStock : false),
    dateAdded: product.dateAdded, // Assuming this exists or can be defaulted
    rating: product.metadata?.rating || 0,
    reviews: product.metadata?.reviews || 0,
    isSale: product.isSale || product.on_sale,
    isNew: product.isNew,
    isFeatured: product.isFeatured,
    discount: product.discount,
    colors: product.colors,
    sizes: product.sizes,
  };

  const [hoverIndex, setHoverIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const { addToCart } = useCart();
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  const imageUrls =
    mappedProduct.images?.map((img: string) =>
      img.startsWith("http") ? img : `${API_URL}${img}`
    ) || ["/placeholder.svg"];

  // Hover image cycling
  useEffect(() => {
    if (imageUrls.length > 1) {
      intervalRef.current = setInterval(() => {
        setHoverIndex((prev) => (prev + 1) % imageUrls.length);
      }, 2000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [imageUrls]);

  const handleAddToCart = () => {
    addToCart({
      id: mappedProduct._id,
      name: mappedProduct.name,
      price: mappedProduct.salePrice || mappedProduct.price,
      image: imageUrls[0],
      quantity: 1,
      color: mappedProduct.colors?.[0] || null,
    });
    toast.success(`${mappedProduct.name} added to cart`);
  };

  return (
    <div className="relative w-64 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl group">
      {/* Doodle Accent */}
      <CircleDoodle className="absolute top-2 left-2 text-gold opacity-10 w-10 h-10" />

      {/* Badges */}
      <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
        {mappedProduct.isNew && (
          <span className="bg-gold text-black px-2 py-1 text-[10px] font-semibold uppercase tracking-widest rounded-sm">
            New
          </span>
        )}
        {mappedProduct.isSale && mappedProduct.discount && (
          <span className="bg-red-700 text-white px-2 py-1 text-[10px] font-semibold uppercase tracking-widest rounded-sm">
            {mappedProduct.discount}% Off
          </span>
        )}
        {mappedProduct.isFeatured && (
          <span className="bg-amber-600 text-white px-2 py-1 text-[10px] font-semibold uppercase tracking-widest rounded-sm">
            Featured
          </span>
        )}
      </div>

      {/* Product Image - FIXED SIZE CONTAINER */}
      <Link href={`/product/${mappedProduct._id}`} className="block">
        <div className="w-64 h-64 relative">
          <Image
            src={imageUrls[hoverIndex]}
            alt={mappedProduct.name}
            fill
            sizes="256px"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            onError={() => setHoverIndex(0)}
          />
        </div>
      </Link>

      {/* Category */}
      <p className="mt-3 text-xs text-gray-500 uppercase tracking-widest ml-4">{mappedProduct.category}</p>

      {/* Product Name */}
      <h3 className="text-base font-serif font-bold mt-1 ml-4 line-clamp-1">{mappedProduct.name}</h3>

      {/* Price */}
      <div className="mt-2 ml-4">
        {mappedProduct.isSale && mappedProduct.salePrice ? (
          <>
            <span className="text-lg font-bold text-gold">${mappedProduct.salePrice.toFixed(2)}</span>
            <span className="ml-2 text-sm text-gray-400 line-through">${mappedProduct.price.toFixed(2)}</span>
          </>
        ) : (
          <span className="text-lg font-bold text-gold">${mappedProduct.price.toFixed(2)}</span>
        )}
      </div>

      {/* Ratings */}
      <div className="flex items-center mt-2 ml-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={14}
            aria-label="rating-star"
            className={`${i < Math.round(mappedProduct.rating) ? "text-yellow-400" : "text-gray-300"} fill-current`}
          />
        ))}
        <span className="ml-2 text-xs text-gray-500">({mappedProduct.reviews})</span>
      </div>

      {/* Stock */}
      <p
        className={`mt-2 ml-4 text-xs font-medium ${
          mappedProduct.inStock ? "text-emerald-600" : "text-rose-600"
        }`}
      >
        {mappedProduct.inStock ? "In Stock" : "Out of Stock"}
      </p>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        disabled={!mappedProduct.inStock}
        aria-label={`Add ${mappedProduct.name} to cart`}
        className={`mt-4 w-[calc(100%-2rem)] mx-auto mb-4 py-2 items-center flex pl-4 text-sm font-medium rounded-lg transition-all duration-300 ${
          mappedProduct.inStock
            ? "bg-red-500 text-white hover:bg-gold hover:text-white hover:bg-black/90"
            : "bg-gray-200 text-gray-500 cursor-not-allowed"
        }`}
      >
        Add to Cart
      </button>
    </div>
  );
}