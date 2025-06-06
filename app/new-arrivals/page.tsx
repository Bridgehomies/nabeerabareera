"use client"

import type React from "react"
import { useCart } from "@/context/CartContext"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight, Filter, ArrowUpDown, ShoppingBag, Heart, Star } from "lucide-react"
import { ScrollingGrid } from "@/components/ui-brutalist/scrolling-grid"
import { AnimatedButton } from "@/components/ui-brutalist/animated-button"
import { CircleDoodle, StarDoodle } from "@/components/ui-brutalist/doodles"
import { getNewArrivals, Product } from "@/lib/data/products"

export default function NewArrivalsPage() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [sortOption, setSortOption] = useState("newest")
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  // Get new arrivals from central data store
  const newArrivals = getNewArrivals()

  // Filter products by category
  const filteredProducts =
    activeCategory === "all" ? newArrivals : newArrivals.filter((product) => product.category === activeCategory)

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === "newest") {
      return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
    } else if (sortOption === "price-low") {
      return a.price - b.price
    } else if (sortOption === "price-high") {
      return b.price - a.price
    } else if (sortOption === "rating") {
      return b.rating - a.rating
    }
    return 0
  })

  return (
    <div className="min-h-screen relative">
      <ScrollingGrid />

      {/* Hero Section */}
      <section className="relative h-[60vh] w-full overflow-hidden border-b-8 border-primary">
        <div className="absolute inset-0 bg-black/10 z-10" />
        <Image src="https://images.unsplash.com/photo-1581041122145-9f17c04cd153?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="New Arrivals" fill className="object-cover" priority />
        <div className="relative z-20 container mx-auto h-full flex flex-col justify-center px-4 md:px-6">
          <div className="brutalist-container bg-white max-w-2xl ">
            <StarDoodle className="absolute -top-10 -right-10 text-accent" />
            <div className="flex items-center text-black text-sm mb-2 uppercase font-bold">
              <Link href="/" className="hover:text-gray-700">
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
              className="flex items-center font-bold uppercase mb-4 md:mb-0 transform hover:rotate-2 transition-transform"
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
          <div className="brutalist-container mb-8 ">
            <h3 className="text-xl font-bold mb-4 uppercase">Filter By Category</h3>
            <div className="flex flex-wrap gap-3">
              <CategoryButton active={activeCategory === "all"} onClick={() => setActiveCategory("all")}>
                All New Arrivals
              </CategoryButton>
              <CategoryButton active={activeCategory === "jewelry"} onClick={() => setActiveCategory("jewelry")}>
                Jewelry
              </CategoryButton>
              <CategoryButton active={activeCategory === "mens-coats"} onClick={() => setActiveCategory("mens-coats")}>
                Men's Coats
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* No Products Found */}
        {sortedProducts.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-2xl font-bold mb-4">No products found</h3>
            <p className="mb-8">Try changing your filter or check back soon for new arrivals.</p>
            <AnimatedButton href="/" animation="bounce">
              Back to Home
            </AnimatedButton>
          </div>
        )}

        {/* Newsletter Signup */}
        <div className="mt-16 brutalist-container text-white ">
          <CircleDoodle className="absolute top-5 right-5 text-white opacity-30" />
          <h2 className="text-3xl font-bold mb-4 uppercase text-black">Be the First to Know</h2>
          <p className="mb-6 uppercase text-gray-600 text-xl font-semibold">
            Sign up for our newsletter to get early access to new arrivals and exclusive offers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 ">
            <input
              type="email"
              placeholder="YOUR EMAIL ADDRESS"
              className="newsletter-input flex-grow placeholder-white"
            />
            <AnimatedButton variant="white"  iconPosition="right">
              Subscribe
            </AnimatedButton>
          </div>
        </div>
      </div>
    </div>
  )
}

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
    >
      <ArrowUpDown className={`inline-block mr-1 h-3 w-3 ${active ? "text-white" : "text-primary"}`} />
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
            ? "bg-primary text-white border-4 border-primary-dark"
            : "bg-white text-primary border-4 border-primary hover:bg-primary hover:text-white"
        }
      `}
    >
      {children}
      {/* Decorative corner */}
      <span
        className={`absolute top-0 right-0 w-3 h-3 ${
          active ? "bg-accent" : "bg-secondary"
        } transform translate-x-1/2 -translate-y-1/2`}
      ></span>
    </button>
  )
}

function ProductCard({ product }: { product: any }) {
  const daysSinceAdded = Math.floor(
    (new Date().getTime() - new Date(product.dateAdded).getTime()) / (1000 * 60 * 60 * 24),
  )

  return (
    <div className="brutalist-card transform-card group">
      <div className="relative h-[300px]">
        <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />

        {/* New badge */}
        <div className="absolute top-0 left-0">
          <div className="brutalist-badge bg-accent transform -rotate-12">
            {daysSinceAdded <= 3 ? "JUST IN" : "NEW"}
          </div>
        </div>

        {/* Days since added */}
        <div className="absolute top-0 right-0 bg-black text-white px-2 py-1 text-xs font-bold transform rotate-12">
          {daysSinceAdded} {daysSinceAdded === 1 ? "DAY" : "DAYS"} AGO
        </div>

        {/* Quick actions */}
        <div className="absolute bottom-0 left-0 right-0 bg-white border-t-4 border-primary p-2 flex justify-between">
            <button className="p-2 border-2 border-primary">
              <Heart className="h-5 w-5" />
            </button>
            <button onClick={() => useCart(Product)} className="p-2 bg-red-600 text-white  border-red-600 hover:bg-green-500 flex items-center justify-center">
              <ShoppingBag className="h-5 w-5 mr-2" />
              <span>ADD TO CART</span>
            </button>
          </div>
      </div>

      <div className="p-4 border-t-4 border-primary">
        <Link href={`/product/${product.id}`} className="hover:underline">
          <h3 className="font-bold text-lg mb-1 uppercase">{product.name}</h3>
        </Link>
        <div className="flex justify-between items-center">
          <span className="font-bold transform  inline-block">${product.price.toFixed(2)}</span>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-500 mr-1" />
            <span className="text-sm font-bold">{product.rating}</span>
            <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
          </div>
        </div>
      </div>
    </div>
  )
}
