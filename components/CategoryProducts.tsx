// Path: nabeerabareera/components/category-products.tsx
"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { CircleDoodle, StarDoodle } from "@/components/ui-brutalist/doodles"
import { AnimatedButton } from "@/components/ui-brutalist/animated-button"
import { FiShoppingCart } from "react-icons/fi"
import { useCart } from "@/context/CartContext"
import { toast } from "sonner"

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

export function CategoryProducts({ initialCategory }: { initialCategory?: string }) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState(initialCategory || "all")
  const carouselRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  const { addToCart } = useCart()

  // Fetch all products from API
  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`)
        if (!res.ok) throw new Error("Failed to fetch products")
        const data = await res.json()

        // Add derived fields (isNew, isSale, discount)
        const processed = data.map((product: any) => {
          const isNew = isProductNew(product.dateAdded)
          const isSale =
            typeof product.salePrice === "number" && product.salePrice < product.price
          const discount = isSale
            ? Math.round(((product.price - product.salePrice) / product.price) * 100)
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
        console.error("Error loading products:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  // Filter products by category
  const filteredProducts =
    activeCategory === "all"
      ? products
      : products.filter((product) => product.category === activeCategory)

  // Helper functions for dragging carousel
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!carouselRef.current) return
    setIsDragging(true)
    setStartX(e.pageX - carouselRef.current.offsetLeft)
    setScrollLeft(carouselRef.current.scrollLeft)
    document.body.style.cursor = "grabbing"
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    document.body.style.cursor = "default"
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !carouselRef.current) return
    const x = e.pageX - carouselRef.current.offsetLeft
    const walk = (x - startX) * 2
    carouselRef.current.scrollLeft = scrollLeft - walk
  }

  const scroll = (direction: "left" | "right") => {
    if (!carouselRef.current) return
    const { scrollLeft, clientWidth } = carouselRef.current
    const scrollTo = direction === "left"
      ? scrollLeft - clientWidth / 2
      : scrollLeft + clientWidth / 2
    carouselRef.current.scrollTo({ left: scrollTo, behavior: "smooth" })
  }

  useEffect(() => {
    window.addEventListener("mouseup", handleMouseUp)
    window.addEventListener("mouseleave", handleMouseUp)
    return () => {
      window.removeEventListener("mouseup", handleMouseUp)
      window.removeEventListener("mouseleave", handleMouseUp)
    }
  }, [])

  // Calculate if product is new (within last 14 days)
  const isProductNew = (dateString: string): boolean => {
    const productDate = new Date(dateString)
    const currentDate = new Date()
    const diffTime = currentDate.getTime() - productDate.getTime()
    const diffDays = diffTime / (1000 * 60 * 60 * 24)
    return diffDays <= 14
  }

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6 flex justify-center items-center h-64">
          <p>Loading products...</p>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-white brutalist-section relative overflow-hidden">
      <CircleDoodle className="absolute top-10 left-10 text-accent" />
      <StarDoodle className="absolute bottom-10 right-10 text-primary" />
      <div className="container mx-auto px-4 md:px-6">
        {/* Category Filters */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold uppercase">Products</h2>
          <div className="flex gap-4">
            <CategoryButton
              active={activeCategory === "all"}
              onClick={() => setActiveCategory("all")}
            >
              All
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

        {/* Draggable Carousel */}
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
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseUp}
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <div className="flex gap-6">
              {filteredProducts.slice(0, 8).map((product) => (
                <ProductCard key={product._id} product={product} addToCart={addToCart} toast={toast} />
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
        relative px-4 py-2 text-sm font-bold uppercase transition-all
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
        className={`absolute top-0 right-0 w-3 h-3 ${active ? "bg-accent" : "bg-secondary"} transform translate-x-1/2 -translate-y-1/2`}
      ></span>
    </button>
  )
}

function ProductCard({
  product,
  addToCart,
  toast,
}: {
  product: Product
  addToCart: Function
  toast: any
}) {
  const imageUrl = `${process.env.NEXT_PUBLIC_API_URL}${product.image}`

  const handleAddToCart = () => {
    const cartProduct = {
      id: product._id,
      name: product.name,
      price: product.isSale && product.salePrice ? product.salePrice : product.price,
      image: imageUrl,
    }

    addToCart(cartProduct)
    toast.success(`${cartProduct.name} added to cart`)
  }

  function setIsHovered(arg0: boolean): void {
    throw new Error("Function not implemented.")
  }

  return (
    <div
      className="brutalist-card transform-card min-w-[280px] w-[280px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-[300px]">
        <Image src={imageUrl} alt={product.name} fill className="object-cover" />
        {/* Sale badge */}
        {product.isSale && product.salePrice !== null && (
          <div className="brutalist-badge transform rotate-12">SALE</div>
        )}
        {/* Quick actions */}
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
  )
}