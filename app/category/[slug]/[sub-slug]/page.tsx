import { notFound } from 'next/navigation';
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { CategoryProducts } from "@/components/CategoryProducts";

type SubCategoryPageProps = {
  params: {
    slug: string;
    subSlug: string;
  };
};

async function getCategoryData(slug: string, subSlug: string) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  if (!API_URL) {
    console.error("API URL is undefined");
    return null;
  }

  try {
    const res = await fetch(`${API_URL}/categories/${slug}/${subSlug}`, {
      cache: 'no-cache',
    });

    if (!res.ok) {
      console.warn(`Failed to fetch category data. Status: ${res.status}`);
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching category data:", error);
    return null;
  }
}

export default async function SubCategoryPage({ params }: SubCategoryPageProps) {
  const { slug, subSlug } = params;

  console.log("Params:", params); // Log the dynamic parameters

  const data = await getCategoryData(slug, subSlug);

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl font-bold">Oops! Page Not Found</h1>
        <p className="mt-4">The category or subcategory you're looking for does not exist.</p>
      </div>
    );
  }

  const { baseCategory, subCategory } = data;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[70vh] w-full overflow-hidden border-b-8 border-black">
        <div className="absolute inset-0 bg-black/10 z-10" />
        <Image
          src={subCategory.image || "/placeholder.jpg"}
          alt={subCategory.title}
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-20 container mx-auto h-full flex flex-col justify-center px-4 md:px-6">
          <div className="brutalist-container bg-white max-w-2xl">
            <div className="flex items-center text-black text-sm mb-2 uppercase font-bold">
              <Link href="/" className="hover:text-gray-700">
                Home
              </Link>
              <ChevronRight className="h-4 w-4 mx-1" />
              <Link href={`/category/${slug}`} className="hover:text-gray-700">
                {baseCategory.title}
              </Link>
              <ChevronRight className="h-4 w-4 mx-1" />
              <span>{subCategory.title}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-black mb-4 uppercase threed-text">
              {subCategory.title}
            </h1>
            <p className="text-xl text-black max-w-xl uppercase">{subCategory.description}</p>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <CategoryProducts initialCategory={`${slug}/${subSlug}`} />

      {/* CTA Section */}
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