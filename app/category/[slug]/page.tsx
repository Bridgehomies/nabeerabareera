import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { CategoryProducts } from "@/components/CategoryProducts";
import ClientImage from "@/components/ui/ClientImage";

const categories = {
  all: {
    title: "All Products",
    description: "Browse our entire collection.",
    image: "/placeholder.svg?height=800&width=1200",
  },
  jewelry: {
    title: "Artificial Jewelry",
    description: "Discover our stunning collection.",
    image: "/jewel.jpeg",
  },
  coats: {
    title: "Coats",
    description: "Stay stylish and warm.",
    image: "/coats temp.jpg",
  },
  kids: {
    title: "Kids Clothing",
    description: "Adorable and comfortable clothing.",
    image: "/kids temp.jpg",
  },
} as const;

type CategoryKey = keyof typeof categories;

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  const slugMap: Record<string, CategoryKey> = {
    jewelry: "jewelry",
    "mens-coats": "coats",
    "kids-clothing": "kids",
    all: "all",
  };

  const categoryKey = slugMap[slug];
  const categoryData = categoryKey ? categories[categoryKey] : null;

  if (!categoryData) {
    return (
      <div className="container mx-auto py-16 text-center">
        <h1 className="text-3xl font-bold">Category Not Found</h1>
        <p className="mt-4">
          <Link href="/" className="text-blue-600 hover:underline">
            Go to Home
          </Link>
        </p>
      </div>
    );
  }

  const initialCategoryParam = categoryKey === 'all' ? null : categoryKey;
  const initialProducts = await fetchProducts(initialCategoryParam);

  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative h-[70vh] w-full overflow-hidden border-b-8 border-black">
        <div className="absolute inset-0 bg-black/10 z-10" />
        <ClientImage
          src={categoryData.image}
          alt={categoryData.title}
          className="object-cover"
          style={{ objectPosition: "10% 20%" }}
          priority
        />
        <div className="relative z-20 container mx-auto h-full flex flex-col justify-center mt-2 px-4 md:px-6">
          <div className="brutalist-container bg-white max-w-2xl">
            <div className="flex items-center text-black text-sm mb-2 uppercase font-bold">
              <Link href="/" className="hover:text-gray-700">
                Home
              </Link>
              <ChevronRight className="h-4 w-4 mx-1" />
              <span>{categoryData.title}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-black mb-4 uppercase threed-text">
              {categoryData.title}
            </h1>
            <p className="text-xl text-black max-w-xl uppercase">
              {categoryData.description}
            </p>
          </div>
        </div>
      </section>

      <CategoryProducts
        initialProducts={initialProducts}
        initialCategory={categoryKey}
      />

      <section className="py-16 bg-white flex items-center justify-center">
        <div className="container mx-auto px-4 md:px-6 text-center brutalist-container">
          <h2 className="text-3xl font-bold mb-4 uppercase">
            Can't find what you're looking for?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto uppercase">
            Our collection is constantly updating. Contact our customer service team for assistance.
          </p>
          <button className="brutalist-btn">CONTACT US</button>
        </div>
      </section>
    </div>
  );
}

async function fetchProducts(category: string | null = null) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  const url = category ? `${apiUrl}/products/?category=${category}` : `${apiUrl}/products/`;
  const res = await fetch(url, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error("Failed to fetch products");
  const data = await res.json();
  return data;
}