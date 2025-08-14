"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { useState } from "react"
import { StarDoodle, ZigzagDoodle } from "./ui-brutalist/doodles"
import { AnimatedButton } from "./ui-brutalist/animated-button"

const categories = [
  { id: 1, name: "Artificial Jewelry", description: "Unique handcrafted pieces that make a statement", image: "https://images.unsplash.com/photo-1631560230221-faff391fd241?q=80&w=1470&auto=format&fit=crop", link: "/category/jewelry" },
  { id: 2, name: "Coats", description: "Premium coats for the modern gentleman", image: "https://images.unsplash.com/photo-1633655442168-c6ef0ed2f984?q=80&w=1476&auto=format&fit=crop", link: "/category/mens-coats" },
  { id: 3, name: "Kids Clothing", description: "Comfortable and stylish outfits for children", image: "https://images.unsplash.com/photo-1670014543406-a26719b352ca?q=80&w=1470&auto=format&fit=crop", link: "/category/kids-clothing" },
]

export function CategoryShowcase() {
  const [activeCategory, setActiveCategory] = useState(0)

  return (
    <section className="relative py-16 bg-gray-50 overflow-hidden">
      {/* Doodles */}
      <StarDoodle className="absolute top-8 right-8 w-16 h-16 text-primary opacity-15" />
      <ZigzagDoodle className="absolute bottom-8 left-8 w-16 h-16 text-accent opacity-15" />

      <div className="container mx-auto px-4 md:px-8">
        {/* Section Heading */}
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-semibold threed-text  text-center mb-16">
          Our Collections
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Navigation Cards */}
          <div className="flex flex-col gap-8">
            {categories.map((category, idx) => (
              <div
                key={category.id}
                className={`cursor-pointer p-6 md:p-8 rounded-2xl transition-all duration-500 shadow-md hover:shadow-xl ${
                  activeCategory === idx
                    ? "bg-white border-2 border-primary scale-105"
                    : "bg-white border border-gray-200"
                }`}
                onClick={() => setActiveCategory(idx)}
              >
                <h3 className="text-2xl md:text-3xl font-semibold mb-2">{category.name}</h3>
                <p className="text-gray-600 text-base md:text-lg mb-4">{category.description}</p>
                <div className="flex items-center gap-2 font-medium text-sm md:text-base">
                  <span>Browse Collection</span>
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                </div>
              </div>
            ))}
          </div>

          {/* Showcase Images */}
          <div className="mt-4 relative h-[350px] sm:h-[450px] md:h-[550px] rounded-3xl overflow-hidden shadow-xl">
            {categories.map((category, idx) => (
              <div
                key={category.id}
                className={`absolute inset-0 transition-opacity duration-700 ${
                  activeCategory === idx ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transform transition-transform duration-500 hover:scale-105 rounded-3xl"
                />
                {/* Overlay for text readability */}
                <div className="absolute inset-0 bg-black bg-opacity-20 rounded-3xl" />
                <div className="absolute bottom-8 left-8 z-20 p-4 md:p-6 bg-white bg-opacity-70 rounded-lg backdrop-blur-sm">
                  
                  <AnimatedButton
                    href={category.link}
                    variant="primary"
                    className="mt-3 flex items-center py-2 px-4 rounded text-sm md:text-base"
                  >
                    <span>DISCOVER NOW</span>
                    <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5" />
                  </AnimatedButton>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
