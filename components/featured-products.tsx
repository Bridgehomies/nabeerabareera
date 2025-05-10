"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"
import { AnimatedButton } from "@/components/ui-brutalist/animated-button"
import { CircleDoodle, StarDoodle } from "@/components/ui-brutalist/doodles"
import { processedProducts } from "@/lib/data/products"

export function FeaturedProducts() {
  const [activeCategory, setActiveCategory] = useState("all")
  const isMobile = useMobile()
  const carouselRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  // Filter products by category
  const filteredProducts =
    activeCategory === "all"
      ? processedProducts
      : processedProducts.filter((product) => product.category === activeCategory)

  // Draggable carousel functionality
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
    const walk = (x - startX) * 2 // Scroll speed
    carouselRef.current.scrollLeft = scrollLeft - walk
  }

  // Handle scroll with buttons
  const scroll = (direction: "left" | "right") => {
    if (!carouselRef.current) return
    const { scrollLeft, clientWidth } = carouselRef.current
    const scrollTo = direction === "left" ? scrollLeft - clientWidth / 2 : scrollLeft + clientWidth / 2

    carouselRef.current.scrollTo({
      left: scrollTo,
      behavior: "smooth",
    })
  }

  useEffect(() => {
    // Clean up the dragging state if mouse leaves window
    const handleMouseLeave = () => {
      if (isDragging) {
        setIsDragging(false)
        document.body.style.cursor = "default"
      }
    }

    window.addEventListener("mouseup", handleMouseUp)
    window.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      window.removeEventListener("mouseup", handleMouseUp)
      window.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [isDragging])

  return (
    <section className="py-16 bg-white brutalist-section relative overflow-hidden">
      <CircleDoodle className="absolute top-10 left-10 text-accent" />
      <StarDoodle className="absolute bottom-10 right-10 text-primary" />

      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12">
          <h2 className="text-5xl md:text-6xl font-bold mb-4 md:mb-0 uppercase threed-text">Products</h2>
          <div className="flex flex-wrap gap-4">
            <CategoryButton active={activeCategory === "all"} onClick={() => setActiveCategory("all")}>
              All
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

        {/* Draggable Product Carousel */}
        <div className="relative">
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white p-2 hover:bg-primary hover:text-white transition-all
                      border-4 border-primary "
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
            <div className="flex gap-6">
              {filteredProducts.slice(0, 8).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>

          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white p-2 hover:bg-primary hover:text-white transition-all
                      border-4 border-primary "
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

function ProductCard({ product }: { product: any }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="brutalist-card transform-card min-w-[280px] w-[280px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-[300px]">
        <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />

        {/* Product badges */}
        <div className="absolute top-0 left-0 flex flex-col gap-2">
          {product.isNew && <div className="brutalist-badge transform -rotate-12">NEW</div>}
          {product.isSale && <div className="brutalist-badge transform rotate-12">SALE</div>}
        </div>

        {/* Quick actions */}
        {isHovered && (
          <div className="absolute bottom-0 left-0 right-0 bg-white border-t-4 border-primary p-2 flex justify-between">
            <button className="p-2 border-2 border-primary">
              <Heart className="h-5 w-5" />
            </button>
            <button className="p-2 bg-red-600 text-white  border-red-600 hover:bg-green-500 flex items-center justify-center">
              <ShoppingCart className="h-5 w-5 mr-2" />
              <span>ADD TO CART</span>
            </button>
          </div>
        )}
      </div>

      <div className="p-4 border-t-4 border-primary">
        <Link href={`/product/${product.id}`} className="hover:underline">
          <h3 className="font-bold text-lg mb-1 uppercase">{product.name}</h3>
        </Link>
        <div className="flex items-center">
          {product.isSale ? (
            <>
              <span className="text-accent font-bold transform  inline-block">
                ${product.salePrice?.toFixed(2)}
              </span>
              <span className="ml-2 text-gray-500 line-through">${product.price.toFixed(2)}</span>
            </>
          ) : (
            <span className="font-bold transform  inline-block">${product.price.toFixed(2)}</span>
          )}
        </div>
      </div>
    </div>
  )
}
