"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  Minus,
  Plus,
  Heart,
  Share2,
  ShoppingBag,
  Truck,
  RotateCcw,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { FeaturedProducts } from "@/components/featured-products";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  images: string[];
  category: string;
  colors?: string[];
  reviews: { average: number; count: number };
}

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (!product) return;

    const cartProduct = {
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.images?.[0]
        ? `http://localhost:5000${product.images[0]}`
        : "/placeholder.svg",
      quantity,
      color: selectedColor || null,
    };

    addToCart(cartProduct);
    toast.success(`${product.name} added to cart!`);
  };

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`http://localhost:5000/api/products/${params.id}`);
        if (!res.ok) throw new Error("Product not found");
        const data = await res.json();
        setProduct(data);
        if (data.colors && data.colors.length > 0) setSelectedColor(data.colors[0]);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [params.id]);

  if (loading)
    return <p className="text-center py-8">Loading product details...</p>;
  if (!product)
    return <p className="text-center py-8">Product not found</p>;

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const fullImageUrl =
    product.images?.[selectedImage]
      ? `http://localhost:5000${product.images[selectedImage]}`
      : "/placeholder.svg";

  return (
    <div className="flex flex-col min-h-screen pt-20">
      <div className="container mx-auto px-4 md:px-6 py-8">
        {/* Breadcrumbs */}
        <div className="flex items-center text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-gray-700">
            Home
          </Link>
          <ChevronRight className="h-4 w-4 mx-1" />
          <Link
            href={`/category/${product.category}`}
            className="hover:text-gray-700"
          >
            {product.category.charAt(0).toUpperCase() +
              product.category.slice(1)}
          </Link>
          <ChevronRight className="h-4 w-4 mx-1" />
          <span className="text-gray-900">{product.name}</span>
        </div>

        {/* Product Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="brutalist-image relative h-[400px] md:h-[500px]">
              {product.images?.[selectedImage] && (
                <Image
                  src={`http://localhost:5000${product.images[selectedImage]}`}
                  alt={product.name}
                  fill
                  className="object-contain"
                />
              )}
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.images?.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative h-20 overflow-hidden border-4 ${
                    selectedImage === index
                      ? "border-black"
                      : "border-gray-300"
                  }`}
                >
                  <Image
                    src={`http://localhost:5000${img}`}
                    alt={`${product.name} - Image ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6 brutalist-container">
            <div>
              <h1 className="text-3xl font-bold uppercase">{product.name}</h1>
              <div className="mt-2 text-3xl font-bold">
                ${product.price.toFixed(2)}
              </div>
              <div className="mt-1 flex items-center">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.reviews.average)
                          ? "text-black"
                          : i < product.reviews.average
                            ? "text-black"
                            : "text-gray-300"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-500 uppercase">
                  {product.reviews.average} ({product.reviews.count} reviews)
                </span>
              </div>
            </div>

            <p className="text-gray-700 uppercase">{product.description}</p>

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <h3 className="text-sm font-bold text-black mb-2 uppercase">
                  Color
                </h3>
                <div className="flex space-x-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-3 py-1 uppercase font-bold ${
                        selectedColor === color
                          ? "bg-black text-white border-4 border-black"
                          : "border-4 border-black hover:bg-gray-100"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <h3 className="text-sm font-bold text-black mb-2 uppercase">
                Quantity
              </h3>
              <div className="flex items-center border-4 border-black w-32">
                <button
                  onClick={decreaseQuantity}
                  className="px-3 py-1 text-black hover:bg-black hover:text-white"
                >
                  <Minus size={16} />
                </button>
                <span className="flex-1 text-center font-bold">{quantity}</span>
                <button
                  onClick={increaseQuantity}
                  className="px-3 py-1 text-black hover:bg-black hover:text-white"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleAddToCart}
                className="brutalist-btn flex items-center justify-center"
              >
                <ShoppingBag className="mr-2 h-5 w-5" />
                ADD TO CART
              </button>
            </div>

            {/* Shipping Info */}
            <div className="border-t pt-4 space-y-3">
              <div className="flex items-start">
                <Truck className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium">Free Shipping</h4>
                  <p className="text-sm text-gray-500">On orders over $50</p>
                </div>
              </div>
              <div className="flex items-start">
                <RotateCcw className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium">Easy Returns</h4>
                  <p className="text-sm text-gray-500">30-day return policy</p>
                </div>
              </div>
              <div className="flex items-start">
                <Shield className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium">Secure Checkout</h4>
                  <p className="text-sm text-gray-500">SSL encrypted payment</p>
                </div>
              </div>
            </div>

            {/* Share */}
            <div className="flex items-center pt-2">
              <span className="text-sm text-gray-500 mr-2">Share:</span>
              <div className="flex space-x-2">
                <button className="p-1 rounded-full hover:bg-gray-100">
                  <Share2 size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Product Tabs */}
        <div className="mt-12">
          <Tabs defaultValue="details">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="p-4 border rounded-b-md mt-1">
              <div className="prose max-w-none">
                <p>{product.description}</p>
              </div>
            </TabsContent>
            <TabsContent value="features" className="p-4 border rounded-b-md mt-1">
              <ul className="list-disc pl-5 space-y-2">
                <li>High-quality materials</li>
                <li>Eco-friendly packaging</li>
                <li>Handcrafted with care</li>
              </ul>
            </TabsContent>
            <TabsContent value="reviews" className="p-4 border rounded-b-md mt-1">
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.reviews.average)
                          ? "text-yellow-400"
                          : i < product.reviews.average
                            ? "text-yellow-400"
                            : "text-gray-300"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="ml-2 text-lg font-medium">
                  {product.reviews.average} out of 5
                </span>
              </div>
              <p className="text-gray-500 mb-4">
                Based on {product.reviews.count} reviews
              </p>
              <Button>Write a Review</Button>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
          <FeaturedProducts />
        </div>
      </div>
    </div>
  );
}
