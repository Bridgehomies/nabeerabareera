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

        <h1 className="text-5xl font-bold mb-8 uppercase threed-text border-b-8 border-black pb-4">
          Shopping Cart
        </h1>

        {cart.length === 0 ? (
          <div className="text-center py-16 brutalist-container">
            <ShoppingBag size={64} className="mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4 uppercase">YOUR CART IS EMPTY</h2>
            <p className="mb-8 uppercase">Add some products to your cart and come back here to checkout.</p>
            <ThreeDButton href="/products">CONTINUE SHOPPING</ThreeDButton>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden border-4 border-black">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b-4 border-black">
                    <tr>
                      <th className="py-4 px-6 text-left text-gray-600 font-bold uppercase">Product</th>
                      <th className="py-4 px-6 text-center text-gray-600 font-bold uppercase">Quantity</th>
                      <th className="py-4 px-6 text-right text-gray-600 font-bold uppercase">Price</th>
                      <th className="py-4 px-6 text-right text-gray-600 font-bold uppercase">Total</th>
                      <th className="py-4 px-6"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y-4 divide-black">
                    {cart.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="py-4 px-2">
                          <div className="flex items-center">
                            <div className="h-20 w-20 flex-shrink-0 mr-4 rounded-lg overflow-hidden border-4 border-black">
                              <Image
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                width={80}
                                height={80}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div>
                              <h3 className="text-lg font-bold text-gray-900 uppercase">{item.name}</h3>
                              {item.color && (
                                <p className="text-sm text-gray-500 mt-1 uppercase">Color: {item.color}</p>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-2">
                          <div className="flex items-center justify-center border-4 border-black w-32 mx-auto bg-white">
                            <button
                              onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                              className="px-3 py-1 text-black border-r-4 border-black hover:bg-gray-800 hover:text-white transition-all duration-200"
                              disabled={item.quantity <= 1}
                            >
                              <Minus size={16} />
                            </button>
                            <span className="flex-1 text-center font-bold py-1">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="px-3 py-1 text-black border-l-4 border-black hover:bg-gray-800 hover:text-white transition-all duration-200"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                        </td>
                        <td className="py-4 px-2 text-right font-bold">${item.price.toFixed(2)}</td>
                        <td className="py-4 px-2 text-right font-bold">
                          ${(item.price * item.quantity).toFixed(2)}
                        </td>
                        <td className="py-4 px-2 text-right">
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-2 border-4 border-black bg-white hover:bg-red-600 hover:text-white hover:border-red-600 transition-all duration-200"
                          >
                            <X size={20} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-between mt-8">
                <ThreeDButton href="/products">CONTINUE SHOPPING</ThreeDButton>
                <button
                  onClick={clearCart}
                  className="uppercase font-bold border-4 border-black px-6 py-2 bg-white hover:bg-gray-800 hover:text-white transition-all duration-200"
                >
                  Clear Cart
                </button>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 border-4 border-black sticky top-24">
                <h2 className="text-2xl font-bold mb-6 uppercase">Order Summary</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between uppercase">
                    <span>Subtotal</span>
                    <span className="font-bold">${calculateSubtotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between uppercase">
                    <span>Shipping</span>
                    <span className="font-bold">$15.00</span>
                  </div>
                  <div className="flex justify-between pt-4 border-t-4 border-black">
                    <span className="font-bold text-lg uppercase">Total</span>
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
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}