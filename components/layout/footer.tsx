import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"
import { CircleDoodle, StarDoodle, ZigzagDoodle } from "@/components/ui-brutalist/doodles"

export function Footer() {
  return (
    <footer className="brutalist-footer relative">
      <StarDoodle className="absolute top-10 left-10 text-white opacity-30" />
      <CircleDoodle className="absolute top-20 right-20 text-white opacity-30" />
      <ZigzagDoodle className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white opacity-30" />

      <div className="container mx-auto px-4 md:px-6 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">About NabeeraBaeera</h3>
            <p className="text-sm leading-relaxed mb-4">
              NabeeraBaeera offers premium artificial jewelry, stylish Coats, and adorable kids clothing. Our
              mission is to provide high-quality fashion at affordable prices.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-white border-2 border-white p-2 hover:bg-white hover:text-primary">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-white border-2 border-white p-2 hover:bg-white hover:text-primary">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-white border-2 border-white p-2 hover:bg-white hover:text-primary">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4 uppercase">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/category/jewelry" className="uppercase hover:text-accent transition-colors">
                  Artificial Jewelry
                </Link>
              </li>
              <li>
                <Link href="/category/mens-coats" className="uppercase hover:text-accent transition-colors">
                  Coats
                </Link>
              </li>
              <li>
                <Link href="/category/kids-clothing" className="uppercase hover:text-accent transition-colors">
                  Kids Clothing
                </Link>
              </li>
              <li>
                <Link href="/new-arrivals" className="uppercase hover:text-accent transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="/sale" className="uppercase hover:text-accent transition-colors">
                  Sale
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/contact" className="hover:text-accent transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-accent transition-colors">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-accent transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/size-guide" className="hover:text-accent transition-colors">
                  Size Guide
                </Link>
              </li>
              <li>
                <Link href="/track-order" className="hover:text-accent transition-colors">
                  Track Your Order
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/terms" className="hover:text-accent transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-accent transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="hover:text-accent transition-colors">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="/accessibility" className="hover:text-accent transition-colors">
                  Accessibility
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t-4 border-white mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm mb-4 md:mb-0 uppercase">
            &copy; {new Date().getFullYear()} NabeeraBaeera. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-4 text-sm">
            <img src="/placeholder.svg?height=30&width=50" alt="Visa" className="h-8 border-2 border-white" />
            <img src="/placeholder.svg?height=30&width=50" alt="Mastercard" className="h-8 border-2 border-white" />
            <img src="/placeholder.svg?height=30&width=50" alt="PayPal" className="h-8 border-2 border-white" />
            <img src="/placeholder.svg?height=30&width=50" alt="Apple Pay" className="h-8 border-2 border-white" />
          </div>
        </div>
      </div>
    </footer>
  )
}
