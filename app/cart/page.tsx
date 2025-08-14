"use client";
import { useCart } from "@/context/CartContext";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Minus, Plus, X, ShoppingBag, ArrowRight } from "lucide-react";
import { ThreeDButton } from "@/components/ui-brutalist/threed-button";
import { ScrollingGrid } from "@/components/ui-brutalist/scrolling-grid";

export default function CartPage() {
  const { cart, removeFromCart, clearCart, updateQuantity } = useCart();
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted on client-side before rendering cart
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const calculateSubtotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const calculateTotal = () => {
    return calculateSubtotal() + 15; // $15 shipping
  };

  return (
    <div className="min-h-screen pt-20 relative bg-gradient-to-b from-gray-50 to-white">
      <ScrollingGrid />

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="flex items-center text-sm mb-6">
          <Link href="/" className="hover:text-amber-600 transition-colors">
            Home
          </Link>
          <ChevronRight className="h-4 w-4 mx-1 text-gray-400" />
          <span className="text-gray-900 font-medium">Shopping Cart</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-serif font-medium threed-text mb-8 tracking-wide">
          Your Shopping Cart
        </h1>

        {cart.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-lg border border-gray-100">
            <ShoppingBag size={64} className="mx-auto mb-4 text-amber-500" />
            <h2 className="text-2xl font-serif font-medium mb-4">Your cart is empty</h2>
            <p className="mb-8 text-gray-600 max-w-md mx-auto">
              Discover our curated collection and add items to your cart
            </p>
            <ThreeDButton href="/products" className="px-8 py-3">
              Continue Shopping
            </ThreeDButton>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="py-4 px-6 text-left text-gray-600 font-medium">Product</th>
                      <th className="py-4 px-6 text-center text-gray-600 font-medium">Quantity</th>
                      <th className="py-4 px-6 text-right text-gray-600 font-medium">Price</th>
                      <th className="py-4 px-6 text-right text-gray-600 font-medium">Total</th>
                      <th className="py-4 px-6"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {cart.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                        <td className="py-6 px-6">
                          <div className="flex items-center">
                            <div className="h-20 w-20 flex-shrink-0 mr-4 rounded-lg overflow-hidden border border-gray-200">
                              <Image
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                width={80}
                                height={80}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div>
                              <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                              {item.color && (
                                <p className="text-sm text-gray-500 mt-1">Color: {item.color}</p>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="py-6 px-6">
                          <div className="flex items-center justify-center">
                            <div className="flex border border-gray-300 rounded-lg overflow-hidden w-32">
                              <button
                                onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                className="px-3 py-2 text-gray-600 hover:bg-gray-100 transition-colors"
                              >
                                <Minus size={16} />
                              </button>
                              <span className="flex-1 text-center font-medium py-2">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="px-3 py-2 text-gray-600 hover:bg-gray-100 transition-colors"
                              >
                                <Plus size={16} />
                              </button>
                            </div>
                          </div>
                        </td>
                        <td className="py-6 px-6 text-right font-medium text-gray-900">
                          ${item.price.toFixed(2)}
                        </td>
                        <td className="py-6 px-6 text-right font-medium text-gray-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </td>
                        <td className="py-6 px-6 text-right">
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-2 rounded-full hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <X size={20} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8">
                <ThreeDButton 
                  href="/products" 
                  variant="default"
                  className="px-6 py-3 text-sm"
                >
                  Continue Shopping
                </ThreeDButton>
                <button
                  onClick={clearCart}
                  className="uppercase text-sm font-medium px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Clear Cart
                </button>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 sticky top-24">
                <h2 className="text-2xl  font-medium mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${calculateSubtotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">$15.00</span>
                  </div>
                  <div className="flex justify-between pt-4 border-t border-gray-200">
                    <span className="font-medium text-lg">Total</span>
                    <span className="font-bold text-lg text-amber-600">${calculateTotal().toFixed(2)}</span>
                  </div>
                </div>

                <ThreeDButton 
                  href="/checkout" 
                  className="w-full py-4 text-base"
                >
                  <div className="flex items-center justify-center">
                    Proceed to Checkout
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </div>
                </ThreeDButton>

                <div className="mt-6 text-center text-sm text-gray-500">
                  Free shipping on orders over $100
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}