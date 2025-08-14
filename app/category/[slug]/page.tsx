"use client";
import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { CategoryProducts } from "@/components/CategoryProducts";

const categories = {
  all: { 
    title: "All Products", 
    description: "Browse our entire collection.", 
    image: "/placeholder.svg?height=800&width=1200" 
  },
  jewelry: { 
    title: "Artificial Jewelry", 
    description: "Discover our stunning collection.", 
    image: "/jewel.jpeg" 
  },
  "mens-coats": { 
    title: "Coats", 
    description: "Stay stylish and warm.", 
    image: "/coats temp.jpg" 
  },
  "kids-clothing": { 
    title: "Kids Clothing", 
    description: "Adorable and comfortable clothing.", 
    image: "/kids temp.jpg" 
  },
} as const;

type CategoryKey = keyof typeof categories;

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  
  // Ensure slug is a valid category key
  const isValidCategory = (slug: string): slug is CategoryKey => {
    return slug in categories;
  };

  const category = isValidCategory(slug) 
    ? categories[slug]
    : {
        title: "Not Found",
        description: "This category does not exist.",
        image: "/placeholder.svg?height=800&width=1200",
      };

  if (!isValidCategory(slug)) {
    return (
      <div className="container mx-auto py-16 text-center">
        <h1 className="text-3xl font-bold">Category Not Found</h1>
        <p className="mt-4">
          <Link href="/category" className="text-blue-600 hover:underline">
            View All Products
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* banner */}
      <section className="relative h-[70vh] w-full overflow-hidden border-b-8 border-black">
        <div className="absolute inset-0 bg-black/10 z-10" />
        <Image
          src={category.image}
          alt={category.title}
          fill
          className="object-cover"
          style={{ objectPosition: "10% 20%" }}
          priority
          onError={(e) => {
            // Fallback image if the main image fails to load
            e.currentTarget.src = "/placeholder.svg?height=800&width=1200";
          }}
        />
        <div className="relative z-20 container mx-auto h-full flex flex-col justify-center mt-2 px-4 md:px-6">
          <div className="brutalist-container bg-white max-w-2xl">
            <div className="flex items-center text-black text-sm mb-2 uppercase font-bold">
              <Link href="/" className="hover:text-gray-700">Home</Link>
              <ChevronRight className="h-4 w-4 mx-1" />
              <span>{category.title}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-black mb-4 uppercase threed-text">
              {category.title}
            </h1>
            <p className="text-xl text-black max-w-xl uppercase">{category.description}</p>
          </div>
        </div>
      </section>

      {/* products */}
      <CategoryProducts initialCategory={slug} />

      {/* contact */}
      <section className="py-16 bg-white flex items-center justify-center">
        <div className="container mx-auto px-4 md:px-6 text-center brutalist-container">
          <h2 className="text-3xl font-bold mb-4 uppercase">Can't find what you're looking for?</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto uppercase">
            Our collection is constantly updating. Contact our customer service team for assistance.
          </p>
          <button className="brutalist-btn">CONTACT US</button>
        </div>
      </section>
    </div>
  );
}