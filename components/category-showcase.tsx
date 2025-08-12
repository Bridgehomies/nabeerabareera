"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { useState } from "react"
import { AnimatedButton } from "./ui-brutalist/animated-button"
import { StarDoodle, ZigzagDoodle } from "./ui-brutalist/doodles"

const categories = [
  {
    id: 1,
    name: "Artificial Jewelry",
    description: "Unique handcrafted pieces that make a statement",
    image: "https://images.unsplash.com/photo-1631560230221-faff391fd241?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "/category/jewelry",
  },
  {
    id: 2,
    name: "Coats",
    description: "Premium coats for the modern gentleman",
    image: "https://images.unsplash.com/photo-1633655442168-c6ef0ed2f984?q=80&w=1476&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "/category/mens-coats",
  },
  {
    id: 3,
    name: "Kids Clothing",
    description: "Comfortable and stylish outfits for children",
    image: "https://images.unsplash.com/photo-1670014543406-a26719b352ca?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "/category/kids-clothing",
  },
]

export function CategoryShowcase() {
  const [activeCategory, setActiveCategory] = useState(0)

  return (
    <section className="py-8 sm:py-12 md:py-16 bg-white relative overflow-hidden">
      <StarDoodle className="absolute top-4 sm:top-10 lg:top-20 right-4 sm:right-10 lg:right-20 text-primary-dark w-12 sm:w-16 lg:w-20" />
      <ZigzagDoodle className="absolute bottom-4 sm:bottom-6 lg:bottom-10 left-4 sm:left-10 lg:left-20 text-accent-dark w-12 sm:w-16 lg:w-20" />

      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-6 sm:mb-8 md:mb-12 uppercase threed-text">
          Explore Categories
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
          {/* Category Navigation */}
          <div className="space-y-4 sm:space-y-6 md:space-y-8">
            {categories.map((category, index) => (
              <div
                key={category.id}
                className={`brutalist-nav-item cursor-pointer p-4 sm:p-5 md:p-6 transition-all duration-300 ${
                  activeCategory === index
                    ? "bg-primary text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
                onClick={() => setActiveCategory(index)}
              >
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-1 sm:mb-2">{category.name}</h3>
                <p className="text-sm sm:text-base md:text-lg mb-2 sm:mb-4">{category.description}</p>
                <div className="flex items-center">
                  <span className="mr-2 font-bold uppercase text-xs sm:text-sm md:text-base">
                    Browse Collection
                  </span>
                  <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
              </div>
            ))}
          </div>

          {/* Category Image (disabled on small screens) */}
          <div className="relative">
            {categories.map((category, index) => (
              <div
                key={category.id}
                className={`brutalist-showcase absolute inset-0 transition-all duration-500 ${
                  activeCategory === index ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
              >
                <div className="hidden sm:block">
                  {/* Image container with responsive height */}
                  <div className="relative h-[300px] sm:h-[400px] md:h-[500px] overflow-hidden brutalist-image-border">
                    <Image
                      src={category.image.replace(/\?.*$/, "")}
                      alt={category.name}
                      fill
                      className="object-cover"
                    />
                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-black bg-opacity-20 z-10" />
                    {/* Content overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 md:p-6 bg-white bg-opacity-50 z-20">
                      <div className="flex items-center justify-between flex-wrap gap-2 sm:gap-4">
                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold m-0">{category.name}</h3>
                        <AnimatedButton
                          href={category.link}
                          variant="primary"
                          className="flex items-center py-1 sm:py-2 px-2 sm:px-4 h-auto text-xs sm:text-sm md:text-base"
                        >
                          <span>DISCOVER NOW</span>
                          <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 ml-1 sm:ml-2" />
                        </AnimatedButton>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}