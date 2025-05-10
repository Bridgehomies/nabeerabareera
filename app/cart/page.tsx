// cart/page.tsx

"use client"
import { useCart } from "@/context/CartContext"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Minus, Plus, X, ShoppingBag, ArrowRight } from "lucide-react"
import { ThreeDButton } from "@/components/ui-brutalist/threed-button"
import { ScrollingGrid } from "@/components/ui-brutalist/scrolling-grid"



// Sample cart data
const initialCartItems = [
  {
    id: 1,
    name: "Crystal Pendant Necklace",
    price: 49.99,
    image: "/placeholder.svg?height=400&width=300",
    quantity: 1,
  },
  {
    id: 2,
    name: "Wool Blend Overcoat",
    price: 129.99,
    image: "/placeholder.svg?height=400&width=300",
    quantity: 1,
  },
  {
    id: 5,
    name: "Trench Coat",
    price: 149.99,
    image: "/placeholder.svg?height=400&width=300",
    quantity: 2,
  },
]

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart(); // use it directly
  const [cartItems, setCartItems] = useState(initialCartItems);

  // ... rest of your code


  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return

    setCartItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const removeItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const calculateTax = () => {
    return calculateSubtotal() * 0.1 // 10% tax
  }

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax() + 15 // $15 shipping
  }

  return (
    <div className="min-h-screen pt-20 relative">
      <ScrollingGrid />

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="flex items-center text-sm mb-6">
          <Link href="/" className="hover:text-gray-700">
            Home
          </Link>
          <ChevronRight className="h-4 w-4 mx-1" />
          <span className="text-gray-900 font-bold">Shopping Cart</span>
        </div>

        <h1 className="text-5xl font-bold mb-8 uppercase threed-text border-b-8 border-black pb-4">Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-16 brutalist-container">
            <ShoppingBag size={64} className="mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4 uppercase">YOUR CART IS EMPTY</h2>
            <p className="mb-8 uppercase">Add some products to your cart and come back here to checkout.</p>
            <ThreeDButton href="/products">CONTINUE SHOPPING</ThreeDButton>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="overflow-x-auto">
                <table className="w-full border-4 border-black">
                  <thead className="bg-black text-white uppercase">
                    <tr>
                      <th className="py-4 px-2 text-left">Product</th>
                      <th className="py-4 px-2 text-center">Quantity</th>
                      <th className="py-4 px-2 text-right">Price</th>
                      <th className="py-4 px-2 text-right">Subtotal</th>
                      <th className="py-4 px-2"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y-4 divide-black">
                    {cartItems.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="py-4 px-2">
                          <div className="flex items-center">
                            <div className="h-20 w-20 flex-shrink-0 mr-4 border-4 border-black overflow-hidden">
                              <Image
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                width={80}
                                height={80}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div>
                              <h3 className="text-lg font-bold uppercase">{item.name}</h3>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-2">
                          <div className="flex items-center justify-center border-4 border-black w-32 mx-auto">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="px-3 py-1 text-black hover:bg-black hover:text-white"
                            >
                              <Minus size={16} />
                            </button>
                            <span className="flex-1 text-center font-bold">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="px-3 py-1 text-black hover:bg-black hover:text-white"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                        </td>
                        <td className="py-4 px-2 text-right font-bold">${item.price.toFixed(2)}</td>
                        <td className="py-4 px-2 text-right font-bold">${(item.price * item.quantity).toFixed(2)}</td>
                        <td className="py-4 px-2 text-right">
                          <button
                            onClick={() => removeItem(item.id)}
                            className="p-2 border-2 border-black hover:bg-red-600 hover:text-white hover:border-red-600"
                          >
                            <X size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-between mt-8">
                <ThreeDButton href="/products">CONTINUE SHOPPING</ThreeDButton>
                <button onClick={() => setCartItems([])} className="uppercase font-bold hover-glitch">
                  Clear Cart
                </button>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="brutalist-container bg-white">
                <h2 className="text-2xl font-bold mb-4 uppercase">Order Summary</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between uppercase">
                    <span>Subtotal</span>
                    <span className="font-bold">${calculateSubtotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between uppercase">
                    <span>Tax (10%)</span>
                    <span className="font-bold">${calculateTax().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between uppercase">
                    <span>Shipping</span>
                    <span className="font-bold">$15.00</span>
                  </div>
                  <div className="flex justify-between text-xl border-t-4 border-black pt-4 uppercase">
                    <span className="font-bold">Total</span>
                    <span className="font-bold">${calculateTotal().toFixed(2)}</span>
                  </div>
                </div>

                <ThreeDButton href="/checkout">
                  <div className="flex items-center justify-center">
                    CHECKOUT
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </ThreeDButton>

                <div className="mt-6 text-sm">
                  <p className="uppercase font-bold mb-2">WE ACCEPT:</p>
                  <div className="flex space-x-2">
                    <div className="border-2 border-black p-2 w-12 h-8"></div>
                    <div className="border-2 border-black p-2 w-12 h-8"></div>
                    <div className="border-2 border-black p-2 w-12 h-8"></div>
                    <div className="border-2 border-black p-2 w-12 h-8"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
