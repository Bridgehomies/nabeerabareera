"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import dynamic from "next/dynamic"
import { ChevronRight } from "lucide-react"

// Lazy-load heavy components to avoid blocking initial render
const MouseFollower = dynamic(() => import("@/components/ui-brutalist/mouse-follower").then(mod => ({ default: mod.MouseFollower })), {
  ssr: false,
  loading: () => null
})

const ScrollingText = dynamic(() => import("@/components/ui-brutalist/scrolling-text").then(mod => ({ default: mod.ScrollingText })), {
  ssr: false,
  loading: () => <div className="h-8 bg-gray-200 animate-pulse"></div>
})


const FeaturedProducts = dynamic(() =>
  import('@/components/featured-products').then(mod => mod.FeaturedProducts), // ✅ Use named export
  { ssr: false, loading: () => <div>Loading featured products...</div> }
)


const CategoryShowcase = dynamic(() =>
  import('@/components/category-showcase').then(mod => mod.CategoryShowcase),
  { ssr: false, loading: () => <div>Loading category showcase...</div> }
)

const Newsletter = dynamic(() =>
  import('@/components/newsletter').then(mod => mod.Newsletter),
  { ssr: false, loading: () => <div>Loading newsletter signup...</div> }
)




// Doodles and UI Components (make sure these exist in your project)
const ScrollingGrid = dynamic(() => import("@/components/ui-brutalist/scrolling-grid").then(mod => ({ default: mod.ScrollingGrid })), {
  ssr: false,
  loading: () => null
})

const AnimatedButton = dynamic(() => import("@/components/ui-brutalist/animated-button").then(mod => ({ default: mod.AnimatedButton })), {
  ssr: false
})

const StarDoodle = dynamic(() => import("@/components/ui-brutalist/doodles").then(mod => ({ default: mod.StarDoodle })), {
  ssr: false
})

const CircleDoodle = dynamic(() => import("@/components/ui-brutalist/doodles").then(mod => ({ default: mod.CircleDoodle })), {
  ssr: false
})

const ZigzagDoodle = dynamic(() => import("@/components/ui-brutalist/doodles").then(mod => ({ default: mod.ZigzagDoodle })), {
  ssr: false
})

const DoodleBackground = dynamic(() => import("@/components/ui-brutalist/doodles").then(mod => ({ default: mod.DoodleBackground })), {
  ssr: false
})

// Background images
const backgroundImages = [
  "/bg.jpg?height=1080&width=1920",
  "/1.png",
  "/2.png",
]

export default function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Change image every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) =>
        prev === backgroundImages.length - 1 ? 0 : prev + 1
      )
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col min-h-screen relative pattern-bg">
      <DoodleBackground />
      <MouseFollower />

      {/* Hero Section */}
      <section className="relative h-[80vh] sm:h-[90vh] md:h-[100vh] w-full overflow-hidden border-b-4 sm:border-b-6 md:border-b-8 border-primary">
        <ScrollingGrid />
        <div className="absolute inset-0 bg-black/10 z-10" />
        <Image
          src={backgroundImages[currentImageIndex]}
          alt="NabeeraBaeera Fashion"
          fill
          className="object-cover opacity-70 transition-opacity duration-1000"
          priority={currentImageIndex === 0}
        />
        <div className="relative z-20 container mx-auto h-full flex items-center justify-between px-4 sm:px-6 md:px-8">
          <div className="brutalist-container bg-white opacity-90 max-w-xs sm:max-w-md md:max-w-2xl ml-0 mr-auto sm:ml-4 md:ml-8">
            <StarDoodle className="absolute -top-6 sm:-top-8 md:-top-10 -right-6 sm:-right-8 md:-right-10 text-accent w-12 sm:w-16 md:w-20" />
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl xl:text-9xl font-bold text-black mb-2 sm:mb-4 leading-none threed-text">
              NABEERA BAREERA
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-black max-w-xs sm:max-w-sm md:max-w-xl mb-4 sm:mb-6 md:mb-8 uppercase font-bold">
              ARTIFICIAL JEWELRY. COATS. KIDS CLOTHING.
            </p>
            <div className="hero-button-container flex flex-row space-x-2 sm:space-x-4">
              <AnimatedButton href="/product" animation="bounce" className="text-xs sm:text-sm md:text-base py-2 sm:py-3 px-3 sm:px-4">
                SHOP NOW
              </AnimatedButton>
              <AnimatedButton href="#collections" variant="outline" animation="bounce" className="text-xs sm:text-sm md:text-base py-2 sm:py-3 px-3 sm:px-4">
                EXPLORE
              </AnimatedButton>
            </div>
          </div>
        </div>
      </section>

      {/* Scrolling Ticker */}
      <ScrollingText
        messages={[
          "FREE SHIPPING ON ORDERS OVER PKR 3000",
          "NEW COLLECTION AVAILABLE NOW",
          "USE CODE 'NEWIN' FOR 10% OFF",
          "LIMITED EDITION ITEMS",
        ]}
      />

      {/* Featured Categories */}
      <section id="collections" className="py-8 sm:py-12 md:py-16 bg-white brutalist-section relative">
        <CircleDoodle className="absolute top-4 sm:top-6 md:top-10 right-4 sm:right-6 md:right-10 text-accent w-12 sm:w-16 md:w-20" />
        <ZigzagDoodle className="absolute bottom-4 sm:bottom-6 md:bottom-10 left-4 sm:left-6 md:left-10 text-primary w-12 sm:w-16 md:w-20" />

        <div className="container mx-auto px-4 sm:px-6 md:px-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-6 sm:mb-8 md:mb-12 uppercase threed-text">
            COLLECTIONS
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            <BrutalistCategoryCard
              title="Artificial Jewelry"
              image="https://images.unsplash.com/photo-1564623788399-b75405a129a2?q=80&w=1337&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              link="/category/jewelry"
            />
            <BrutalistCategoryCard
              title="Coats"
              image="https://images.unsplash.com/photo-1667283831517-5b747b3c17c8?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              link="/category/mens-coats"
            />
            <BrutalistCategoryCard
              title="Kids Clothing"
              image="https://images.unsplash.com/photo-1670014541811-9b0ec280ed60?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              link="/category/kids-clothing"
            />
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <FeaturedProducts />

      {/* Brutalist Banner */}
      <section className="bg-primary-dark text-white py-10 sm:py-14 md:py-20 relative">
        <StarDoodle className="absolute top-4 sm:top-6 md:top-10 left-4 sm:left-6 md:left-10 text-white opacity-30 w-12 sm:w-16 md:w-20" />
        <CircleDoodle className="absolute bottom-4 sm:bottom-6 md:bottom-10 right-4 sm:right-6 md:right-10 text-white opacity-30 w-12 sm:w-16 md:w-20" />

        <div className="container mx-auto px-4 sm:px-6 md:px-8">
          <div className="brutalist-grid h-[50vh] sm:h-[55vh] md:h-[60vh] flex flex-col justify-center items-center text-center p-4 sm:p-6 md:p-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6 uppercase threed-text-white">
              NEW SEASON ARRIVALS
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl max-w-xs sm:max-w-md md:max-w-2xl mb-4 sm:mb-6 md:mb-8 uppercase text-gray-600 font-semibold">
              DISCOVER OUR LATEST COLLECTIONS AND ELEVATE YOUR STYLE WITH NABEERABAEERA'S PREMIUM SELECTIONS
            </p>
            <AnimatedButton href="/new-arrivals" variant="accent" animation="pulse" className="text-xs sm:text-sm md:text-base py-2 sm:py-3 px-3 sm:px-4">
              VIEW NEW ARRIVALS
            </AnimatedButton>
          </div>
        </div>
      </section>

      {/* Lazy Loaded Sections */}
      <CategoryShowcase />
      <Newsletter />
    </div>
  )
}

// Brutalist Category Card Component
function BrutalistCategoryCard({ title, image, link }: { title: string; image: string; link: string }) {
  return (
    <Link href={link} className="block transform-card">
      <div className="brutalist-card">
        <div className="brutalist-image relative h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px]">
          <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />
        </div>
        <div className="p-4 sm:p-5 md:p-6 bg-primary text-white transition-transform duration-300 hover:bg-accent">
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold uppercase mb-1 sm:mb-2">{title}</h3>
          <div className="flex items-center text-white">
            <span className="uppercase font-bold text-xs sm:text-sm md:text-base">SHOP NOW</span>
            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 ml-1" />
          </div>
        </div>
      </div>
    </Link>
  )
}