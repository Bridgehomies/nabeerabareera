import type React from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ThemeProvider } from "@/components/theme-provider"
import LenisSmoothScroll from '@/components/LenisWrapper'
import { CartProvider } from '@/context/CartContext'
import { Toaster } from 'sonner'
import "./globals.css"

export const metadata = {
  title: "NabeeraBareera - Artificial Jewelry, Coats & Kids Clothing",
  description:
    "Discover exquisite artificial jewelry, stylish coats, and adorable kids clothing at NabeeraBaeera.",
  
  icons: {
    icon: '/logo.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Fonts will be optimized later using next/font */}
      </head>
      <body className="min-h-screen bg-background font-sans antialiased pattern-bg">
        <ThemeProvider attribute="class" defaultTheme="light">
          <CartProvider>
            <Header />
            <main className="pt-20">
              <LenisSmoothScroll>{children}</LenisSmoothScroll>
            </main>
            <Footer />
            <Toaster position="top-center" />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}