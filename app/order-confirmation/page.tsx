"use client"

import { useEffect, useState } from "react"
import { CheckCircle, Package, ArrowRight } from "lucide-react"
import { ThreeDButton } from "@/components/ui-brutalist/threed-button"
import { ScrollingGrid } from "@/components/ui-brutalist/scrolling-grid"

export default function OrderConfirmationPage() {
  const [isClient, setIsClient] = useState(false)
  const [orderNumber, setOrderNumber] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setIsClient(true)
    
    const fetchOrderId = async () => {
      try {
        // Replace this URL with your actual backend endpoint
        const response = await fetch("/order/confirmation", {
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

  // Consistent loading state to prevent hydration mismatch
  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center relative">
        <ScrollingGrid />
        <div className="container flex justify-center items-center mx-auto px-4 py-12 relative z-10">
          <div className="brutalist-container flex flex-col content-center bg-white max-w-3xl mx-auto text-center p-6">
            <div className="animate-pulse">
              <div className="h-16 bg-gray-200 rounded-full w-16 mx-auto mb-4"></div>
              <div className="h-12 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
              <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto mb-8"></div>
              <div className="h-24 bg-gray-200 rounded w-full mb-8"></div>
              <div className="h-12 bg-gray-200 rounded w-48 mx-auto"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center relative">
        <ScrollingGrid />
        <div className="container flex justify-center items-center mx-auto px-4 py-12 relative z-10">
          <div className="brutalist-container flex flex-col content-center bg-white max-w-3xl mx-auto text-center p-6">
            <div className="text-xl text-red-600 p-8">
              <p>{error}</p>
              <div className="mt-6">
                <ThreeDButton href="/account/orders">VIEW YOUR ORDERS</ThreeDButton>
              </div>
            </div>
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
            <div className="p-8">
              <div className="animate-pulse flex flex-col items-center">
                <div className="rounded-full bg-gray-200 h-16 w-16 mb-4"></div>
                <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-6 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
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
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 uppercase threed-text">Order Confirmed!</h1>
          <p className="text-lg sm:text-xl mb-8 px-4">Thank you for your purchase. Your order has been placed successfully.</p>

          <div className="border-4 border-black p-6 mb-8 mx-4">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 uppercase">Order #{orderNumber.toUpperCase()}</h2>
            <p className="uppercase text-sm sm:text-base">You will receive a confirmation email shortly with order details.</p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4 px-4 mb-8">
            <ThreeDButton href="/account/orders" className="w-full sm:w-auto mb-4 sm:mb-0">
              <div className="flex items-center justify-center">
                <Package className="mr-2 h-5 w-5" /> VIEW YOUR ORDERS
              </div>
            </ThreeDButton>
            <ThreeDButton href="/products" className="w-full sm:w-auto">
              <div className="flex items-center justify-center">
                CONTINUE SHOPPING <ArrowRight className="ml-2 h-5 w-5" />
              </div>
            </ThreeDButton>
          </div>
        </div>
      </div>
    </div>
  )
}