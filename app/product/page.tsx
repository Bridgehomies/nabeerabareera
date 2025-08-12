"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";
import { CircleDoodle, StarDoodle } from "@/components/ui-brutalist/doodles";
import { AnimatedButton } from "@/components/ui-brutalist/animated-button";
import { FiShoppingCart } from "react-icons/fi";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

interface Product {
  _id: string;
  name: string;
  price: number;
  salePrice?: number | null;
  description: string;
  images: string[];
  category: string;
  subcategory?: string;
  inStock: boolean;
  dateAdded: string;
  rating: number;
  reviews: number;
  isSale?: boolean;
  isNew?: boolean;
  discount?: number;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [page, setPage] = useState(1);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const { addToCart } = useCart();
  const ITEMS_PER_PAGE = 12;

  // Map button labels to category slugs
  const categoryMap: { [key: string]: string } = {
    All: "all",
    Jewelry: "jewelry",
    Coats: "mens-coats",
    "Kids Clothing": "kids-clothing",
  };

  // Inverse map for filtering products by slug
  const labelToSlugMap: { [key: string]: string } = {
    All: "all",
    Jewelry: "jewelry",
    Coats: "mens-coats",
    "Kids Clothing": "kids-clothing",
  };

  // Fetch products and process isNew, isSale, discount
  useEffect(() => {
    async function fetchProducts() {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
        const res = await fetch(`${API_URL}/api/products`);
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        const processed = data.map((product: any) => {
          const isNew = isProductNew(product.dateAdded);
          const isSale =
            typeof product.salePrice === "number" && product.salePrice < product.price;
          const discount = isSale
            ? Math.round(((product.price - product.salePrice!) / product.price) * 100)
            : undefined;
          return { ...product, isNew, isSale, discount };
        });
        console.log("Fetched products:", processed); // Debug: Log all products
        console.log(
          "Mens-Coats products:",
          processed.filter((p: Product) => p.category === "mens-coats")
        ); // Debug: Log Mens-Coats products
        setProducts(processed);
        setFilteredProducts(processed);
        setDisplayedProducts(processed.slice(0, ITEMS_PER_PAGE));
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  // Filter products by category
  const handleFilter = (categoryLabel: string) => {
    const slug = categoryMap[categoryLabel];
    setActiveCategory(slug);
    setPage(1);
    if (slug === "all") {
      setFilteredProducts(products);
      setDisplayedProducts(products.slice(0, ITEMS_PER_PAGE));
    } else {
      // Map label to slug for filtering
      const filterSlug = labelToSlugMap[categoryLabel];
      const filtered = products.filter(
        (product) => product.category.toLowerCase() === filterSlug.toLowerCase()
      );
      console.log(`Filtered products for ${categoryLabel} (${filterSlug}):`, filtered); // Debug: Log filtered products
      setFilteredProducts(filtered);
      setDisplayedProducts(filtered.slice(0, ITEMS_PER_PAGE));
    }
  };

  // Infinite scroll
  const loadMoreProducts = useCallback(() => {
    const nextPage = page + 1;
    const startIndex = (nextPage - 1) * ITEMS_PER_PAGE;
    const endIndex = nextPage * ITEMS_PER_PAGE;
    const moreProducts = filteredProducts.slice(startIndex, endIndex);
    if (moreProducts.length > 0) {
      setDisplayedProducts((prev) => [...prev, ...moreProducts]);
      setPage(nextPage);
    }
  }, [page, filteredProducts]);

  useEffect(() => {
    if (loading) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMoreProducts();
        }
      },
      { threshold: 1.0 }
    );
    if (loadMoreRef.current) observer.observe(loadMoreRef.current);
    return () => {
      if (loadMoreRef.current) observer.unobserve(loadMoreRef.current);
    };
  }, [loading, loadMoreProducts]);

  // Helper to check if product is new
  const isProductNew = (dateString: string): boolean => {
    const productDate = new Date(dateString);
    const currentDate = new Date();
    const diffTime = currentDate.getTime() - productDate.getTime();
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    return diffDays <= 14;
  };

  if (loading)
    return (
      <div className="container mx-auto py-16 text-center uppercase text-2xl font-bold">
        Loading products...
      </div>
    );
  if (error)
    return (
      <div className="container mx-auto py-16 text-center text-red-500 uppercase text-2xl font-bold">
        Error: {error}
      </div>
    );

  return (
    <div className="flex flex-col min-h-screen mt-10 bg-gray-100">
      {/* Original Hero Section */}
      <section
        className="bg-gray-200 p-12 text-center border-4 border-red-600 relative"
        style={{
          backgroundImage: "url('/store.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "400px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="relative z-10">
          <h1 className="text-6xl font-bold mb-4 text-white uppercase">ALL PRODUCTS</h1>
          <p className="text-2xl text-white uppercase">
            Stay stylish and warm with our premium selection of Coats for every season.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white brutalist-section relative overflow-hidden">
        <CircleDoodle className="absolute top-10 left-10 text-accent" />
        <StarDoodle className="absolute bottom-10 right-10 text-primary" />
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold uppercase">Products</h2>
            <div className="flex gap-4">
              {Object.keys(categoryMap).map((label) => (
                <CategoryButton
                  key={label}
                  active={activeCategory === categoryMap[label]}
                  onClick={() => handleFilter(label)}
                >
                  {label}
                </CategoryButton>
              ))}
            </div>
          </div>

          {displayedProducts.length === 0 ? (
            <div className="text-center text-2xl font-bold uppercase text-red-500">
              No products found for this category
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {displayedProducts.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  addToCart={addToCart}
                  toast={toast}
                />
              ))}
            </div>
          )}

          <div className="flex justify-center mt-12">
            <AnimatedButton href="/product" animation="bounce" size="lg">
              VIEW ALL PRODUCTS
            </AnimatedButton>
          </div>
          <div ref={loadMoreRef} className="h-10" />
        </div>
      </section>

      
    </div>
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
        relative px-4 py-2 text-sm font-bold uppercase transition-all
        ${
          active
            ? "bg-primary text-white border-4 border-primary-dark"
            : "bg-white text-primary border-4 border-primary hover:bg-primary hover:text-white"
        }
      `}
    >
      {children}
      <span
        className={`absolute top-0 right-0 w-3 h-3 ${active ? "bg-accent" : "bg-secondary"} transform translate-x-1/2 -translate-y-1/2`}
      ></span>
    </button>
  );
}

function ProductCard({
  product,
  addToCart,
  toast,
}: {
  product: Product;
  addToCart: Function;
  toast: any;
}) {
  const imageUrl =
  product.images && product.images.length > 0
    ? `${process.env.NEXT_PUBLIC_API_URL}${product.images[0]}`
    : "/placeholder.svg";


  const handleAddToCart = () => {
    const cartProduct = {
      id: product._id,
      name: product.name,
      price: product.isSale && product.salePrice ? product.salePrice : product.price,
      image: imageUrl,
    };
    addToCart(cartProduct);
    toast.success(`${cartProduct.name} added to cart`);
  };

  // Dummy setIsHovered to fix error
  const setIsHovered = (value: boolean) => {};

  return (
    <div
      className="brutalist-card transform-card min-w-[280px] w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-[300px]">
        <Image src={imageUrl} alt={product.name} fill className="object-cover" />
        {product.isSale && product.salePrice !== null && (
          <div className="brutalist-badge transform rotate-12">SALE</div>
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-80 border-t-4 border-primary p-2 flex justify-evenly">
          <button
            onClick={handleAddToCart}
            className="p-2 bg-red-600 bg-opacity-60 text-white border-red-600 hover:bg-green-500 flex items-center justify-between w-full"
          >
            <FiShoppingCart />
            <span>ADD TO CART</span>
          </button>
        </div>
      </div>
      <div className="p-4 border-t-4 border-primary">
        <a href={`/product/${product._id}`} className="hover:underline">
          <h3 className="font-bold text-lg mb-1 uppercase">{product.name}</h3>
        </a>
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