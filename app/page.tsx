import Link from "next/link"
import Image from "next/image"
import { ChevronRight, ArrowRight, Send } from "lucide-react"
import { FeaturedProducts } from "@/components/featured-products"
import { CategoryShowcase } from "@/components/category-showcase"
import { Newsletter } from "@/components/newsletter"
import { ScrollingText } from "@/components/ui-brutalist/scrolling-text"
import { ScrollingGrid } from "@/components/ui-brutalist/scrolling-grid"
import { MouseFollower } from "@/components/ui-brutalist/mouse-follower"
import { AnimatedButton } from "@/components/ui-brutalist/animated-button"
import { CircleDoodle, StarDoodle, ZigzagDoodle, DoodleBackground } from "@/components/ui-brutalist/doodles"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen relative pattern-bg">
      <DoodleBackground />
      <MouseFollower />

      {/* Hero Section */}
      <section className="relative h-[100vh] w-full overflow-hidden border-b-8 border-primary">
        <ScrollingGrid />
        <div className="absolute inset-0 bg-black/10 z-10" />
        <Image
          src="/bg.jpg?height=1080&width=1920"
          alt="NabeeraBaeera Fashion"
          fill
          className="object-cover opacity-70"
          priority
        />
        <div className="relative z-20 container mx-auto h-full flex items-center justify-between px-4 md:px-6">
          <div className="brutalist-container bg-white opacity-90 max-w-2xl ml-0 mr-auto mt-0 mb-0 md:ml-8">
            <StarDoodle className="absolute -top-10 -right-10 text-accent" />
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-black mb-4 leading-none threed-text">
              NABEERA BAREERA
            </h1>
            <p className="text-xl md:text-2xl text-black max-w-xl mb-8 uppercase font-bold">
              ARTIFICIAL JEWELRY. MEN'S COATS. KIDS CLOTHING.
            </p>
            <div className="hero-button-container flex flex-row space-x-4">
              <AnimatedButton href="/shop" animation="bounce">
                SHOP NOW
              </AnimatedButton>
              <AnimatedButton href="/collections" variant="outline" animation="bounce">
                EXPLORE
              </AnimatedButton>
            </div>
          </div>
          
        </div>
      </section>

      {/* Scrolling Ticker */}
      <ScrollingText
        messages={[
          "FREE SHIPPING ON ORDERS OVER $50",
          "NEW COLLECTION AVAILABLE NOW",
          "USE CODE 'BRUTAL' FOR 10% OFF",
          "LIMITED EDITION ITEMS AVAILABLE",
        ]}
      />

      {/* Featured Categories - Uneven Grid */}
      <section className="py-16 bg-white brutalist-section relative">
        <CircleDoodle className="absolute top-10 right-10 text-accent" />
        <ZigzagDoodle className="absolute bottom-10 left-10 text-primary" />

        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-5xl md:text-6xl font-bold text-center mb-12 uppercase threed-text">COLLECTIONS</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <BrutalistCategoryCard
                title="Artificial Jewelry"
                image="https://images.unsplash.com/photo-1564623788399-b75405a129a2?q=80&w=1337&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                link="/category/jewelry"
              />
            </div>
            <div>
              <BrutalistCategoryCard
                title="Men's Coats"
                image="https://images.unsplash.com/photo-1667283831517-5b747b3c17c8?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                link="/category/mens-coats"
              />
            </div>
            <div>
              <BrutalistCategoryCard
                title="Kids Clothing"
                image="https://images.unsplash.com/photo-1670014541811-9b0ec280ed60?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                link="/category/kids-clothing"
              />
            </div>
          </div>
        </div>
      </section>


      {/* Featured Products */}
      <FeaturedProducts />

      {/* Brutalist Banner */}
      <section className="bg-primary-dark text-white py-20 relative">
        <StarDoodle className="absolute top-10 left-10 text-white opacity-30" />
        <CircleDoodle className="absolute bottom-10 right-10 text-white opacity-30" />

        <div className="container mx-auto px-4 md:px-6">
          <div className="brutalist-grid h-[60vh] flex flex-col justify-center items-center text-center p-8">
            <h2 className="text-5xl md:text-7xl font-bold mb-6 uppercase threed-text-white">NEW SEASON ARRIVALS</h2>
            <p className="text-xl max-w-2xl mb-8 uppercase text-gray-600 font-semibold">
              DISCOVER OUR LATEST COLLECTIONS AND ELEVATE YOUR STYLE WITH NABEERABAEERA'S PREMIUM SELECTIONS
            </p>
            <AnimatedButton href="/new-arrivals" variant="accent" animation="pulse">
              VIEW NEW ARRIVALS
            </AnimatedButton>
          </div>
        </div>
      </section>

      {/* Category Showcase - Asymmetrical Layout */}
      <CategoryShowcase />

      {/* Newsletter - Updated to have flying plane icon instead of arrow */}
      <Newsletter />
    </div>
  )
}

function BrutalistCategoryCard({ title, image, link }: { title: string; image: string; link: string }) {
  return (
    <Link href={link} className="block transform-card">
      <div className="brutalist-card">
        <div className="brutalist-image relative h-[400px]">
          <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />
        </div>
        <div className="p-6 bg-primary text-white transition-transform duration-300 hover:bg-accent">
          <h3 className="text-2xl font-bold uppercase mb-2">{title}</h3>
          <div className="flex items-center text-white">
            <span className="uppercase font-bold">SHOP NOW</span>
            <ChevronRight className="h-4 w-4 ml-1" />
          </div>
        </div>
      </div>
    </Link>
  )
}

