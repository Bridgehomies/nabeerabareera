"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CircleDoodle, StarDoodle } from "@/components/ui-brutalist/doodles";
import { AnimatedButton } from "@/components/ui-brutalist/animated-button";
import { FiShoppingCart } from "react-icons/fi";
import { FaStar } from 'react-icons/fa';
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

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
  description?: string;
  features?: string[];
  image: string;
  images?: string[];
  colors?: string[];
  sizes?: string[];
  inStock: boolean;
  dateAdded: string;
  isFeatured?: boolean;
  rating: number;
  reviews: number;
  tags?: string[];
};

const categoryMap: { [key: string]: string } = {
  "all": "all",
  "jewelry": "jewelry",
  "coats": "Coats",
  "kids": "Kids"
};

const isProductNew = (dateString: string): boolean => {
  const productDate = new Date(dateString);
  const currentDate = new Date();
  const diffTime = currentDate.getTime() - productDate.getTime();
  const diffDays = diffTime / (1000 * 60 * 60 * 24);
  return diffDays <= 14;
};

export function CategoryProducts({ initialCategory, initialProducts }: { initialCategory: string, initialProducts: any[] }) {
  const [products, setProducts] = useState<Product[]>(() => {
    return initialProducts.map((product: any) => {
        const isNew = isProductNew(product.created_at);
        const isSale = product.sale_price !== null && product.sale_price < product.price;
        const discount = isSale
          ? Math.round(((product.price - product.sale_price) / product.price) * 100)
          : undefined;

        return {
            ...product,
            _id: product._id || product.id,
            name: product.name || product.title,
            image: product.images?.[0] || product.image,
            salePrice: product.sale_price,
            isNew,
            isSale,
            discount,
            inStock: product.stock > 0,
            dateAdded: product.created_at
        };
    });
  });

  const [activeCategory, setActiveCategory] = useState(initialCategory || "all");
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const { addToCart } = useCart();

  useEffect(() => {
    async function fetchFilteredProducts() {
      const filtered = initialProducts.filter(p => {
        const dbCategory = categoryMap[activeCategory];
        return dbCategory === "all" || p.category === dbCategory;
      });
      const processedFiltered = filtered.map((product: any) => {
        const isNew = isProductNew(product.created_at);
        const isSale = product.sale_price !== null && product.sale_price < product.price;
        const discount = isSale
          ? Math.round(((product.price - product.sale_price) / product.price) * 100)
          : undefined;

        return {
            ...product,
            _id: product._id || product.id,
            name: product.name || product.title,
            image: product.images?.[0] || product.image,
            salePrice: product.sale_price,
            isNew,
            isSale,
            discount,
            inStock: product.stock > 0,
            dateAdded: product.created_at,
            reviews: product.reviews || 0,
            rating: product.rating || 0,
        };
      });
      setProducts(processedFiltered);
    }
    if (activeCategory !== initialCategory) {
      fetchFilteredProducts();
    }
  }, [activeCategory, initialCategory, initialProducts]);

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
    const walk = (x - startX) * 2;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const scroll = (direction: "left" | "right") => {
    if (!carouselRef.current) return;
    const { scrollLeft, clientWidth } = carouselRef.current;
    const scrollTo =
      direction === "left"
        ? scrollLeft - clientWidth / 2
        : scrollLeft + clientWidth / 2;
    carouselRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseleave", handleMouseUp);
    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseleave", handleMouseUp);
    };
  }, []);

  if (products.length === 0) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6 flex flex-col items-center justify-center h-64">
          <p className="text-xl text-gray-600 mb-4">No products found in this category.</p>
          <AnimatedButton href="/products" animation="bounce" size="lg">
            VIEW ALL PRODUCTS
          </AnimatedButton>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white brutalist-section relative overflow-hidden">
      <CircleDoodle className="absolute top-10 left-10 text-accent" />
      <StarDoodle className="absolute bottom-10 right-10 text-primary" />
      <div className="container mx-auto px-4 md:px-6">
        {/* Category Filters */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h2 className="text-4xl md:text-5xl font-bold threed-text uppercase">Products</h2>
          <div className="flex flex-wrap gap-2">
            <CategoryButton active={activeCategory === "all"} onClick={() => setActiveCategory("all")}>
              All
            </CategoryButton>
            <CategoryButton active={activeCategory === "jewelry"} onClick={() => setActiveCategory("jewelry")}>
              Jewelry
            </CategoryButton>
            <CategoryButton active={activeCategory === "coats"} onClick={() => setActiveCategory("coats")}>
              Coats
            </CategoryButton>
            <CategoryButton active={activeCategory === "kids"} onClick={() => setActiveCategory("kids")}>
              Kids Clothing
            </CategoryButton>
          </div>
        </div>

        {/* Draggable Carousel */}
        <div className="relative">
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white p-3 rounded-full shadow-lg hover:bg-primary hover:text-white transition-all border-2 border-primary"
            aria-label="Scroll left"
          >
            <ChevronLeft size={24} />
          </button>

          <div
            ref={carouselRef}
            className="flex overflow-x-auto pb-8 hide-scrollbar drag-scroll scrollbar-hide"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseUp}
          >
            <div className="flex gap-6">
              {products.slice(0, 8).map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </div>

          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white p-3 rounded-full shadow-lg hover:bg-primary hover:text-white transition-all border-2 border-primary"
            aria-label="Scroll right"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        <div className="flex justify-center mt-12">
          <AnimatedButton href="/products" animation="bounce" size="lg">
            VIEW ALL PRODUCTS
          </AnimatedButton>
        </div>
      </div>
    </section>
  );
}

function CategoryButton({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`
        relative px-4 py-2 text-sm font-bold uppercase transition-all rounded-full
        ${active
          ? "bg-primary text-white border-2 border-primary-dark"
          : "bg-white text-primary border-2 border-primary hover:bg-primary hover:text-white"
        }
      `}
    >
      {children}
      {active && (
        <span className="absolute top-0 right-0 w-3 h-3 bg-accent rounded-full transform translate-x-1/2 -translate-y-1/2"></span>
      )}
    </button>
  );
}

function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [imageError, setImageError] = useState(false);

  const getImageUrl = (imagePath?: string): string => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    const cleanApiUrl = apiUrl.replace(/\/$/, "");

    if (!imagePath) {
      return "/placeholder.svg?height=300&width=280";
    }

    if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
      return imagePath;
    }

    const cleanImagePath = imagePath.startsWith("/") ? imagePath : `/${imagePath}`;
    return `${cleanApiUrl}${cleanImagePath}`;
  };

  const imageUrl = getImageUrl(product.image || product.images?.[0]);

  const handleAddToCart = () => {
    const cartProduct = {
      id: product._id,
      name: product.name,
      price: product.isSale && product.salePrice ? product.salePrice : product.price,
      image: imageUrl,
      quantity: 1,
    };
    addToCart(cartProduct);
    toast.success(`${product.name} added to cart`);
  };

  const renderRating = () => {
    const stars = [];

    // If no reviews: show all empty stars
    if (!product.reviews || !product.rating) {
    for (let i = 0; i < 5; i++) {
      stars.push(<FaStar key={`empty-${i}`} className="w-4 h-4 text-gray-300" />);
    }
    return <div className="flex">{stars}</div>;
  } else {
      const fullStars = Math.floor(product.rating);
      const hasHalfStar = product.rating % 1 >= 0.5;

      for (let i = 0; i < fullStars; i++) {
        stars.push(<FaStar key={i} className="w-4 h-4 fill-current text-yellow-400" />);
      }
      if (hasHalfStar) {
        stars.push(
          <FaStar
            key="half"
            className="w-4 h-4 fill-current text-yellow-400"
            style={{ clipPath: "polygon(0 0, 50% 0, 50% 100%, 0 100%)" }}
          />
        );
      }
      const totalFilled = fullStars + (hasHalfStar ? 1 : 0);
      const emptyStars = 5 - totalFilled;
      for (let i = 0; i < emptyStars; i++) {
        stars.push(<FaStar key={`empty-${i}`} className="w-4 h-4 text-gray-300" />);
      }
    }

    return (
      <div className="flex items-center">
        <div className="flex">{stars}</div>
        {product.reviews > 0 && (
          <span className="ml-1 text-xs text-gray-500">({product.reviews})</span>
        )}
      </div>
    );
  };

  return (
    <div className="brutalist-card transform-card min-w-[280px] w-[280px] rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
      <div className="relative h-[300px]">
        {!imageError ? (
          <Image
            src={imageUrl}
            alt={product.name || "Product image"}
            fill
            className="object-cover"
            onError={() => setImageError(true)}
            unoptimized={!imageUrl.startsWith("/") && !imageUrl.startsWith("http://localhost")}
          />
        ) : (
          <div className="bg-gray-200 w-full h-full flex items-center justify-center">
            <span className="text-gray-500">Image not available</span>
          </div>
        )}
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {product.isNew && (
            <div className="brutalist-badge bg-accent transform -rotate-6 px-2 py-1 text-xs font-bold">
              NEW
            </div>
          )}
          {product.isSale && product.salePrice !== null && (
            <div className="brutalist-badge bg-red-600 transform rotate-6 px-2 py-1 text-xs font-bold">
              -{product.discount}%
            </div>
          )}
        </div>
        
        {/* Quick Add to Cart */}
        <button
          onClick={handleAddToCart}
          className="absolute bottom-4 right-4 bg-white p-3 rounded-full shadow-md hover:bg-primary hover:text-white transition-all border-2 border-primary group"
          aria-label="Add to cart"
        >
          <FiShoppingCart className="h-5 w-5 group-hover:scale-110 transition-transform" />
        </button>
      </div>
      
      <div className="p-4 border-t-2 border-primary">
        <Link href={`/product/${product._id}`} className="hover:underline">
          <h3 className="font-bold text-lg mb-1 uppercase line-clamp-1">{product.name}</h3>
        </Link>
        
        <div className="flex justify-between items-center mb-2">
          {product.isSale && product.salePrice !== null ? (
            <div className="flex items-baseline gap-2">
              <span className="text-accent font-bold text-lg">PKR {(product.salePrice ?? 0).toFixed(2)}</span>
              <span className="text-gray-500 line-through text-sm">PKR {product.price.toFixed(2)}</span>
            </div>
          ) : (
            <span className="font-bold text-lg">PKR {product.price.toFixed(2)}</span>
          )}
        </div>
        
        {renderRating()}
      </div>
    </div>
  );
}