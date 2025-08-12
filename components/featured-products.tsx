// Path: nabeerabareera/components/featured-products.tsx
"use client"
import type React from "react"
import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"
import { AnimatedButton } from "@/components/ui-brutalist/animated-button"
import { CircleDoodle, StarDoodle } from "@/components/ui-brutalist/doodles"
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

export type Product = {
  _id: string;
  name: string;
  price: number;
  salePrice?: number | null;
  discount?: number;
  category: string;
  subcategory?: string;
  description?: string;
  features?: string[];
  
  images?: string[];
  colors?: string[];
  sizes?: string[];
  inStock: boolean;
  dateAdded: string;
  isNew?: boolean;
  isSale?: boolean;
  isFeatured?: boolean;
  rating: number;
  reviews: number;
  tags?: string[];
}

export function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const isMobile = useMobile();
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Fetch products from backend
  useEffect(() => {
    async function loadProducts() {
      try {
        console.log(`${process.env.NEXT_PUBLIC_API_URL}/api/products`);
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`);
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();

        // Add derived fields (isNew, isSale, discount)
        const processed = data.map((product: any) => {
        const isNew = isProductNew(product.dateAdded);
        const isSale = typeof product.salePrice === 'number' && product.salePrice < product.price;
        const discount = isSale
          ? calculateDiscount(product.price, product.salePrice || product.price)
          : undefined;

        return {
          ...product,
          isNew,
          isSale,
          discount,
        };
      });

        // Sort by most reviewed (most selling)
        const sortedProducts = [...processed].sort((a, b) => b.reviews - a.reviews);

        setProducts(sortedProducts);
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  // Calculate if a product is new (added within the last 14 days)
  const isProductNew = (dateString: string): boolean => {
    const productDate = new Date(dateString);
    const currentDate = new Date();
    const diffTime = currentDate.getTime() - productDate.getTime();
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    return diffDays <= 14;
  };

  // Helper to calculate discount percentage
  const calculateDiscount = (originalPrice: number, salePrice: number): number => {
    return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
  };

  // Draggable carousel functionality
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!carouselRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
    document.body.style.cursor = "grabbing";
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    document.body.style.cursor = "default";
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !carouselRef.current) return;
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  // Handle scroll with buttons
  const scroll = (direction: "left" | "right") => {
    if (!carouselRef.current) return;
    const { scrollLeft, clientWidth } = carouselRef.current;
    const scrollTo = direction === "left"
      ? scrollLeft - clientWidth / 2
      : scrollLeft + clientWidth / 2;
    carouselRef.current.scrollTo({
      left: scrollTo,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handleMouseLeave = () => {
      if (isDragging) {
        setIsDragging(false);
        document.body.style.cursor = "default";
      }
    };

    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isDragging]);

  if (loading) {
    return (
      <section className="py-16 bg-white brutalist-section">
        <div className="container mx-auto px-4 md:px-6 flex justify-center items-center h-64">
          <p>Loading products...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white brutalist-section relative overflow-hidden">
      <CircleDoodle className="absolute top-10 left-10 text-accent" />
      <StarDoodle className="absolute bottom-10 right-10 text-primary" />
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12">
          <h2 className="text-5xl md:text-6xl font-bold mb-4 md:mb-0 uppercase threed-text">Top Selling</h2>
        </div>

        {/* Draggable Product Carousel */}
        <div className="relative">
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white p-2 hover:bg-primary hover:text-white transition-all border-4 border-primary"
            aria-label="Scroll left"
          >
            <ChevronLeft size={24} />
          </button>
          <div
            ref={carouselRef}
            className="flex overflow-x-auto pb-8 hide-scrollbar drag-scroll"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onMouseMove={handleMouseMove}
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <div className="flex gap-6 mx-6">
              {products.slice(0, 8).map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </div>
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white p-2 hover:bg-primary hover:text-white transition-all border-4 border-primary"
            aria-label="Scroll right"
          >
            <ChevronRight size={24} />
          </button>
        </div>
        <div className="flex justify-center mt-12">
          <AnimatedButton href="/product" animation="bounce" size="lg">
            VIEW ALL PRODUCTS
          </AnimatedButton>
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product }: { product: Product }) {
  const [isHovered, setIsHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const imageUrls = product.images?.map((img) => `${baseUrl}${img}`) || [];

  const { addToCart } = useCart();

  useEffect(() => {
    if (isHovered && imageUrls.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % imageUrls.length);
      }, 2000);
    } else {
      setCurrentImageIndex(0);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isHovered, imageUrls]);

  const handleAddToCart = () => {
    const cartProduct = {
      id: product._id,
      name: product.name,
      price: product.isSale && product.salePrice ? product.salePrice : product.price,
      image: imageUrls[0], // ✅ correct image reference
    };

    addToCart(cartProduct);
    toast.success(`${cartProduct.name} added to cart`);
  };

  return (
    <div
      className="brutalist-card transform-card min-w-[280px] w-[280px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-[300px]">
        {imageUrls.length > 0 ? (
          <Image
            src={imageUrls[currentImageIndex]}
            alt={product.name}
            fill
            className="object-cover transition-opacity duration-500"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500 text-sm">
            No Image
          </div>
        )}

        <div className="absolute top-0 left-0 flex flex-col gap-2">
          {product.isNew && (
            <div className="brutalist-badge transform -rotate-12">NEW</div>
          )}
          {product.isSale && product.salePrice !== null && (
            <div className="brutalist-badge transform rotate-12">SALE</div>
          )}
        </div>

        {isHovered && (
          <div className="absolute bottom-0 left-0 right-0 bg-white border-t-4 border-primary p-2 flex justify-center">
            <button
              onClick={handleAddToCart}
              className="p-2 bg-red-600 text-white border-red-600 hover:bg-green-500 flex items-center justify-center"
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              <span>ADD TO CART</span>
            </button>
          </div>
        )}
      </div>

      <div className="p-4 border-t-4 border-primary">
        <Link href={`/product/${product._id}`} className="hover:underline">
          <h3 className="font-bold text-lg mb-1 uppercase">{product.name}</h3>
        </Link>
        <div className="flex items-center">
          {product.isSale && product.salePrice !== null ? (
            <>
              <span className="text-accent font-bold">${(product.salePrice ?? 0).toFixed(2)}</span>
              <span className="ml-2 text-gray-500 line-through">${product.price.toFixed(2)}</span>
            </>
          ) : (
            <span className="font-bold">${product.price.toFixed(2)}</span>
          )}
        </div>
      </div>
    </div>
  );
}
