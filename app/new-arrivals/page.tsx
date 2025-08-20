"use client"

import React, { useState, useEffect, useMemo, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight, Filter, ArrowUpDown, Star, X } from "lucide-react"
import { FiShoppingCart } from "react-icons/fi"
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
  image: string
  inStock: boolean
  dateAdded: string
  rating: number
  reviews: number
}

// Define API response type
type ProductApiResponse = {
  id: string;
  name: string;
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

export default function NewArrivalsPage() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [sortOption, setSortOption] = useState("newest")
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { addToCart } = useCart()
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [expandedProductIds, setExpandedProductIds] = useState<Set<string>>(new Set())

  // Fetch products from backend API
  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true)
        setError(null)

        if (!process.env.NEXT_PUBLIC_API_URL) {
          throw new Error("API configuration error")
        }

        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 10000)

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/`, {
          signal: controller.signal,
          headers: { 'Content-Type': 'application/json' }
        })
        
        clearTimeout(timeoutId)
        
        if (!res.ok) {
          throw new Error(`Failed to fetch products: ${res.status} ${res.statusText}`)
        }
        
        const data: ProductApiResponse[] = await res.json()

        // Transform API data
        const transformedData: Product[] = data.map((product) => {
          const primaryImage = product.images?.[0] || "/placeholder.svg"
          const isNew = product.metadata?.isNew || 
            (new Date().getTime() - new Date(product.created_at).getTime()) / (1000 * 3600 * 24) <= 90

          return {
            _id: product.id,
            name: product.name,
            price: product.price,
            salePrice: product.sale_price,
            category: product.metadata?.category || product.category || "uncategorized",
            subcategory: product.metadata?.subcategories?.[0],
            image: primaryImage,
            inStock: product.inStock,
            dateAdded: product.created_at,
            rating: product.metadata?.rating || 0,
            reviews: product.metadata?.reviews || 0,
            isNew,
            isSale: product.metadata?.isSale || 
              (product.sale_price !== null && product.sale_price < product.price),
            discount: product.sale_price !== null && product.sale_price < product.price
              ? Math.round(((product.price - product.sale_price) / product.price) * 100)
              : undefined,
          }
        })

        setProducts(transformedData)
      } catch (error: any) {
        console.error("Error fetching products:", error)
        setError(error instanceof Error ? error.message : "Failed to load products")
        toast.error("Failed to load products. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  // Get available categories
  const availableCategories = useMemo(() => {
    const categories = new Set(products.map(p => p.category))
    return Array.from(categories)
  }, [products])

  // Filter and sort products
  const processedProducts = useMemo(() => {
    return [...products]
      .filter(product => product.isNew && (activeCategory === "all" || product.category === activeCategory))
      .sort((a, b) => {
        switch (sortOption) {
          case "newest":
            return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
          case "price-low":
            return (a.salePrice ?? a.price) - (b.salePrice ?? b.price)
          case "price-high":
            return (b.salePrice ?? b.price) - (a.salePrice ?? a.price)
          case "rating":
            return b.rating - a.rating
          default:
            return 0
        }
      })
  }, [products, activeCategory, sortOption])

  // Clear filters
  const clearFilters = useCallback(() => {
    setActiveCategory("all")
    setSortOption("newest")
  }, [])

  // Toggle product expansion
  const toggleProductExpansion = useCallback((id: string) => {
    setExpandedProductIds(prev => {
      const newSet = new Set(prev)
      newSet.has(id) ? newSet.delete(id) : newSet.add(id)
      return newSet
    })
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-lg">Loading products...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-center p-8 brutalist-container max-w-md">
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
    )
  }

  return (
    <div className="min-h-screen relative">
      {/* Hero Section */}
      <section className="relative h-[70vh] w-full overflow-hidden border-b-8 border-primary">
        <div className="absolute inset-0 bg-black/10 z-10" />
        <Image
          src="https://images.unsplash.com/photo-1581041122145-9f17c04cd153?q=80&w=1471&auto=format&fit=crop"
          alt="New Arrivals"
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-20 container mx-auto h-full flex flex-col justify-center px-4 md:px-6">
          <div className="brutalist-container bg-white max-w-2xl">
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
        {/* Mobile Filter Button */}
        <div className="md:hidden mb-6">
          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="flex items-center justify-center w-full py-3 px-4 brutalist-button bg-primary text-white font-bold uppercase"
          >
            <Filter className="mr-2 h-5 w-5" /> Filter & Sort
          </button>
        </div>

        {/* Filter and Sort Controls - Desktop */}
        <div className="hidden md:flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
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
            {[
              { value: "newest", label: "Newest" },
              { value: "price-low", label: "Price: Low to High" },
              { value: "price-high", label: "Price: High to Low" },
              { value: "rating", label: "Top Rated" }
            ].map(option => (
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

        {/* Active Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {activeCategory !== "all" && (
            <div className="flex items-center brutalist-badge bg-primary text-white">
              {activeCategory}
              <button 
                onClick={() => setActiveCategory("all")}
                className="ml-2 hover:text-gray-300"
                aria-label={`Remove ${activeCategory} filter`}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}
          {sortOption !== "newest" && (
            <div className="flex items-center brutalist-badge bg-accent text-black">
              Sorted: {sortOption === "price-low" ? "Low to High" : 
                      sortOption === "price-high" ? "High to Low" : "Top Rated"}
              <button 
                onClick={() => setSortOption("newest")}
                className="ml-2 hover:text-gray-700"
                aria-label="Remove sort filter"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}
          {(activeCategory !== "all" || sortOption !== "newest") && (
            <button 
              onClick={clearFilters}
              className="brutalist-badge bg-gray-200 text-black hover:bg-gray-300"
              aria-label="Clear all filters"
            >
              Clear All
            </button>
          )}
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Filters - Desktop */}
          <aside 
            className={`md:w-64 md:block ${isFilterOpen ? 'block' : 'hidden'} md:sticky md:top-4 md:self-start`}
          >
            <div className="brutalist-container mb-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold uppercase">Categories</h3>
                <button 
                  onClick={() => setIsFilterOpen(false)} 
                  className="md:hidden"
                  aria-label="Close filters"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="space-y-2">
                <CategoryButton 
                  active={activeCategory === "all"} 
                  onClick={() => setActiveCategory("all")}
                >
                  All New Arrivals ({products.filter(p => p.isNew).length})
                </CategoryButton>
                {availableCategories.map(category => {
                  const count = products.filter(p => p.category === category && p.isNew).length
                  if (count === 0) return null
                  
                  return (
                    <CategoryButton 
                      key={category}
                      active={activeCategory === category} 
                      onClick={() => setActiveCategory(category)}
                    >
                      {category} ({count})
                    </CategoryButton>
                  )
                })}
              </div>
            </div>
          </aside>

          {/* Mobile Filter Overlay */}
          {mobileFiltersOpen && (
            <div className="fixed inset-0 z-50 md:hidden">
              <div className="absolute inset-0 bg-black/50" onClick={() => setMobileFiltersOpen(false)}></div>
              <div className="absolute inset-y-0 left-0 w-4/5 max-w-sm bg-white p-6 brutalist-container">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold uppercase">Filters</h2>
                  <button 
                    onClick={() => setMobileFiltersOpen(false)}
                    aria-label="Close filters"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                
                <div className="mb-8">
                  <h3 className="text-lg font-bold mb-3 uppercase">Categories</h3>
                  <div className="space-y-2">
                    <CategoryButton 
                      active={activeCategory === "all"} 
                      onClick={() => {
                        setActiveCategory("all")
                        setMobileFiltersOpen(false)
                      }}
                    >
                      All New Arrivals ({products.filter(p => p.isNew).length})
                    </CategoryButton>
                    {availableCategories.map(category => {
                      const count = products.filter(p => p.category === category && p.isNew).length
                      if (count === 0) return null
                      
                      return (
                        <CategoryButton 
                          key={category}
                          active={activeCategory === category} 
                          onClick={() => {
                            setActiveCategory(category)
                            setMobileFiltersOpen(false)
                          }}
                        >
                          {category} ({count})
                        </CategoryButton>
                      )
                    })}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-bold mb-3 uppercase">Sort By</h3>
                  <div className="space-y-2">
                    {[
                      { value: "newest", label: "Newest" },
                      { value: "price-low", label: "Price: Low to High" },
                      { value: "price-high", label: "Price: High to Low" },
                      { value: "rating", label: "Top Rated" }
                    ].map(option => (
                      <SortButton 
                        key={option.value}
                        active={sortOption === option.value} 
                        onClick={() => {
                          setSortOption(option.value)
                          setMobileFiltersOpen(false)
                        }}
                      >
                        {option.label}
                      </SortButton>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Product Grid */}
          <main className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold uppercase">
                {activeCategory === "all" ? "All New Arrivals" : activeCategory}
                <span className="text-primary ml-2">({processedProducts.length})</span>
              </h2>
              <div className="md:hidden">
                <label htmlFor="mobile-sort" className="sr-only">Sort products</label>
                <select 
                  id="mobile-sort"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="brutalist-select"
                >
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
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
                  <p className="mb-8">
                    {activeCategory === "all" 
                      ? "We don't have any new products at the moment. Check back soon!" 
                      : `No new arrivals in ${activeCategory}. Try selecting a different category.`
                    }
                  </p>
                  <Link 
                    href="/" 
                    className="brutalist-button bg-primary text-white font-bold uppercase"
                  >
                    Back to Home
                  </Link>
                </div>
              )}
            </div>
          </main>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-28 brutalist-container text-white relative">
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-4 uppercase text-black">Be the First to Know</h2>
            <p className="mb-6 uppercase text-gray-600 text-xl font-semibold">
              Sign up for our newsletter to get early access to new arrivals and exclusive offers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <label htmlFor="newsletter-email" className="sr-only">Email address for newsletter</label>
              <input
                type="email"
                id="newsletter-email"
                placeholder="YOUR EMAIL ADDRESS"
                className="newsletter-input flex-grow placeholder-white"
              />
              <button className="brutalist-button bg-white text-black font-bold uppercase">
                Subscribe
              </button>
            </div>
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
  onClick
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

// Category Button Component
function CategoryButton({
  children,
  active,
  onClick
}: {
  children: React.ReactNode
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`
        relative px-4 py-2 text-sm font-bold uppercase w-full text-left
        ${
          active
            ? "bg-primary text-white border-4 border-primary-dark"
            : "bg-white text-primary border-4 border-primary hover:bg-primary hover:text-white"
        }
      `}
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
const ProductCard = React.memo(({ 
  product,
  isExpanded,
  onToggleExpand
}: { 
  product: Product,
  isExpanded: boolean,
  onToggleExpand: () => void
}) => {
  const { addToCart } = useCart()

  const imageUrl = product.image.startsWith('http') 
    ? product.image 
    : `${process.env.NEXT_PUBLIC_API_URL}${product.image}`

  const handleAddToCart = () => {
    const cartProduct = {
      id: product._id,
      name: product.name,
      price: product.isSale && product.salePrice ? product.salePrice : product.price,
      image: imageUrl,
      quantity: 1,
    }

    addToCart(cartProduct)
    toast.success(`${cartProduct.name} added to cart`)
  }

  const daysSinceAdded = useMemo(() => {
    const productDate = new Date(product.dateAdded)
    const currentDate = new Date()
    return Math.floor((currentDate.getTime() - productDate.getTime()) / (1000 * 3600 * 24))
  }, [product.dateAdded])

  return (
    <div
      className="brutalist-card transform-card group relative"
      aria-label={`Product: ${product.name}`}
    >
      <div className="relative h-[300px]">
        <Image
          src={imageUrl}
          alt={`${product.name} - Product image`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onError={(e) => {
            e.currentTarget.src = "/placeholder.svg"
          }}
        />

        {/* New badge */}
        {product.isNew && (
          <div className="absolute top-2 left-2">
            <div className="brutalist-badge bg-accent transform -rotate-6">
              {daysSinceAdded <= 3 ? "JUST IN" : "NEW"}
            </div>
          </div>
        )}

        {/* Sale badge */}
        {product.isSale && product.salePrice !== null && (
          <div className="absolute top-2 right-2">
            <div className="brutalist-badge bg-red-600 transform rotate-6">SALE</div>
          </div>
        )}

        {/* Discount badge */}
        {product.discount && product.discount > 0 && (
          <div className="absolute bottom-2 left-2 bg-black text-white px-2 py-1 text-xs font-bold">
            {product.discount}% OFF
          </div>
        )}

        {/* Quick actions */}
        <div className={`absolute bottom-0 left-0 right-0 bg-white border-t-4 border-primary p-2 transition-opacity ${isExpanded ? 'opacity-100' : 'opacity-0'}`}>
          <button
            onClick={handleAddToCart}
            className="p-2 bg-red-600 text-white border-red-600 hover:bg-green-500 flex items-center justify-center w-full"
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
        
        <button
          onClick={onToggleExpand}
          className="mt-2 text-sm font-bold uppercase text-primary hover:underline"
          aria-expanded={isExpanded}
          aria-label={isExpanded ? `Hide details for ${product.name}` : `Show details for ${product.name}`}
        >
          {isExpanded ? "Hide Details" : "View Details"}
        </button>
      </div>
    </div>
  )
})

// Memoized Product Card for performance
const ProductCardMemo = React.memo(ProductCard)