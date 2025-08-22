import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";
import { CircleDoodle, StarDoodle, ZigzagDoodle } from "@/components/ui-brutalist/doodles";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Footer() {
  const businessSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Nabeera & Bareera",
    url: "https://nabeerabareera.com",
    logo: "https://nabeerabareera.com/logo.png", // change to actual logo URL
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+92-300-1234567",
      contactType: "Customer Service",
      areaServed: "PK",
      availableLanguage: "English"
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Lahore, Pakistan",
      addressLocality: "Lahore",
      addressCountry: "PK"
    },
    sameAs: [
      "https://facebook.com/yourpage",
      "https://instagram.com/yourpage",
      "https://twitter.com/yourpage"
    ],
    paymentAccepted: ["Visa", "MasterCard", "PayPal", "Apple Pay"],
    priceRange: "$$"
  };

  return (
    <footer className="brutalist-footer relative bg-primary text-white">
      <StarDoodle className="absolute top-10 left-10 opacity-20" />
      <CircleDoodle className="absolute top-20 right-20 opacity-20" />
      <ZigzagDoodle className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-20" />

      <div className="container mx-auto px-4 md:px-6 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* About */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold mb-4">About Nabeera & Bareera</h3>
            <p className="text-sm leading-relaxed mb-4">
              Premium artificial jewelry, stylish coats, and adorable kidswear. High-quality fashion at
              affordable prices — delivered to your door.
            </p>
            <div className="flex space-x-3">
              <Link href="https://www.facebook.com/share/1CN5FMW4mQ/" aria-label="Facebook" target="_blank" rel="noopener noreferrer" className="p-2 border border-white hover:bg-white hover:text-primary">
                <Facebook size={18} />
              </Link>
              <Link href="https://www.instagram.com/nabeera_bareera/" aria-label="Instagram" target="_blank" rel="noopener noreferrer" className="p-2 border border-white hover:bg-white hover:text-primary">
                <Instagram size={18} />
              </Link>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/category/jewelry" className="hover:text-accent">Artificial Jewelry</Link></li>
              <li><Link href="/category/mens-coats" className="hover:text-accent">Coats</Link></li>
              <li><Link href="/category/kids-clothing" className="hover:text-accent">Kids Clothing</Link></li>
              <li><Link href="/new-arrivals" className="hover:text-accent">New Arrivals</Link></li>
              <li><Link href="/sale" className="hover:text-accent">Sale</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/contact" className="hover:text-accent">Contact Us</Link></li>
              <li><Link href="/faq/shipping" className="hover:text-accent">Shipping & Returns</Link></li>
              <li><Link href="/faq" className="hover:text-accent">FAQ</Link></li>
              <li><Link href="/size" className="hover:text-accent">Size Guide</Link></li>
              <li><Link href="/track" className="hover:text-accent">Track Order</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2"><Phone size={16} /> +92 342 9263395</li>
              <li className="flex items-center gap-2"><Mail size={16} /> support@nabeerabareera.com</li>
              <li className="flex items-start gap-2"><MapPin size={16} /> Lahore, Pakistan</li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-12 border-t border-white/30 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm font-medium">Get updates on new arrivals and offers</p>
          <div className="flex w-full md:w-auto gap-2">
            <Input type="email" placeholder="Enter your email" className="bg-white text-black" />
            <Button variant="outline" className="text-black">Subscribe</Button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 border-t border-white/30 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs">&copy; {new Date().getFullYear()} Nabeera & Bareera. All rights reserved.</p>
          <div className="flex flex-wrap gap-3">
            <Image src="/payments/visa.png" alt="Visa" width={50} height={30} />
            <Image src="/payments/master.png" alt="Mastercard" width={50} height={30} />
          </div>
        </div>
      </div>

      {/* Structured Data */}
      <Script
        id="business-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
      />
    </footer>
  );
}