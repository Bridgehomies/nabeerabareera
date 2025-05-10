"use client"

import type React from "react"

import { useState } from "react"
import { Send } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { AnimatedButton } from "@/components/ui-brutalist/animated-button"
import { ZigzagDoodle, StarDoodle } from "@/components/ui-brutalist/doodles"

export function Newsletter() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Success!",
        description: "You've been subscribed to our newsletter.",
      })
      setEmail("")
      setIsSubmitting(false)
    }, 1000)
  }

  return (
    <section className="py-16 bg-primary-dark text-white relative">
      <StarDoodle className="absolute top-10 left-10 text-white opacity-30" />
      <ZigzagDoodle className="absolute bottom-10 right-10 text-white opacity-30" />

      <div className="container mx-auto px-4 md:px-6 text-center">
        <div className="brutalist-container bg-primary-dark border-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 uppercase text-black">Join Our Newsletter</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-8 uppercase">
            Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
          </p>

          <form onSubmit={handleSubmit} className="flex text-white flex-col sm:flex-row max-w-md mx-auto gap-1">
            <input
              type="email"
              placeholder="YOUR EMAIL ADDRESS"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="newsletter-input flex-grow placeholder-white h-12 flex items-center justify-center text-left"
            />
            <AnimatedButton 
              variant="white" 
              animation="fly" 
              className="whitespace-nowrap h-12 hover:bg-red-500 flex items-center justify-center"
              iconPosition="none"
            >
              {isSubmitting ? (
                "SUBSCRIBING..."
              ) : (
                <>
                  SUBSCRIBE
                  <Send className="ml-2 h-4 w-4 inline group-hover:-translate-y-1 transition-transform" />
                </>
              )}
            </AnimatedButton>
          </form>
        </div>
      </div>
    </section>
  )
}