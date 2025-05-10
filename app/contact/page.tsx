"use client"

import type React from "react"

import { useState } from "react"
import { Mail, Phone, MapPin, Send } from "lucide-react"
import { ThreeDButton } from "@/components/ui-brutalist/threed-button"
import { ScrollingGrid } from "@/components/ui-brutalist/scrolling-grid"

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate form submission
    setTimeout(() => {
      setFormSubmitted(true)
    }, 1000)
  }

  return (
    <div className="min-h-screen pt-20 relative">
      <ScrollingGrid />

      <div className="container mx-auto px-4 py-12 relative z-10">
        <h1 className="text-5xl font-bold mb-8 uppercase threed-text border-b-8 border-black pb-4">Contact Us</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div className="brutalist-container">
            <h2 className="text-3xl font-bold mb-6 uppercase">Get In Touch</h2>

            {formSubmitted ? (
              <div className="p-8 border-4 border-black text-center">
                <h3 className="text-2xl font-bold mb-4 uppercase">Message Sent!</h3>
                <p className="uppercase mb-4">Thank you for contacting us. We will get back to you shortly.</p>
                <ThreeDButton href="/">RETURN TO HOME</ThreeDButton>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block mb-2 uppercase font-bold">Name *</label>
                    <input type="text" className="w-full brutalist-input" required />
                  </div>
                  <div>
                    <label className="block mb-2 uppercase font-bold">Email *</label>
                    <input type="email" className="w-full brutalist-input" required />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block mb-2 uppercase font-bold">Subject *</label>
                    <input type="text" className="w-full brutalist-input" required />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block mb-2 uppercase font-bold">Message *</label>
                    <textarea className="w-full brutalist-input min-h-[150px]" required></textarea>
                  </div>
                </div>
                <button
                  type="submit"
                  className="relative inline-block font-bold text-center cursor-pointer px-6 py-3 transform transition-transform active:translate-y-1 active:translate-x-1 uppercase"
                >
                  <span className="bg-black absolute top-2 left-2 w-full h-full -z-10"></span>
                  <span className="block bg-black text-white border-4 border-black hover:bg-red-600 hover:border-red-600">
                    SEND MESSAGE <Send className="inline-block ml-2" size={16} />
                  </span>
                </button>
              </form>
            )}
          </div>

          <div>
            <div className="brutalist-container bg-black text-white mb-6">
              <h2 className="text-3xl font-bold mb-6 uppercase threed-text-white">Contact Information</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Mail className="mr-4 mt-1" size={24} />
                  <div>
                    <h3 className="font-bold uppercase mb-1">Email</h3>
                    <p>info@nabeerabaeera.com</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="mr-4 mt-1" size={24} />
                  <div>
                    <h3 className="font-bold uppercase mb-1">Phone</h3>
                    <p>+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="mr-4 mt-1" size={24} />
                  <div>
                    <h3 className="font-bold uppercase mb-1">Address</h3>
                    <p>123 Brutalism Street</p>
                    <p>New York, NY 10001</p>
                    <p>United States</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="brutalist-container">
              <h2 className="text-3xl font-bold mb-6 uppercase">Hours</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="font-bold uppercase">Monday - Friday</span>
                  <span>9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold uppercase">Saturday</span>
                  <span>10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold uppercase">Sunday</span>
                  <span>Closed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
