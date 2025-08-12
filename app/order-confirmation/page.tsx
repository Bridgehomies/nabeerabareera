"use client"

import { useEffect, useState } from "react"
import { CheckCircle, Package, ArrowRight } from "lucide-react"
import { ThreeDButton } from "@/components/ui-brutalist/threed-button"
import { ScrollingGrid } from "@/components/ui-brutalist/scrolling-grid"

export default function OrderConfirmationPage() {
  const [orderNumber, setOrderNumber] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchOrderId = async () => {
      try {
        // Replace this URL with your actual backend endpoint
        const response = await fetch("/api/order/confirmation", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })

        if (!response.ok) {
          throw new Error("Failed to fetch order ID")
        }

        const data = await response.json()
        // Ensure we use consistent ID field like in OrdersPage (e.g., _id or id)
        const orderId = data.orderId || data.id || data._id
        if (!orderId) {
          throw new Error("Invalid order data received")
        }
        setOrderNumber(orderId)
      } catch (err) {
        setError("Unable to fetch order details. Please try again later.")
        console.error("Error fetching order ID:", err)
      }
    }

    fetchOrderId()
  }, [])

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center relative">
        <ScrollingGrid />
        <div className="container flex justify-center items-center mx-auto px-4 py-12 relative z-10">
          <div className="brutalist-container flex flex-col content-center bg-white max-w-3xl mx-auto text-center p-6">
            <p className="text-xl text-red-600">{error}</p>
          </div>
        </div>
      </div>
    )
  }

  if (!orderNumber) {
    return (
      <div className="min-h-screen flex items-center justify-center relative">
        <ScrollingGrid />
        <div className="container flex justify-center items-center mx-auto px-4 py-12 relative z-10">
          <div className="brutalist-container flex flex-col content-center bg-white max-w-3xl mx-auto text-center p-6">
            <p className="text-xl">Loading order details...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center content-center justify-center pt-20 relative">
      <ScrollingGrid />

      <div className="container flex justify-center items-center mx-auto px-4 py-12 relative z-10">
        <div className="brutalist-container flex flex-col content-center bg-white max-w-3xl mx-auto text-center">
          <CheckCircle size={64} className="mx-auto mb-4" />
          <h1 className="text-5xl font-bold mb-4 uppercase threed-text">Order Confirmed!</h1>
          <p className="text-xl mb-8">Thank you for your purchase. Your order has been placed successfully.</p>

          <div className="border-4 border-black p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4 uppercase">Order #{orderNumber.toUpperCase()}</h2>
            <p className="uppercase">You will receive a confirmation email shortly with order details.</p>
          </div>

          <div className="flex flex-col md:flex-row justify-center gap-4">
            <ThreeDButton href="/account/orders">
              <div className="flex items-center">
                <Package className="mr-2" /> VIEW YOUR ORDERS
              </div>
            </ThreeDButton>
            <ThreeDButton href="/products">
              <div className="flex items-center">
                CONTINUE SHOPPING <ArrowRight className="ml-2" />
              </div>
            </ThreeDButton>
          </div>
        </div>
      </div>
    </div>
  )
}