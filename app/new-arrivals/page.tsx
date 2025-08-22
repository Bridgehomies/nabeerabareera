"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Filter, ArrowUpDown, Star, X } from "lucide-react";
import { FiShoppingCart } from "react-icons/fi";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

// ---- Types ----
export type Product = {
  _id: string;
  name: string;
  price: number;
  salePrice?: number | null;
  discount?: number;
  isSale?: boolean;
  isNew?: boolean;
  category: string;
  subcategory?: string;
  image: string;
  inStock: boolean;
  dateAdded: string;
  rating: number;
  reviews: number;
};

type ProductApiResponse = {
  id: string;
  name: string;
  title?: string;
  price: number;
  sale_price: number | null;
  category: string;
  stock: number;
  inStock: boolean;
  created_at: string;
  images: string[];
  metadata: {
    category: string;
    subcategories: string[];
    isSale: boolean;
    isNew: boolean;
    rating: number;
    reviews: number;
  };
};

// ---- Configs ----
const SORT_OPTIONS = [
  { value: "newest", label: "Newest" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
];

export default function NewArrivalsPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortOption, setSortOption] = useState("newest");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [expandedProductIds, setExpandedProductIds] = useState<Set<string>>(new Set());
  const { addToCart } = useCart();

  // ---- Fetch Products ----
  // ---- Fetch Products ----
useEffect(() => {
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      if (!apiUrl) throw new Error("API URL not configured");

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const res = await fetch(`${apiUrl}/products/`, {
        signal: controller.signal,
        headers: { "Content-Type": "application/json" },
      });

      clearTimeout(timeoutId);

      if (!res.ok) throw new Error(`Failed to fetch products: ${res.status}`);

      const data: ProductApiResponse[] = await res.json();
      const now = Date.now();
      const thirtyDaysInMs = 30 * 24 * 60 * 60 * 1000;

      const transformedData: Product[] = data.map((p) => {
          const primaryImage = p.images?.[0] || "/placeholder.svg";
          const createdAt = new Date(p.created_at).getTime();
          const isNew =
            p.metadata?.isNew ||
            (Date.now() - new Date(p.created_at).getTime()) / (1000 * 3600 * 24) <= 90;

          return {
            ...p,
            _id: p.id,
            name: p.name || p.title || "Unnamed Product", // ✅ fallback for missing names
            price: p.price,
            salePrice: p.sale_price,
            category: p.metadata?.category || p.category || "uncategorized",
            subcategory: p.metadata?.subcategories?.[0],
            image: primaryImage,
            inStock: typeof p.inStock !== "undefined" ? p.inStock : p.stock > 0, // ✅ fallback
            dateAdded: p.created_at,
            rating: p.metadata?.rating ?? 0,
            reviews: p.metadata?.reviews ?? 0,
            isNew,
            isSale: p.metadata?.isSale || (p.sale_price !== null && p.sale_price < p.price),
            discount:
              p.sale_price !== null && p.sale_price < p.price
                ? Math.round(((p.price - p.sale_price) / p.price) * 100)
                : undefined,
          };
        })
        // 🔹 Keep only products added in the last 30 days
        .filter((p) => p.isNew);

      setProducts(transformedData);
    } catch (err: any) {
      setError(err.message || "Failed to load products");
      toast.error("Couldn't fetch products. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  fetchProducts();
}, []);


  // ---- Memoized Categories ----
  const availableCategories = useMemo(
    () => Array.from(new Set(products.map((p) => p.category))),
    [products]
  );

  // ---- Memoized Processed Products ----
  const processedProducts = useMemo(() => {
    const filtered = activeCategory === "all"
      ? products.filter((p) => p.isNew)
      : products.filter((p) => p.isNew && p.category === activeCategory);

    switch (sortOption) {
      case "newest":
        return filtered.sort((a, b) => +new Date(b.dateAdded) - +new Date(a.dateAdded));
      case "price-low":
        return filtered.sort((a, b) => (a.salePrice ?? a.price) - (b.salePrice ?? b.price));
      case "price-high":
        return filtered.sort((a, b) => (b.salePrice ?? b.price) - (a.salePrice ?? a.price));
      case "rating":
        return filtered.sort((a, b) => b.rating - a.rating);
      default:
        return filtered;
    }
  }, [products, activeCategory, sortOption]);

  // ---- Handlers ----
  const clearFilters = useCallback(() => {
    setActiveCategory("all");
    setSortOption("newest");
  }, []);

  const toggleProductExpansion = useCallback((id: string) => {
    setExpandedProductIds((prev) => {
      const updated = new Set(prev);
      updated.has(id) ? updated.delete(id) : updated.add(id);
      return updated;
    });
  }, []);

  // ---- UI: Loading State ----
  if (loading)
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-14 w-14 border-b-4 border-primary"></div>
      </div>
    );

  // ---- UI: Error State ----
  if (error)
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-center brutalist-container max-w-md p-8">
          <h2 className="text-2xl font-bold mb-4">Oops! Something went wrong</h2>
          <p className="mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="brutalist-button bg-primary text-white font-bold uppercase"
          >
            Try Again
          </button>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen relative">
      {/* Hero Section */}
      <section className="relative h-[60vh] w-full overflow-hidden border-b-8 border-primary">
        <Image
          src="https://images.unsplash.com/photo-1581041122145-9f17c04cd153?q=80&w=1471&auto=format&fit=crop"
          alt="New Arrivals"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/20 z-10" />
        <div className="relative z-20 container mx-auto h-full flex flex-col justify-center px-4 md:px-6">
          <div className="brutalist-container bg-white max-w-2xl">
            <div className="flex items-center text-black text-sm mb-2 uppercase font-bold">
              <Link href="/" className="hover:text-gray-700 focus:underline">
                Home
              </Link>
              <ChevronRight className="h-4 w-4 mx-1" />
              <span>New Arrivals</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4 uppercase">Just Dropped</h1>
            <p className="text-lg md:text-xl text-black uppercase">
              Check out our latest arrivals. Fresh styles added weekly.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Filter + Sort Controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          
          <div className="flex flex-wrap gap-2">
            <span className="text-sm font-bold uppercase mt-2 mr-2">Sort By:</span>
            {SORT_OPTIONS.map((option) => (
              <SortButton
                key={option.value}
                active={sortOption === option.value}
                onClick={() => setSortOption(option.value)}
              >
                {option.label}
              </SortButton>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {processedProducts.length > 0 ? (
            processedProducts.map((product) => (
              <ProductCardMemo
                key={product._id}
                product={product}
                isExpanded={expandedProductIds.has(product._id)}
                onToggleExpand={() => toggleProductExpansion(product._id)}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-16">
              <h3 className="text-2xl font-bold mb-4">No new arrivals found</h3>
              <Link
                href="/"
                className="brutalist-button bg-primary text-white font-bold uppercase"
              >
                Back to Home
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ---- Sort Button ----
const SortButton = ({ children, active, onClick }: any) => (
  <button
    onClick={onClick}
    className={`px-3 py-1 text-sm font-bold uppercase transition-all border-2 ${
      active
        ? "bg-primary text-white border-primary-dark"
        : "bg-white text-primary border-primary hover:bg-primary hover:text-white"
    }`}
  >
    <ArrowUpDown className={`inline-block mr-1 h-3 w-3`} />
    {children}
  </button>
);

// ---- Product Card ----
const ProductCard = ({
  product,
  isExpanded,
  onToggleExpand,
}: {
  product: Product;
  isExpanded: boolean;
  onToggleExpand: () => void;
}) => {
  const { addToCart } = useCart();
  const imageUrl = product.image.startsWith("http")
    ? product.image
    : `${process.env.NEXT_PUBLIC_API_URL}${product.image}`;

  const handleAddToCart = () => {
    const cartProduct = {
      id: product._id,
      name: product.name,
      price: product.isSale && product.salePrice ? product.salePrice : product.price,
      image: imageUrl,
      quantity: 1,
    };
    addToCart(cartProduct);
    toast.success(`${cartProduct.name} added to cart`);
  };

  return (
    <div className="brutalist-card group relative">
      <div className="relative h-[300px]">
        <Image
          src={imageUrl}
          alt={product.name}
          fill
          className="object-cover"
          onError={(e) => ((e.currentTarget.src = "/placeholder.svg"))}
        />

        {product.isNew && (
          <div className="absolute top-2 left-2">
            <div className="brutalist-badge bg-accent">
              {Date.now() - new Date(product.dateAdded).getTime() <= 3 * 86400000
                ? "JUST IN"
                : "NEW"}
            </div>
          </div>
        )}
        {product.isSale && (
          <div className="absolute top-2 right-2">
            <div className="brutalist-badge bg-red-600">SALE</div>
          </div>
        )}
        {product.discount && (
          <div className="absolute bottom-2 left-2 bg-black text-white px-2 py-1 text-xs font-bold">
            {product.discount}% OFF
          </div>
        )}

        {isExpanded && (
          <div className="absolute bottom-0 left-0 right-0 bg-white border-t-4 border-primary p-2">
            <button
              onClick={handleAddToCart}
              className="p-2 bg-red-600 text-white flex items-center justify-center w-full"
            >
              <FiShoppingCart className="h-5 w-5 mr-2" />
              <span>ADD TO CART</span>
            </button>
          </div>
        )}
      </div>

      <div className="p-4 border-t-4 border-primary">
        <Link
          href={`/product/${product._id}`}
          className="hover:underline relative z-10" // ✅ ensure it's above Image layer
        >
          <h3 className="font-bold text-lg mb-1 uppercase">{product.name}</h3>
        </Link>
        <div className="flex justify-between items-center">
          {product.isSale && product.salePrice ? (
            <>
              <span className="text-accent font-bold">
                ${(product.salePrice ?? 0).toFixed(2)}
              </span>
              <span className="ml-2 text-gray-500 line-through">
                ${product.price.toFixed(2)}
              </span>
            </>
          ) : (
            <span className="font-bold">${product.price.toFixed(2)}</span>
          )}

          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-500 mr-1" />
            <span className="text-sm font-bold">{product.rating}</span>
            <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
          </div>
        </div>

        <button
          onClick={onToggleExpand}
          className="mt-2 text-sm font-bold uppercase text-primary hover:underline"
        >
          {isExpanded ? "Hide Details" : "View Details"}
        </button>
      </div>
    </div>
  );
};
const ProductCardMemo = React.memo(ProductCard);
