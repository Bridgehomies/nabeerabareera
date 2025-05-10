import { CheckCircle, Package, ArrowRight } from "lucide-react"
import { ThreeDButton } from "@/components/ui-brutalist/threed-button"
import { ScrollingGrid } from "@/components/ui-brutalist/scrolling-grid"

export default function OrderConfirmationPage() {
  const orderNumber = "NBRA-" + Math.floor(10000 + Math.random() * 90000)

  return (
    <div className="min-h-screen pt-20 relative">
      <ScrollingGrid />

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="brutalist-container bg-white max-w-3xl mx-auto text-center">
          <CheckCircle size={64} className="mx-auto mb-4" />
          <h1 className="text-5xl font-bold mb-4 uppercase threed-text">Order Confirmed!</h1>
          <p className="text-xl mb-8">Thank you for your purchase. Your order has been placed successfully.</p>

          <div className="border-4 border-black p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4 uppercase">Order #{orderNumber}</h2>
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
