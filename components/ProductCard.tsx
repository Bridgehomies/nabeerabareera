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
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [hoverIndex, setHoverIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const { addToCart } = useCart();
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  const imageUrls = product.images?.map((img) => `${API_URL}${img}`) || ["/placeholder.svg"];

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
      id: product._id,
      name: product.name,
      price: product.salePrice || product.price,
      image: imageUrls[0],
      quantity: 1,
      color: product.colors?.[0] || null,
    });
    toast.success(`${product.name} added to cart`);
  };

  return (
    <div className="relative w-64 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl group">
      {/* Doodle Accent */}
      <CircleDoodle className="absolute top-2 left-2 text-gold opacity-10 w-10 h-10" />

      {/* Badges */}
      <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
        {product.isNew && (
          <span className="bg-gold text-black px-2 py-1 text-[10px] font-semibold uppercase tracking-widest rounded-sm">
            New
          </span>
        )}
        {product.isSale && product.discount && (
          <span className="bg-red-700 text-white px-2 py-1 text-[10px] font-semibold uppercase tracking-widest rounded-sm">
            {product.discount}% Off
          </span>
        )}
        {product.isFeatured && (
          <span className="bg-amber-600 text-white px-2 py-1 text-[10px] font-semibold uppercase tracking-widest rounded-sm">
            Featured
          </span>
        )}
      </div>

      {/* Product Image - FIXED SIZE CONTAINER */}
      <Link href={`/product/${product._id}`} className="block">
        <div className="w-64 h-64 relative">
          <Image
            src={imageUrls[hoverIndex]}
            alt={product.name}
            fill
            sizes="256px"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            onError={(e) => (e.currentTarget.src = "/placeholder.svg")}
          />
        </div>
      </Link>

      {/* Category */}
      <p className="mt-3 text-xs text-gray-500 uppercase tracking-widest ml-4">{product.category}</p>

      {/* Product Name */}
      <h3 className="text-base font-serif font-bold mt-1 ml-4 line-clamp-1">{product.name}</h3>

      {/* Price */}
      <div className="mt-2 ml-4">
        {product.isSale && product.salePrice ? (
          <>
            <span className="text-lg font-bold text-gold">${product.salePrice.toFixed(2)}</span>
            <span className="ml-2 text-sm text-gray-400 line-through">${product.price.toFixed(2)}</span>
          </>
        ) : (
          <span className="text-lg font-bold text-gold">${product.price.toFixed(2)}</span>
        )}
      </div>

      {/* Ratings */}
      <div className="flex items-center mt-2 ml-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={14}
            className={`${i < Math.round(product.rating) ? "text-yellow-400" : "text-gray-300"} fill-current`}
          />
        ))}
        <span className="ml-2 text-xs text-gray-500">({product.reviews})</span>
      </div>

      {/* Stock */}
      <p
        className={`mt-2 ml-4 text-xs font-medium ${
          product.inStock ? "text-emerald-600" : "text-rose-600"
        }`}
      >
        {product.inStock ? "In Stock" : "Out of Stock"}
      </p>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        disabled={!product.inStock}
        aria-label={`Add ${product.name} to cart`}
        className={`mt-4 w-[calc(100%-2rem)] mx-auto mb-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
          product.inStock
            ? "bg-black text-white hover:bg-gold hover:text-black"
            : "bg-gray-200 text-gray-500 cursor-not-allowed"
        }`}
      >
        Add to Cart
      </button>
    </div>
  );
}