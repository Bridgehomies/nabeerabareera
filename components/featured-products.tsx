"use client";

import { useState, useEffect } from "react";
import ProductCard, { Product } from "./ProductCard";
import { CircleDoodle, StarDoodle } from "@/components/ui-brutalist/doodles";
import { AnimatedButton } from "@/components/ui-brutalist/animated-button";

export function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  // Fetch products
  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`);
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();

        const processed: Product[] = data.map((p: any) => {
          const isNew = new Date().getTime() - new Date(p.dateAdded).getTime() < 1000 * 60 * 60 * 24 * 14;
          const isSale = typeof p.salePrice === "number" && p.salePrice < p.price;
          const discount = isSale ? Math.round(((p.price - p.salePrice) / p.price) * 100) : undefined;
          return { ...p, isNew, isSale, discount };
        });

        // Sort by most reviewed
        setProducts(processed.sort((a, b) => b.reviews - a.reviews));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  const filteredProducts = products.filter((p) => {
    let match = true;
    if (selectedSize && p.sizes) match = match && p.sizes.includes(selectedSize);
    if (selectedColor && p.colors) match = match && p.colors.includes(selectedColor);
    return match;
  });

  if (loading) {
    return (
      <section className="py-20 bg-white brutalist-section">
        <div className="container mx-auto flex justify-center items-center h-64">
          <p className="text-lg font-medium">Loading products...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white brutalist-section relative overflow-hidden">
      {/* Doodles */}
      <CircleDoodle className="absolute top-10 left-10 text-accent opacity-30" />
      <StarDoodle className="absolute bottom-10 right-10 text-primary opacity-30" />

      <div className="container mx-auto px-4 md:px-6">
        {/* Header + Filters */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-12">
          <h2 className="text-5xl md:text-6xl font-bold uppercase threed-text mb-4 md:mb-0">
            Featured Products
          </h2>
          <div className="flex flex-wrap gap-2">
            <FilterPill
              label="S"
              selected={selectedSize === "S"}
              onClick={() => setSelectedSize(selectedSize === "S" ? null : "S")}
            />
            <FilterPill
              label="M"
              selected={selectedSize === "M"}
              onClick={() => setSelectedSize(selectedSize === "M" ? null : "M")}
            />
            <FilterPill
              label="L"
              selected={selectedSize === "L"}
              onClick={() => setSelectedSize(selectedSize === "L" ? null : "L")}
            />
            <FilterPill
              label="Red"
              selected={selectedColor === "Red"}
              onClick={() => setSelectedColor(selectedColor === "Red" ? null : "Red")}
            />
            <FilterPill
              label="Blue"
              selected={selectedColor === "Blue"}
              onClick={() => setSelectedColor(selectedColor === "Blue" ? null : "Blue")}
            />
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-8 overflow-x-auto hide-scrollbar">
          {filteredProducts.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center mt-12">
          <AnimatedButton href="/product" animation="bounce" size="lg">
            VIEW ALL PRODUCTS
          </AnimatedButton>
        </div>
      </div>
    </section>
  );
}

// Simple pill button for filters
function FilterPill({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full font-medium transition ${
        selected ? "bg-primary text-white" : "bg-gray-200 text-gray-800 hover:bg-gray-300"
      }`}
    >
      {label}
    </button>
  );
}
