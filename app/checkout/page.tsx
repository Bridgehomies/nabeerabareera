"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronRight, CreditCard, Clock } from "lucide-react"
import { ThreeDButton } from "@/components/ui-brutalist/threed-button"
import { ScrollingGrid } from "@/components/ui-brutalist/scrolling-grid"

export default function CheckoutPage() {
  const [step, setStep] = useState(1)

  return (
    <div className="min-h-screen pt-20 relative">
      <ScrollingGrid />

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="flex items-center text-sm mb-6">
          <Link href="/" className="hover:text-gray-700">
            Home
          </Link>
          <ChevronRight className="h-4 w-4 mx-1" />
          <Link href="/cart" className="hover:text-gray-700">
            Cart
          </Link>
          <ChevronRight className="h-4 w-4 mx-1" />
          <span className="text-gray-900 font-bold">Checkout</span>
        </div>

        <h1 className="text-5xl font-bold mb-8 uppercase threed-text border-b-8 border-black pb-4">Checkout</h1>

        <div className="flex mb-8 border-4 border-black">
          <button
            className={`flex-1 py-4 uppercase font-bold ${step === 1 ? "bg-black text-white" : "bg-white"}`}
            onClick={() => setStep(1)}
          >
            1. Shipping
          </button>
          <button
            className={`flex-1 py-4 uppercase font-bold border-l-4 border-black ${step === 2 ? "bg-black text-white" : "bg-white"}`}
            onClick={() => setStep(2)}
          >
            2. Payment
          </button>
          <button
            className={`flex-1 py-4 uppercase font-bold border-l-4 border-black ${step === 3 ? "bg-black text-white" : "bg-white"}`}
            onClick={() => setStep(3)}
          >
            3. Review
          </button>
        </div>

        {step === 1 && (
          <div className="brutalist-container bg-white">
            <h2 className="text-2xl font-bold mb-6 uppercase">Shipping Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 uppercase font-bold">First Name *</label>
                <input type="text" className="w-full brutalist-input" required />
              </div>
              <div>
                <label className="block mb-2 uppercase font-bold">Last Name *</label>
                <input type="text" className="w-full brutalist-input" required />
              </div>
              <div className="md:col-span-2">
                <label className="block mb-2 uppercase font-bold">Email Address *</label>
                <input type="email" className="w-full brutalist-input" required />
              </div>
              <div className="md:col-span-2">
                <label className="block mb-2 uppercase font-bold">Street Address *</label>
                <input type="text" className="w-full brutalist-input" required />
              </div>
              <div>
                <label className="block mb-2 uppercase font-bold">City *</label>
                <input type="text" className="w-full brutalist-input" required />
              </div>
              <div>
                <label className="block mb-2 uppercase font-bold">Postal Code *</label>
                <input type="text" className="w-full brutalist-input" required />
              </div>
              <div>
                <label className="block mb-2 uppercase font-bold">Country *</label>
                <select className="w-full brutalist-input" required>
                  <option value="">Select Country</option>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="UK">United Kingdom</option>
                </select>
              </div>
              <div>
                <label className="block mb-2 uppercase font-bold">Phone Number *</label>
                <input type="tel" className="w-full brutalist-input" required />
              </div>
            </div>

            <div className="flex justify-between mt-8">
              <ThreeDButton href="/cart">BACK TO CART</ThreeDButton>
              <ThreeDButton onClick={() => setStep(2)}>CONTINUE TO PAYMENT</ThreeDButton>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="brutalist-container bg-white">
            <h2 className="text-2xl font-bold mb-6 uppercase">Payment Information</h2>

            <div className="mb-6">
              <div className="border-4 border-black p-4 mb-4">
                <label className="flex items-center uppercase font-bold">
                  <input type="radio" name="paymentMethod" className="mr-2" defaultChecked />
                  <CreditCard className="mr-2" /> Credit Card
                </label>
              </div>
              <div className="border-4 border-black p-4">
                <label className="flex items-center uppercase font-bold">
                  <input type="radio" name="paymentMethod" className="mr-2" />
                  <Clock className="mr-2" /> Pay Later
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block mb-2 uppercase font-bold">Card Number *</label>
                <input type="text" className="w-full brutalist-input" placeholder="XXXX XXXX XXXX XXXX" required />
              </div>
              <div>
                <label className="block mb-2 uppercase font-bold">Expiration Date *</label>
                <input type="text" className="w-full brutalist-input" placeholder="MM/YY" required />
              </div>
              <div>
                <label className="block mb-2 uppercase font-bold">CVV *</label>
                <input type="text" className="w-full brutalist-input" placeholder="123" required />
              </div>
              <div className="md:col-span-2">
                <label className="block mb-2 uppercase font-bold">Name on Card *</label>
                <input type="text" className="w-full brutalist-input" required />
              </div>
            </div>

            <div className="flex justify-between mt-8">
              <ThreeDButton onClick={() => setStep(1)}>BACK TO SHIPPING</ThreeDButton>
              <ThreeDButton onClick={() => setStep(3)}>REVIEW ORDER</ThreeDButton>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="brutalist-container bg-white">
            <h2 className="text-2xl font-bold mb-6 uppercase">Review Your Order</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4 uppercase">Shipping Address</h3>
                <div className="border-4 border-black p-4">
                  <p className="uppercase">John Doe</p>
                  <p>123 Brutalism Street</p>
                  <p>New York, NY 10001</p>
                  <p>United States</p>
                  <p>+1 (555) 123-4567</p>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4 uppercase">Payment Method</h3>
                <div className="border-4 border-black p-4 flex items-center">
                  <CreditCard className="mr-2" />
                  <div>
                    <p className="uppercase font-bold">Credit Card</p>
                    <p>**** **** **** 1234</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-bold mb-4 uppercase">Order Summary</h3>
              <div className="border-4 border-black">
                <div className="p-4 border-b-4 border-black bg-black text-white">
                  <div className="flex justify-between uppercase">
                    <span>3 Items</span>
                    <span>$329.97</span>
                  </div>
                </div>
                <div className="p-4 space-y-2">
                  <div className="flex justify-between uppercase">
                    <span>Subtotal</span>
                    <span>$329.97</span>
                  </div>
                  <div className="flex justify-between uppercase">
                    <span>Tax</span>
                    <span>$33.00</span>
                  </div>
                  <div className="flex justify-between uppercase">
                    <span>Shipping</span>
                    <span>$15.00</span>
                  </div>
                  <div className="flex justify-between text-xl border-t-4 border-black pt-2 uppercase font-bold">
                    <span>Total</span>
                    <span>$377.97</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between mt-8">
              <ThreeDButton onClick={() => setStep(2)}>BACK TO PAYMENT</ThreeDButton>
              <ThreeDButton onClick={() => (window.location.href = "/order-confirmation")}>PLACE ORDER</ThreeDButton>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
