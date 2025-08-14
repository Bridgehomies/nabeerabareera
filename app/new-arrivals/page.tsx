"use client"

import React, { useState, useEffect, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight, Filter, ArrowUpDown, Star } from "lucide-react"
import { FiShoppingCart } from "react-icons/fi"
import { ScrollingGrid } from "@/components/ui-brutalist/scrolling-grid"
import { AnimatedButton } from "@/components/ui-brutalist/animated-button"
import { CircleDoodle, StarDoodle } from "@/components/ui-brutalist/doodles"
import { useCart } from "@/context/CartContext"
import { toast } from "sonner"

// Define Product type
export type Product = {
  _id: string
  name: string
  price: number
  salePrice?: number | null
  discount?: number
  isSale?: boolean
  isNew?: boolean
  category: string
  subcategory?: string
  description?: string
  features?: string[]
  image: string
  images?: string[]
  colors?: string[]
  sizes?: string[]
  inStock: boolean
  dateAdded: string
  isFeatured?: boolean
  rating: number
  reviews: number
  tags?: string[]
}

// Define API response type
type ProductApiResponse = Omit<Product, 'isNew' | 'isSale' | 'discount'>

export default function NewArrivalsPage() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [sortOption, setSortOption] = useState("newest")
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { addToCart } = useCart()

  // Fetch products from backend API
  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true)
        setError(null)
        
        if (!process.env.NEXT_PUBLIC_API_URL) {
          throw new Error("API configuration error")
        }
        
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`)
        if (!res.ok) {
          throw new Error(`Failed to fetch products: ${res.status} ${res.statusText}`)
        }
        const data: ProductApiResponse[] = await res.json()

        // Add derived fields (isNew, isSale, discount)
        const processed = data.map((product) => {
          const isNew = isProductNew(product.dateAdded)
          const isSale =
            typeof product.salePrice === "number" && product.salePrice < product.price
          const discount = isSale
            ? Math.round(((product.price - product.salePrice!) / product.price) * 100)
            : undefined

          return {
            ...product,
            isNew,
            isSale,
            discount,
          }
        })

        setProducts(processed)
      } catch (error) {
        console.error("Error fetching products:", error)
        setError(error instanceof Error ? error.message : "Failed to load products")
        toast.error("Failed to load products. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  // Calculate if product is new (within last 30 days)
  const isProductNew = (dateString: string): boolean => {
    const productDate = new Date(dateString)
    const currentDate = new Date()
    const diffTime = currentDate.getTime() - productDate.getTime()
    const diffDays = diffTime / (1000 * 60 * 60 * 24)
    return diffDays <= 30
  }

  // Filter products by category and newness
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      return product.isNew && (activeCategory === "all" || product.category === activeCategory)
    })
  }, [products, activeCategory])

  // Sort products
  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      if (sortOption === "newest") {
        return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
      } else if (sortOption === "price-low") {
        return (a.salePrice ?? a.price) - (b.salePrice ?? b.price)
      } else if (sortOption === "price-high") {
        return (b.salePrice ?? b.price) - (a.salePrice ?? a.price)
      } else if (sortOption === "rating") {
        return b.rating - a.rating
      }
      return 0
    })
  }, [filteredProducts, sortOption])

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-lg">Loading products...</p>
          <div className="sr-only" aria-live="polite">Loading products...</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-center p-8 brutalist-container max-w-md">
          <h2 className="text-2xl font-bold mb-4">Oops! Something went wrong</h2>
          <p className="mb-6">We couldn't load the products. Please check your connection and try again.</p>
          <AnimatedButton onClick={() => window.location.reload()}>
            Try Again
          </AnimatedButton>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative">
      {/* Hero Section */}
      <section className="relative h-[70vh] w-full overflow-hidden border-b-8 border-primary">
        <div className="absolute inset-0 bg-black/10 z-10" />
        <Image
          src="https://images.unsplash.com/photo-1581041122145-9f17c04cd153?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="New Arrivals"
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-20 container mx-auto h-full flex flex-col justify-center px-4 md:px-6">
          <div className="brutalist-container bg-white max-w-2xl">
            <StarDoodle className="absolute -top-10 -right-10 text-accent" />
            <div className="flex items-center text-black text-sm mb-2 uppercase font-bold">
              <Link href="/" className="hover:text-gray-700 focus:underline">
                Home
              </Link>
              <ChevronRight className="h-4 w-4 mx-1" />
              <span>New Arrivals</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-black mb-4 uppercase threed-text">Just Dropped</h1>
            <p className="text-xl text-black max-w-xl uppercase">
              Check out our latest arrivals. Fresh styles added weekly.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Filter and Sort Controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div className="mb-4 md:mb-0">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              aria-expanded={isFilterOpen}
              aria-controls="filter-panel"
              className="flex items-center font-bold uppercase mb-4 md:mb-0 transform hover:rotate-2 transition-transform focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <Filter className="mr-2 h-5 w-5" /> Filter & Sort
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="text-sm font-bold uppercase mt-2 mr-2">Sort By:</span>
            <SortButton active={sortOption === "newest"} onClick={() => setSortOption("newest")}>
              Newest
            </SortButton>
            <SortButton active={sortOption === "price-low"} onClick={() => setSortOption("price-low")}>
              Price: Low to High
            </SortButton>
            <SortButton active={sortOption === "price-high"} onClick={() => setSortOption("price-high")}>
              Price: High to Low
            </SortButton>
            <SortButton active={sortOption === "rating"} onClick={() => setSortOption("rating")}>
              Top Rated
            </SortButton>
          </div>
        </div>

        {/* Expanded Filter Panel */}
        {isFilterOpen && (
          <div id="filter-panel" className="brutalist-container mb-8">
            <h3 className="text-xl font-bold mb-4 uppercase">Filter By Category</h3>
            <div className="flex flex-wrap gap-3">
              <CategoryButton active={activeCategory === "all"} onClick={() => setActiveCategory("all")}>
                All New Arrivals
              </CategoryButton>
              <CategoryButton active={activeCategory === "jewelry"} onClick={() => setActiveCategory("jewelry")}>
                Jewelry
              </CategoryButton>
              <CategoryButton active={activeCategory === "mens-coats"} onClick={() => setActiveCategory("mens-coats")}>
                Coats
              </CategoryButton>
              <CategoryButton
                active={activeCategory === "kids-clothing"}
                onClick={() => setActiveCategory("kids-clothing")}
              >
                Kids Clothing
              </CategoryButton>
            </div>
          </div>
        )}

        {/* New Arrivals Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-16">
          {sortedProducts.length > 0 ? (
            sortedProducts.map((product) => (
              <ProductCardMemo key={product._id} product={product} />
            ))
          ) : (
            <div className="col-span-full">
              <ProductSkeleton />
            </div>
          )}
        </div>

        {/* No Products Found */}
        {sortedProducts.length === 0 && !loading && (
          <div className="text-center py-16">
            <h3 className="text-2xl font-bold mb-4">No products found</h3>
            <p className="mb-8">Try changing your filter or check back soon for new arrivals.</p>
            <AnimatedButton href="/" animation="bounce">
              Back to Home
            </AnimatedButton>
          </div>
        )}

        {/* Newsletter Signup */}
        <div className="mt-28 brutalist-container text-white">
          <CircleDoodle className="absolute top-5 right-5 text-white opacity-30" />
          <h2 className="text-3xl font-bold mb-4 uppercase text-black">Be the First to Know</h2>
          <p className="mb-6 uppercase text-gray-600 text-xl font-semibold">
            Sign up for our newsletter to get early access to new arrivals and exclusive offers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="YOUR EMAIL ADDRESS"
              className="newsletter-input flex-grow placeholder-white"
              aria-label="Email address for newsletter"
            />
            <AnimatedButton variant="white" iconPosition="right">
              Subscribe
            </AnimatedButton>
          </div>
        </div>
      </div>
    </div>
  )
}

// Sort Button Component
function SortButton({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`
        relative px-3 py-1 text-sm font-bold uppercase transition-all
        ${
          active
            ? "bg-primary text-white border-2 border-primary-dark"
            : "bg-white text-primary border-2 border-primary hover:bg-primary hover:text-white"
        }
      `}
      aria-pressed={active}
    >
      <ArrowUpDown className={`inline-block mr-1 h-3 w-3 ${active ? "text-white" : "text-primary"}`} />
      {children}
    </button>
  )
}

// Category Button Component
function CategoryButton({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`
        relative px-4 py-2 text-sm font-bold uppercase 
        ${
          active
            ? "bg-primary text-white border-4 border-primary-dark"
            : "bg-white text-primary border-4 border-primary hover:bg-primary hover:text-white"
        }
      `}
      aria-pressed={active}
    >
      {children}
      <span
        className={`absolute top-0 right-0 w-3 h-3 ${
          active ? "bg-accent" : "bg-secondary"
        } transform translate-x-1/2 -translate-y-1/2`}
      ></span>
    </button>
  )
}

// Product Card Component
const ProductCard = ({ product }: { product: Product }) => {
  const [isHovered, setIsHovered] = useState(false)
  const { addToCart } = useCart()
  
  const imageUrl = `${process.env.NEXT_PUBLIC_API_URL}${product.image || "/placeholder.svg"}`

  const handleAddToCart = () => {
    const cartProduct = {
      id: product._id,
      name: product.name,
      price: product.isSale && product.salePrice ? product.salePrice : product.price,
      image: imageUrl,
      quantity: 1, // Added required quantity property
    }

    addToCart(cartProduct)
    toast.success(`${cartProduct.name} added to cart`)
  }

  const daysSinceAdded = Math.floor(
    (new Date().getTime() - new Date(product.dateAdded).getTime()) / (1000 * 60 * 60 * 24)
  )

  return (
    <div
      className="brutalist-card transform-card group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={`Product: ${product.name}`}
    >
      <div className="relative h-[300px]">
        <Image 
          src={imageUrl} 
          alt={product.name} 
          fill 
          className="object-cover" 
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* New badge */}
        {product.isNew && (
          <div className="absolute top-0 left-0">
            <div className="brutalist-badge bg-accent transform -rotate-12">
              {daysSinceAdded <= 3 ? "JUST IN" : "NEW"}
            </div>
          </div>
        )}
        
        {/* Sale badge */}
        {product.isSale && product.salePrice !== null && (
          <div className="absolute top-0 left-0">
            <div className="brutalist-badge bg-red-600 transform rotate-12">SALE</div>
          </div>
        )}
        
        {/* Days since added */}
        <div className="absolute top-0 right-0 bg-black text-white px-2 py-1 text-xs font-bold transform rotate-12">
          {daysSinceAdded} {daysSinceAdded === 1 ? "DAY" : "DAYS"} AGO
        </div>
        
        {/* Quick actions */}
        <div className="absolute bottom-0 left-0 right-0 bg-white border-t-4 border-primary p-2 flex justify-between">
          <button
            onClick={handleAddToCart}
            className="p-2 bg-red-600 text-white border-red-600 hover:bg-green-500 flex items-center justify-center w-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            aria-label={`Add ${product.name} to cart`}
          >
            <FiShoppingCart className="h-5 w-5 mr-2" />
            <span>ADD TO CART</span>
          </button>
        </div>
      </div>
      
      <div className="p-4 border-t-4 border-primary">
        <Link 
          href={`/product/${product._id}`} 
          className="hover:underline focus:underline focus:outline-none"
        >
          <h3 className="font-bold text-lg mb-1 uppercase">{product.name}</h3>
        </Link>
        
        <div className="flex justify-between items-center">
          {product.isSale && product.salePrice !== null ? (
            <>
              <span className="text-accent font-bold">${(product.salePrice ?? 0).toFixed(2)}</span>
              <span className="ml-2 text-gray-500 line-through">${product.price.toFixed(2)}</span>
            </>
          ) : (
            <span className="font-bold">${product.price.toFixed(2)}</span>
          )}
          
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-500 mr-1" aria-hidden="true" />
            <span className="text-sm font-bold">{product.rating}</span>
            <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// Memoized Product Card for performance
const ProductCardMemo = React.memo(ProductCard)

// Product Skeleton for loading states
const ProductSkeleton = () => (
  <div className="brutalist-card animate-pulse">
    <div className="relative h-[300px] bg-gray-300 rounded"></div>
    <div className="p-4">
      <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
      <div className="flex justify-between">
        <div className="h-6 bg-gray-300 rounded w-1/4"></div>
        <div className="h-4 bg-gray-300 rounded w-1/6"></div>
      </div>
    </div>
  </div>
)