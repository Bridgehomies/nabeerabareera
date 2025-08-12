import Image from "next/image"
import { ThreeDButton } from "@/components/ui-brutalist/threed-button"
import { ScrollingGrid } from "@/components/ui-brutalist/scrolling-grid"

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-20 relative">
      <ScrollingGrid />

      <div className="container mx-auto px-4 py-12 relative z-10">
        <h1 className="text-5xl font-bold mb-8 uppercase threed-text border-b-8 border-black pb-4">About Us</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div className="brutalist-container">
            <h2 className="text-3xl font-bold mb-6 uppercase">Our Story</h2>
            <p className="mb-4 uppercase">
              NabeeraBaeera was founded in 2020 with a vision to provide quality fashion at affordable prices.
            </p>
            <p className="mb-4 uppercase">
              Our focus on artificial jewelry, Coats, and kids clothing allows us to specialize and perfect our
              craft.
            </p>
            <p className="uppercase">
              We believe in bold designs, quality materials, and accessible fashion for everyone.
            </p>
          </div>
          <div className="brutalist-image relative h-[400px]">
            <Image src="/placeholder.svg?height=800&width=600" alt="Our store" fill className="object-cover" />
          </div>
        </div>

        <div className="brutalist-container bg-black text-white mb-16">
          <h2 className="text-3xl font-bold mb-6 uppercase threed-text-white">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-4 border-4 border-white">
              <h3 className="text-xl font-bold mb-2 uppercase">Quality</h3>
              <p className="uppercase">
                We ensure that every item we sell meets our high standards of quality and durability.
              </p>
            </div>
            <div className="p-4 border-4 border-white">
              <h3 className="text-xl font-bold mb-2 uppercase">Innovation</h3>
              <p className="uppercase">
                We constantly seek new designs and materials to keep our collections fresh and exciting.
              </p>
            </div>
            <div className="p-4 border-4 border-white">
              <h3 className="text-xl font-bold mb-2 uppercase">Accessibility</h3>
              <p className="uppercase">
                Fashion should be accessible to everyone, which is why we offer quality products at fair prices.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-6 uppercase threed-text">Join Our Community</h2>
          <p className="text-xl mb-8 uppercase max-w-3xl mx-auto">
            Be the first to know about new collections, exclusive offers, and more by joining our newsletter.
          </p>
          <ThreeDButton href="/contact">CONTACT US</ThreeDButton>
        </div>
      </div>
    </div>
  )
}
