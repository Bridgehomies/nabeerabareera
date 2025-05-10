import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { FeaturedProducts } from "@/components/featured-products"

// Sample category data
const categories = {
  jewelry: {
    title: "Artificial Jewelry",
    description: "Discover our stunning collection of artificial jewelry that adds elegance to any outfit.",
    image: "/placeholder.svg?height=800&width=1200",
  },
  "mens-coats": {
    title: "Men's Coats",
    description: "Stay stylish and warm with our premium selection of men's coats for every season.",
    image: "/placeholder.svg?height=800&width=1200",
  },
  "kids-clothing": {
    title: "Kids Clothing",
    description: "Adorable and comfortable clothing for kids that combines style with durability.",
    image: "/placeholder.svg?height=800&width=1200",
  },
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const slug = params.slug
  const category = categories[slug as keyof typeof categories] || {
    title: "Category",
    description: "Browse our collection",
    image: "/placeholder.svg?height=800&width=1200",
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Category Hero */}
      <section className="relative h-[50vh] w-full overflow-hidden border-b-8 border-black">
        <div className="absolute inset-0 bg-black/10 z-10" />
        <Image src={category.image || "/placeholder.svg"} alt={category.title} fill className="object-cover" priority />
        <div className="relative z-20 container mx-auto h-full flex flex-col justify-center px-4 md:px-6">
          <div className="brutalist-container bg-white max-w-2xl">
            <div className="flex items-center text-black text-sm mb-2 uppercase font-bold">
              <Link href="/" className="hover:text-gray-700">
                Home
              </Link>
              <ChevronRight className="h-4 w-4 mx-1" />
              <span>{category.title}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-black mb-4 uppercase">{category.title}</h1>
            <p className="text-xl text-black max-w-xl uppercase">{category.description}</p>
          </div>
        </div>
      </section>

      {/* Products */}
      <FeaturedProducts />

      {/* Call to Action */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6 text-center brutalist-container">
          <h2 className="text-3xl font-bold mb-4 uppercase">Can't find what you're looking for?</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto uppercase">
            Our collection is constantly updating. Contact our customer service team for assistance.
          </p>
          <button className="brutalist-btn">CONTACT US</button>
        </div>
      </section>
    </div>
  )
}
