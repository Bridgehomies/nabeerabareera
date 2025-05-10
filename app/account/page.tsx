"use client"

import { useState } from "react"
import Link from "next/link"
import { User, Package, Heart, CreditCard, LogOut, Settings } from "lucide-react"
import { ThreeDButton } from "@/components/ui-brutalist/threed-button"
import { ScrollingGrid } from "@/components/ui-brutalist/scrolling-grid"

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState("profile")

  return (
    <div className="min-h-screen pt-20 relative">
      <ScrollingGrid />

      <div className="container mx-auto px-4 py-12 relative z-10">
        <h1 className="text-5xl font-bold mb-8 uppercase threed-text border-b-8 border-black pb-4">My Account</h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="brutalist-container bg-white">
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => setActiveTab("profile")}
                    className={`w-full text-left p-4 flex items-center uppercase font-bold ${
                      activeTab === "profile" ? "bg-black text-white" : "hover:bg-gray-100"
                    }`}
                  >
                    <User className="mr-2" size={20} /> Profile
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab("orders")}
                    className={`w-full text-left p-4 flex items-center uppercase font-bold ${
                      activeTab === "orders" ? "bg-black text-white" : "hover:bg-gray-100"
                    }`}
                  >
                    <Package className="mr-2" size={20} /> Orders
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab("wishlist")}
                    className={`w-full text-left p-4 flex items-center uppercase font-bold ${
                      activeTab === "wishlist" ? "bg-black text-white" : "hover:bg-gray-100"
                    }`}
                  >
                    <Heart className="mr-2" size={20} /> Wishlist
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab("payment")}
                    className={`w-full text-left p-4 flex items-center uppercase font-bold ${
                      activeTab === "payment" ? "bg-black text-white" : "hover:bg-gray-100"
                    }`}
                  >
                    <CreditCard className="mr-2" size={20} /> Payment
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab("settings")}
                    className={`w-full text-left p-4 flex items-center uppercase font-bold ${
                      activeTab === "settings" ? "bg-black text-white" : "hover:bg-gray-100"
                    }`}
                  >
                    <Settings className="mr-2" size={20} /> Settings
                  </button>
                </li>
                <li>
                  <Link
                    href="/logout"
                    className="w-full text-left p-4 flex items-center uppercase font-bold text-red-600 hover:bg-red-600 hover:text-white"
                  >
                    <LogOut className="mr-2" size={20} /> Logout
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="md:col-span-3">
            {activeTab === "profile" && <ProfileTab />}

            {activeTab === "orders" && <OrdersTab />}

            {activeTab === "wishlist" && <WishlistTab />}

            {activeTab === "payment" && <PaymentTab />}

            {activeTab === "settings" && <SettingsTab />}
          </div>
        </div>
      </div>
    </div>
  )
}

function ProfileTab() {
  return (
    <div className="brutalist-container bg-white">
      <h2 className="text-3xl font-bold mb-6 uppercase">Profile Information</h2>

      <form>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block mb-2 uppercase font-bold">First Name</label>
            <input type="text" className="w-full brutalist-input" defaultValue="John" />
          </div>
          <div>
            <label className="block mb-2 uppercase font-bold">Last Name</label>
            <input type="text" className="w-full brutalist-input" defaultValue="Doe" />
          </div>
          <div>
            <label className="block mb-2 uppercase font-bold">Email</label>
            <input type="email" className="w-full brutalist-input" defaultValue="john.doe@example.com" />
          </div>
          <div>
            <label className="block mb-2 uppercase font-bold">Phone</label>
            <input type="tel" className="w-full brutalist-input" defaultValue="+1 (555) 123-4567" />
          </div>
          <div className="md:col-span-2">
            <label className="block mb-2 uppercase font-bold">Address</label>
            <input type="text" className="w-full brutalist-input mb-2" defaultValue="123 Brutalism Street" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <input type="text" className="brutalist-input" placeholder="City" defaultValue="New York" />
              <input type="text" className="brutalist-input" placeholder="State" defaultValue="NY" />
              <input type="text" className="brutalist-input" placeholder="Zip" defaultValue="10001" />
            </div>
          </div>
        </div>
        <ThreeDButton>SAVE CHANGES</ThreeDButton>
      </form>
    </div>
  )
}

function OrdersTab() {
  return (
    <div className="brutalist-container bg-white">
      <h2 className="text-3xl font-bold mb-6 uppercase">Your Orders</h2>

      <div className="space-y-6">
        <div className="border-4 border-black">
          <div className="bg-black text-white p-4 flex justify-between uppercase">
            <span className="font-bold">Order #NBRA-12345</span>
            <span>May 7, 2023</span>
          </div>
          <div className="p-4">
            <div className="flex justify-between mb-2">
              <span className="uppercase font-bold">Status:</span>
              <span className="uppercase text-green-600 font-bold">Delivered</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="uppercase font-bold">Items:</span>
              <span>3</span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="uppercase font-bold">Total:</span>
              <span>$329.97</span>
            </div>
            <div className="flex justify-end">
              <ThreeDButton href="/account/orders/NBRA-12345">VIEW DETAILS</ThreeDButton>
            </div>
          </div>
        </div>

        <div className="border-4 border-black">
          <div className="bg-black text-white p-4 flex justify-between uppercase">
            <span className="font-bold">Order #NBRA-12346</span>
            <span>April 15, 2023</span>
          </div>
          <div className="p-4">
            <div className="flex justify-between mb-2">
              <span className="uppercase font-bold">Status:</span>
              <span className="uppercase text-green-600 font-bold">Delivered</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="uppercase font-bold">Items:</span>
              <span>2</span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="uppercase font-bold">Total:</span>
              <span>$179.98</span>
            </div>
            <div className="flex justify-end">
              <ThreeDButton href="/account/orders/NBRA-12346">VIEW DETAILS</ThreeDButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function WishlistTab() {
  return (
    <div className="brutalist-container bg-white">
      <h2 className="text-3xl font-bold mb-6 uppercase">Your Wishlist</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="brutalist-card">
          <div className="relative h-[200px]">
            <img
              src="/placeholder.svg?height=400&width=300"
              alt="Crystal Pendant Necklace"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="p-4 border-t-4 border-black">
            <h3 className="font-bold uppercase mb-1">Crystal Pendant Necklace</h3>
            <p className="font-bold mb-4">$49.99</p>
            <div className="flex justify-between">
              <button className="text-red-600 uppercase font-bold hover-glitch">Remove</button>
              <ThreeDButton onClick={() => alert("Added to cart!")}>Add to Cart</ThreeDButton>
            </div>
          </div>
        </div>

        <div className="brutalist-card">
          <div className="relative h-[200px]">
            <img
              src="/placeholder.svg?height=400&width=300"
              alt="Wool Blend Overcoat"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="p-4 border-t-4 border-black">
            <h3 className="font-bold uppercase mb-1">Wool Blend Overcoat</h3>
            <p className="font-bold mb-4">$129.99</p>
            <div className="flex justify-between">
              <button className="text-red-600 uppercase font-bold hover-glitch">Remove</button>
              <ThreeDButton onClick={() => alert("Added to cart!")}>Add to Cart</ThreeDButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function PaymentTab() {
  return (
    <div className="brutalist-container bg-white">
      <h2 className="text-3xl font-bold mb-6 uppercase">Payment Methods</h2>

      <div className="space-y-6 mb-8">
        <div className="border-4 border-black p-4 flex justify-between items-center">
          <div className="flex items-center">
            <CreditCard className="mr-4" size={24} />
            <div>
              <p className="font-bold uppercase">Visa ending in 1234</p>
              <p>Expires 12/2025</p>
            </div>
          </div>
          <div className="flex items-center">
            <button className="uppercase font-bold mr-4 hover-glitch">Edit</button>
            <button className="uppercase font-bold text-red-600 hover-glitch">Delete</button>
          </div>
        </div>

        <div className="border-4 border-black p-4 flex justify-between items-center">
          <div className="flex items-center">
            <CreditCard className="mr-4" size={24} />
            <div>
              <p className="font-bold uppercase">Mastercard ending in 5678</p>
              <p>Expires 08/2024</p>
            </div>
          </div>
          <div className="flex items-center">
            <button className="uppercase font-bold mr-4 hover-glitch">Edit</button>
            <button className="uppercase font-bold text-red-600 hover-glitch">Delete</button>
          </div>
        </div>
      </div>

      <ThreeDButton>ADD NEW PAYMENT METHOD</ThreeDButton>
    </div>
  )
}

function SettingsTab() {
  return (
    <div className="brutalist-container bg-white">
      <h2 className="text-3xl font-bold mb-6 uppercase">Account Settings</h2>

      <div className="space-y-8">
        <div>
          <h3 className="text-xl font-bold mb-4 uppercase">Email Preferences</h3>
          <div className="space-y-2">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" defaultChecked />
              <span className="uppercase">Order confirmations and updates</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" defaultChecked />
              <span className="uppercase">Promotions and discounts</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span className="uppercase">New product announcements</span>
            </label>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-4 uppercase">Password</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input type="password" className="w-full brutalist-input" placeholder="Current Password" />
            <div></div>
            <input type="password" className="w-full brutalist-input" placeholder="New Password" />
            <input type="password" className="w-full brutalist-input" placeholder="Confirm New Password" />
          </div>
          <ThreeDButton>CHANGE PASSWORD</ThreeDButton>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-4 uppercase text-red-600">Danger Zone</h3>
          <button className="border-4 border-red-600 bg-white text-red-600 p-4 uppercase font-bold hover:bg-red-600 hover:text-white">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  )
}
