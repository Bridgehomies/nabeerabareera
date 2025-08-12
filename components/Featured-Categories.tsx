"use client"

import Link from "next/link";
import Image from "next/image";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { CircleDoodle, StarDoodle, ZigzagDoodle } from "@/components/ui-brutalist/doodles";
import { useState } from "react";

export default function FeaturedCategoriesSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const categories = [
    {
      title: "Artificial Jewelry",
      image: "https://images.unsplash.com/photo-1564623788399-b75405a129a2?q=80&w=1337&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      link: "/category/jewelry",
    },
    {
      title: "Coats",
      image: "https://images.unsplash.com/photo-1667283831517-5b747b3c17c8?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      link: "/category/mens-coats",
    },
    {
      title: "Kids Clothing",
      image: "https://images.unsplash.com/photo-1670014541811-9b0ec280ed60?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      link: "/category/kids-clothing",
    },
  ];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? categories.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === categories.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-20 bg-black brutalist-section relative overflow-hidden">
      {/* Decorative Doodles */}
      <CircleDoodle className="absolute top-5 left-5 text-accent w-20 h-20 animate-spin-slow" />
      <StarDoodle className="absolute bottom-5 right-5 text-white w-24 h-24 animate-pulse" />
      <ZigzagDoodle className="absolute top-1/3 right-1/4 text-primary w-32 h-32 animate-wiggle" />

      <div className="container mx-auto px-4 md:px-8">
        {/* Section Title */}
        <h2 className="text-5xl md:text-7xl font-extrabold text-center mb-12 uppercase threed-text-neon text-accent tracking-wider">
          OUR COLLECTIONS
        </h2>

        {/* Carousel Container */}
        <div className="relative flex items-center justify-center">
          {/* Navigation Buttons */}
          <button
            onClick={handlePrev}
            className="absolute left-0 md:left-4 z-20 p-3 bg-primary text-white border-4 border-white hover:bg-accent transition-colors duration-300"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-0 md:right-4 z-20 p-3 bg-primary text-white border-4 border-white hover:bg-accent transition-colors duration-300"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Carousel */}
          <div className="overflow-hidden w-full">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {categories.map((category, index) => (
                <div key={index} className="min-w-full flex justify-center">
                  <BrutalistCategoryCard
                    title={category.title}
                    image={category.image}
                    link={category.link}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Indicators */}
        <div className="flex justify-center mt-6 space-x-2">
          {categories.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full border-2 border-white ${
                index === currentIndex ? "bg-accent" : "bg-gray-600"
              }`}
            ></div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BrutalistCategoryCard({ title, image, link }: { title: string; image: string; link: string }) {
  return (
    <Link href={link} className="block w-[90%] md:w-[70%] group relative">
      <div className="brutalist-card relative h-[500px] md:h-[600px] border-8 border-white shadow-brutalist-neon group-hover:shadow-brutalist-neon-hover transition-all duration-500 overflow-hidden tilt-card">
        {/* Image with Tilt and Scale Effect */}
        <div className="relative w-full h-full overflow-hidden">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
          />
          {/* Neon Overlay */}
          <div className="absolute inset-0 bg-accent/20 group-hover:bg-accent/40 transition-colors duration-500 mix-blend-mode-overlay" />
        </div>

        {/* Content with Slide-Up Effect */}
        <div className="absolute bottom-0 left-0 right-0 bg-primary text-white p-6 transform translate-y-1/2 group-hover:translate-y-0 transition-transform duration-500 ease-out border-t-4 border-white">
          <h3 className="text-3xl md:text-4xl font-extrabold uppercase mb-3 tracking-wide">{title}</h3>
          <div className="flex items-center text-white group-hover:scale-105 transition-transform duration-300">
            <span className="uppercase font-semibold text-lg">EXPLORE NOW</span>
            <ChevronRight className="h-6 w-6 ml-2 animate-bounce" />
          </div>
        </div>
      </div>
    </Link>
  );
}