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
    name: "Men's Coats",
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
    <section className="py-16 bg-white relative overflow-hidden">
      <StarDoodle className="absolute top-20 right-20 text-primary-dark" />
      <ZigzagDoodle className="absolute bottom-6 left-20 text-accent-dark" />
      
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 uppercase threed-text">Explore Categories</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Category Navigation */}
          <div className="space-y-8">
            {categories.map((category, index) => (
              <div 
                key={category.id}
                className={`brutalist-nav-item cursor-pointer p-6 transition-all duration-300 ${
                  activeCategory === index 
                    ? "bg-primary text-white" 
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
                onClick={() => setActiveCategory(index)}
              >
                <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                <p className="mb-4">{category.description}</p>
                <div className="flex items-center">
                  <span className="mr-2 font-bold uppercase">Browse Collection</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            ))}
          </div>
          
          {/* Category Image */}
          <div className="relative ">
          {categories.map((category, index) => (
            <div 
              key={category.id} 
              className={`brutalist-showcase absolute inset-0 transition-all duration-500  ${
                activeCategory === index ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              {/* ↙️ make sure this wrapper is position:relative AND has a height! */}
              <div className="relative h-[500px] overflow-hidden brutalist-image-border">
                {/* 1) the image container */}
                <Image 
                  src={category.image.replace(/\?.*$/, "")}    // strip the query if it's breaking your build
                  alt={category.name} 
                  fill 
                  className="object-cover"
                />

                {/* 2) dark overlay, above the image */}
                <div className="absolute inset-0 bg-black bg-opacity-20 z-10" />

                {/* 3) content overlay, above the dark tint */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-white bg-opacity-50 z-20">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <h3 className="text-2xl font-bold m-0">{category.name}</h3>
                    <AnimatedButton
                      href={category.link}
                      variant="primary"
                      className="flex items-center py-2 px-4 h-auto"
                    >
                      <span>DISCOVER NOW</span> <ArrowRight className="h-4 w-4 ml-2" />
                    </AnimatedButton>
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