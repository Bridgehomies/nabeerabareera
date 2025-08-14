"use client"

import React, { useState, useEffect, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ChevronRight,
  Filter,
  ArrowUpDown,
  ShoppingBag,
  Heart,
  Percent,
  Star,
} from "lucide-react"

import { ScrollingGrid } from "@/components/ui-brutalist/scrolling-grid"
import { AnimatedButton } from "@/components/ui-brutalist/animated-button"
import { CircleDoodle, StarDoodle } from "@/components/ui-brutalist/doodles"
import { useCart } from "@/context/CartContext"
import { toast } from "sonner"

// Define Product type
type Product = {
  _id: string
  name: string
  price: number
  salePrice?: number | null
  discount?: number
  isSale?: boolean
  category: string
  subcategory?: string
  description?: string
  image: string
  images?: string[]
  inStock: boolean
  dateAdded: string
  isFeatured?: boolean
  rating: number
  reviews: number
  tags?: string[]
}

export default function SalePage() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [sortOption, setSortOption] = useState("discount")
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [timeLeft, setTimeLeft] = useState({
    days: 3,
    hours: 12,
    minutes: 34,
    seconds: 56,
  })
  const [saleProducts, setSaleProducts] = useState<Product[]>([])
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { addToCart } = useCart()

  // Fetch all products and filter sale ones
  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true)
        setError(null)

        if (!process.env.NEXT_PUBLIC_API_URL) {
          throw new Error("API configuration error")
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`)
        if (!res.ok)
          throw new Error(`Failed to fetch products: ${res.status} ${res.statusText}`)

        const data: Omit<Product, "isSale" | "discount">[] = await res.json()

        const processed: Product[] = data.map((product) => {
          const isSale =
            product.salePrice != null && product.salePrice < product.price

          const discount = isSale
            ? Math.round(
                ((product.price - (product.salePrice ?? product.price)) /
                  product.price) *
                  100
              )
            : undefined

          return {
            ...product,
            isSale,
            discount,
          }
        })

        const saleOnly = processed.filter((p) => p.isSale)
        const featured = saleOnly.filter((p) => p.isFeatured || p.rating >= 4.5)

        setSaleProducts(saleOnly)
        setFeaturedProducts(featured)
      } catch (err: any) {
        console.error("Error fetching sale products:", err)
        setError(err.message || "Failed to load sale products.")
        toast.error("Failed to load sale products. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  // Update countdown timer every second
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes, seconds } = prev
        seconds -= 1
        if (seconds < 0) {
          seconds = 59
          minutes -= 1
          if (minutes < 0) {
            minutes = 59
            hours -= 1
            if (hours < 0) {
              days -= 1
              hours = 23
              if (days < 0) {
                clearInterval(timer)
                return { days: 0, hours: 0, minutes: 0, seconds: 0 }
              }
            }
          }
        }
        return { days, hours, minutes, seconds }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Filter products by category
  const filteredProducts = useMemo(() => {
    return activeCategory === "all"
      ? saleProducts
      : saleProducts.filter((product) => product.category === activeCategory)
  }, [saleProducts, activeCategory])

  // Sort products
  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      if (sortOption === "discount") {
        return (b.discount || 0) - (a.discount || 0)
      } else if (sortOption === "price-low") {
        return (a.salePrice ?? a.price) - (b.salePrice ?? b.price)
      } else if (sortOption === "price-high") {
        return (b.salePrice ?? b.price) - (a.salePrice ?? a.price)
      } else if (sortOption === "savings") {
        const aSavings = a.price - (a.salePrice ?? a.price)
        const bSavings = b.price - (b.salePrice ?? b.price)
        return bSavings - aSavings
      }
      return 0
    })
  }, [filteredProducts, sortOption])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-lg">Loading sale items...</p>
          <div className="sr-only" aria-live="polite">
            Loading sale items...
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-red-600 p-4">
        <h2 className="text-2xl font-bold mb-2">Error Loading Products</h2>
        <p className="mb-6 text-center">{error}</p>
        <AnimatedButton onClick={() => window.location.reload()}>
          Try Again
        </AnimatedButton>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative">
      <ScrollingGrid />
      {/* Hero Section */}
      <section className="relative h-[70vh] w-full overflow-hidden border-b-8 border-primary bg-primary-dark">
        <div className="absolute inset-0 bg-black/20 z-10" />
        <Image
          src="https://images.unsplash.com/photo-1577538928305-3807c3993047?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Sale"
          fill
          className="object-cover opacity-70"
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
              <span>Sale</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-black mb-4 uppercase threed-text">
              Mega Sale
            </h1>
            <p className="text-xl text-black max-w-xl uppercase mb-4">
              Up to 50% off on selected items. Limited time offer.
            </p>
            {/* Countdown Timer */}
            <div className="flex justify-center items-center gap-4 mt-4 mb-2">
              <div className="bg-primary text-white p-2 w-16 text-center transform rotate-2">
                <div className="text-2xl font-bold">{timeLeft.days}</div>
                <div className="text-xs uppercase">Days</div>
              </div>
              <div className="bg-primary text-white p-2 w-16 text-center transform -rotate-2">
                <div className="text-2xl font-bold">{timeLeft.hours}</div>
                <div className="text-xs uppercase">Hours</div>
              </div>
              <div className="bg-primary text-white p-2 w-16 text-center transform rotate-2">
                <div className="text-2xl font-bold">{timeLeft.minutes}</div>
                <div className="text-xs uppercase">Mins</div>
              </div>
              <div className="bg-primary text-white p-2 w-16 text-center transform -rotate-2">
                <div className="text-2xl font-bold">{timeLeft.seconds}</div>
                <div className="text-xs uppercase">Secs</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Featured Sale Items */}
        {featuredProducts.length > 0 && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 uppercase threed-text">
              Featured Sale Items
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 opacity-90">
              {featuredProducts.map((product) => (
                <FeaturedProductCard key={product._id} product={product} />
              ))}
            </div>
          </div>
        )}

        {/* Filter & Sort Controls */}
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
            <SortButton
              active={sortOption === "discount"}
              onClick={() => setSortOption("discount")}
            >
              Biggest Discount
            </SortButton>
            <SortButton
              active={sortOption === "price-low"}
              onClick={() => setSortOption("price-low")}
            >
              Price: Low to High
            </SortButton>
            <SortButton
              active={sortOption === "price-high"}
              onClick={() => setSortOption("price-high")}
            >
              Price: High to Low
            </SortButton>
            <SortButton
              active={sortOption === "savings"}
              onClick={() => setSortOption("savings")}
            >
              Biggest Savings
            </SortButton>
          </div>
        </div>

        {/* Expanded Filter Panel */}
        {isFilterOpen && (
          <div id="filter-panel" className="brutalist-container mb-8">
            <h3 className="text-xl font-bold mb-4 uppercase">Filter By Category</h3>
            <div className="flex flex-wrap gap-3">
              <CategoryButton
                active={activeCategory === "all"}
                onClick={() => setActiveCategory("all")}
              >
                All Sale Items
              </CategoryButton>
              <CategoryButton
                active={activeCategory === "jewelry"}
                onClick={() => setActiveCategory("jewelry")}
              >
                Jewelry
              </CategoryButton>
              <CategoryButton
                active={activeCategory === "mens-coats"}
                onClick={() => setActiveCategory("mens-coats")}
              >
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

        {/* Sale Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-16">
          {sortedProducts.length > 0 ? (
            sortedProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
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
            <h3 className="text-2xl font-bold mb-4">No sale items found</h3>
            <p className="mb-8">Try changing your filter or check back soon.</p>
            <AnimatedButton href="/" animation="bounce">
              Back to Home
            </AnimatedButton>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-28 brutalist-container text-white">
          <CircleDoodle className="absolute top-5 right-5 text-white opacity-30" />
          <h2 className="text-3xl font-bold mb-4 uppercase text-center text-black">
            Don't Miss Out!
          </h2>
          <p className="mb-6 uppercase text-gray-600 text-center text-xl font-semibold">
            Sale ends soon. Shop now before your favorite items sell out!
          </p>
          <div className="flex justify-center">
            <AnimatedButton variant="white" size="lg" iconPosition="right">
              Shop All Sale Items
            </AnimatedButton>
          </div>
        </div>
      </div>
    </div>
  )
}

// Helper Components

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
            ? "bg-accent text-white border-2 border-accent-dark"
            : "bg-white text-accent border-2 border-accent hover:bg-accent hover:text-white"
        }
      `}
      aria-pressed={active}
    >
      <ArrowUpDown
        className={`inline-block mr-1 h-3 w-3 ${active ? "text-white" : "text-accent"}`}
      />
      {children}
    </button>
  )
}

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
            ? "bg-accent text-white border-4 border-accent-dark"
            : "bg-white text-accent border-4 border-accent hover:bg-accent hover:text-white"
        }
      `}
      aria-pressed={active}
    >
      {children}
      <span
        className={`absolute top-0 right-0 w-3 h-3 ${
          active ? "bg-primary" : "bg-secondary"
        } transform translate-x-1/2 -translate-y-1/2`}
      ></span>
    </button>
  )
}

function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart()
  const imageUrl = `${process.env.NEXT_PUBLIC_API_URL}${product.image || "/placeholder.svg"}`

  const handleAddToCart = () => {
    const cartProduct = {
      id: product._id,
      name: product.name,
      price: product.salePrice ?? product.price,
      image: imageUrl,
      quantity: 1,
    }

    addToCart(cartProduct)
    toast.success(`${product.name} added to cart`)
  }

  return (
    <div className="brutalist-card transform-card group" aria-label={`Product: ${product.name}`}>
      <div className="relative h-[300px]">
        <Image
          src={imageUrl}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-0 left-0">
          <div className="brutalist-badge bg-accent transform -rotate-12">
            {product.discount}% OFF
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-white border-t-4 border-primary p-2 flex justify-between">
          <button
            className="p-2 border-2 border-primary hover:border-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            aria-label={`Add ${product.name} to wishlist`}
          >
            <Heart className="h-5 w-5" />
          </button>
          <button
            onClick={handleAddToCart}
            className="p-2 bg-red-600 text-white border-red-600 hover:bg-green-500 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingBag className="h-5 w-5 mr-2" />
            <span>ADD TO CART</span>
          </button>
        </div>
      </div>
      <div className="p-4 border-t-4 border-accent">
        <Link 
          href={`/product/${product._id}`} 
          className="hover:underline focus:underline focus:outline-none"
        >
          <h3 className="font-bold text-lg mb-1 uppercase">{product.name}</h3>
        </Link>
        <div className="flex justify-between items-center">
          <div>
            <span className="font-bold text-accent transform inline-block">
              ${(product.salePrice || 0).toFixed(2)}
            </span>
            <span className="ml-2 text-gray-500 line-through text-sm">
              ${product.price.toFixed(2)}
            </span>
          </div>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-500 mr-1" />
            <span className="text-sm font-bold">{product.rating}</span>
            <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
          </div>
        </div>
        <div className="mt-2 bg-accent text-white text-xs font-bold px-2 py-1 flex items-center w-max">
          <Percent className="h-3 w-3 mr-1" />
          SAVE ${(product.price - (product.salePrice || 0)).toFixed(2)}
        </div>
      </div>
    </div>
  )
}

function FeaturedProductCard({ product }: { product: Product }) {
  const imageUrl = `${process.env.NEXT_PUBLIC_API_URL}${product.image || "/placeholder.svg"}`

  return (
    <div className="brutalist-card transform-card group" aria-label={`Featured product: ${product.name}`}>
      <div className="relative h-[400px]">
        <Image
          src={imageUrl}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute top-0 left-0 right-0 bg-primary text-white py-2 text-center font-bold uppercase transform -rotate-2">
          Featured Deal
        </div>
        <div className="absolute top-10 left-0">
          <div className="brutalist-badge bg-accent transform rotate-12 text-xl px-4 py-2">
            {product.discount}% OFF
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-80 border-t-4 border-primary p-4 flex justify-between">
          <div>
            <div className="text-lg font-bold uppercase">{product.name}</div>
            <div className="flex items-center mt-1">
              <span className="font-bold text-accent text-xl inline-block">
                ${(product.salePrice || 0).toFixed(2)}
              </span>
              <span className="ml-2 text-gray-500 line-through">
                ${product.price.toFixed(2)}
              </span>
            </div>
          </div>
          <div className="flex items-center">
            <AnimatedButton
              href={`/product/${product._id}`}
              variant="accent"
              animation="bounce"
              size="sm"
            >
              Shop Now
            </AnimatedButton>
          </div>
        </div>
      </div>
    </div>
  )
}

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