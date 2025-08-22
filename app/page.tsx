"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import dynamic from "next/dynamic"
import { ChevronRight } from "lucide-react"

// Lazy-load heavy components to avoid blocking initial render
const MouseFollower = dynamic(
  () => import("@/components/ui-brutalist/mouse-follower").then(mod => ({ default: mod.MouseFollower })),
  { ssr: false, loading: () => null }
)

const ScrollingText = dynamic(
  () => import("@/components/ui-brutalist/scrolling-text").then(mod => ({ default: mod.ScrollingText })),
  { ssr: false, loading: () => <div className="h-8 bg-gray-200 animate-pulse" aria-hidden /> }
)

const FeaturedProducts = dynamic(() =>
  import('@/components/featured-products').then(mod => mod.FeaturedProducts),
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
  ssr: false,
  loading: () => <button className="btn-placeholder h-10 w-24 rounded bg-gray-200 animate-pulse" aria-hidden />
})

const StarDoodle = dynamic(() => import("@/components/ui-brutalist/doodles").then(mod => ({ default: mod.StarDoodle })), { ssr: false })
const CircleDoodle = dynamic(() => import("@/components/ui-brutalist/doodles").then(mod => ({ default: mod.CircleDoodle })), { ssr: false })
const ZigzagDoodle = dynamic(() => import("@/components/ui-brutalist/doodles").then(mod => ({ default: mod.ZigzagDoodle })), { ssr: false })
const DoodleBackground = dynamic(() => import("@/components/ui-brutalist/doodles").then(mod => ({ default: mod.DoodleBackground })), { ssr: false })

// Background images (prefer local assets for hero backgrounds when possible)
const backgroundImages = [
  "/bg.jpg", // use high-res local assets for hero where possible
  "/1.png",
  "/2.png",
]

export default function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Change image every 10 seconds (cleanup included)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prev => (prev === backgroundImages.length - 1 ? 0 : prev + 1))
    }, 10000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col min-h-screen relative pattern-bg">
      <DoodleBackground />
      <MouseFollower />

      {/* HERO */}
      <section
        aria-label="Hero - Nabeera Bareera"
        className="relative h-[95vh] w-full flex items-center overflow-hidden bg-black"
      >
        {/* Background Image */}
        <Image
          src="/bg.jpg" // use single high-res image
          alt="Nabeera Bareera Collection"
          fill
          priority
          className="object-cover opacity-80"
          sizes="100vw"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20" />

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 md:px-8 flex flex-col items-center text-center space-y-6">
          {/* Offer / Highlight */}
          <span className="bg-accent text-white text-xs sm:text-sm font-bold px-4 py-1 rounded-full uppercase tracking-wide">
            Free Shipping on Orders Over PKR 3000
          </span>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white max-w-3xl leading-tight">
            Fashion That Fits Every Moment
          </h1>

          {/* Subheading */}
          <p className="text-gray-200 text-base sm:text-lg max-w-xl">
            Handpicked jewelry, cozy winter coats, and playful kids' collections — all crafted to make you shine.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/category/new-arrivals">
              <button 
                className="bg-accent hover:bg-accent/90 text-white font-semibold py-3 px-6 rounded-md transition-all"
                aria-label="Shop new arrivals"
              >
                Shop Now
              </button>
            </Link>
            <Link href="#collections">
              <button 
                className="border border-white text-white hover:bg-white hover:text-black font-semibold py-3 px-6 rounded-md transition-all"
                aria-label="View collections"
              >
                View Collections
              </button>
            </Link>
          </div>

          {/* Quick Categories */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 pt-4">
            <Link href="/category/jewelry">
              <span className="bg-white/90 hover:bg-white text-black px-4 py-2 rounded-md font-medium shadow-sm transition-all">
                Jewelry
              </span>
            </Link>
            <Link href="/category/winter-coats">
              <span className="bg-white/90 hover:bg-white text-black px-4 py-2 rounded-md font-medium shadow-sm transition-all">
                Winter Coats
              </span>
            </Link>
            <Link href="/category/kids">
              <span className="bg-white/90 hover:bg-white text-black px-4 py-2 rounded-md font-medium shadow-sm transition-all">
                Kids Collection
              </span>
            </Link>
            <Link href="/category/new-arrivals">
              <span className="bg-white/90 hover:bg-white text-black px-4 py-2 rounded-md font-medium shadow-sm transition-all">
                New Arrivals
              </span>
            </Link>
          </div>
        </div>
      </section>


      {/* Scrolling Ticker — accessible */}
      <ScrollingText
        aria-label="Site promotions"
        messages={[
          "FREE SHIPPING ON ORDERS OVER PKR 3000",
          "NEW COLLECTION AVAILABLE NOW",
          "USE CODE 'NEWIN' FOR 10% OFF",
          "LIMITED EDITION ITEMS",
        ]}
      />

      {/* Featured Collections */}
      <section
        id="collections"
        className="py-8 sm:py-12 md:py-16 bg-white relative"
      >
        <CircleDoodle className="absolute top-4 sm:top-6 md:top-10 right-4 sm:right-6 md:right-10 text-accent w-12 sm:w-16 md:w-20 opacity-30" />
        <ZigzagDoodle className="absolute bottom-4 sm:bottom-6 md:bottom-10 left-4 sm:left-6 md:left-10 text-primary w-12 sm:w-16 md:w-20 opacity-30" />

        <div className="container mx-auto px-4 sm:px-6 md:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold uppercase">
              Shop by Collection
            </h2>
            <p className="mt-2 text-sm sm:text-base text-gray-600 max-w-xl mx-auto">
              Curated picks for every style and season — choose your vibe and start exploring.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                title: "Artificial Jewelry",
                image:
                  "https://images.unsplash.com/photo-1564623788399-b75405a129a2?q=80&w=1337&auto=format&fit=crop&ixlib=rb-4.1.0",
                link: "/category/jewelry",
              },
              {
                title: "Coats",
                image:
                  "https://images.unsplash.com/photo-1667283831517-5b747b3c17c8?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0",
                link: "/category/mens-coats",
              },
              {
                title: "Kids Clothing",
                image:
                  "https://images.unsplash.com/photo-1670014541811-9b0ec280ed60?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0",
                link: "/category/kids-clothing",
              },
            ].map((cat) => (
              <Link
                key={cat.title}
                href={cat.link}
                className="group relative block overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Image
                  src={cat.image}
                  alt={cat.title}
                  width={600}
                  height={600}
                  className="w-full h-[300px] object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="text-lg sm:text-xl font-bold">{cat.title}</h3>
                  <span className="mt-1 inline-block text-xs uppercase tracking-wide bg-white/20 px-2 py-1 rounded-full">
                    Shop Now →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>


      {/* Featured products */}
      <FeaturedProducts />

      {/* Promo / New arrivals */}
      <section className="bg-primary-dark text-white py-10 sm:py-14 md:py-20 relative">
        <StarDoodle className="absolute top-4 left-4 text-white opacity-30 w-12 sm:w-16 md:w-20" />
        <CircleDoodle className="absolute bottom-4 right-4 text-white opacity-30 w-12 sm:w-16 md:w-20" />

        <div className="container mx-auto px-4 sm:px-6 md:px-8">
          <div className="brutalist-grid h-[50vh] sm:h-[55vh] md:h-[60vh] flex flex-col justify-center items-center text-center p-4 sm:p-6 md:p-8 rounded-md">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 uppercase text-black">
              New Season Arrivals
            </h2>
            <p className="text-sm sm:text-base md:text-lg max-w-xs sm:max-w-md md:max-w-2xl mb-4 sm:mb-6 md:mb-8 uppercase text-gray-500 font-medium">
              Discover the latest drops — refined, handpicked pieces.
            </p>
            <Link href="/new-arrivals">
              <AnimatedButton variant="accent" animation="pulse" className="text-sm py-2 px-4">
                View New Arrivals
              </AnimatedButton>
            </Link>
          </div>
        </div>
      </section>

      {/* Lazy Loaded Sections */}
      <CategoryShowcase />
      <Newsletter />
    </div>
  )
}

/* BrutalistCategoryCard component — improved accessibility and stable Image handling.
   - For external images, Next/Image requires domain config; unoptimized={true} avoids build errors
     in dev environments but you should add the domains to next.config.js in production.
*/
function BrutalistCategoryCard({ title, image, link }: { title: string; image: string; link: string }) {
  return (
    <Link href={link} className="block transform-card focus:outline-none focus:ring-2 focus:ring-primary" aria-label={`Open ${title} collection`}>
      <div className="brutalist-card overflow-hidden rounded-md shadow-sm">
        <div className="brutalist-image relative h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px]">
          {/* Using unoptimized for external images — replace by adding image domain(s) to next.config.js for production */}
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 transform hover:scale-105"
            unoptimized
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>

        <div className="p-4 sm:p-5 md:p-6 bg-primary text-white transition-colors duration-300 hover:bg-accent">
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold uppercase mb-1 sm:mb-2">{title}</h3>
          <div className="flex items-center text-white">
            <span className="uppercase font-bold text-xs sm:text-sm md:text-base">SHOP NOW</span>
            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 ml-2" />
          </div>
        </div>
      </div>
    </Link>
  )
}