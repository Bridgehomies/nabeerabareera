import type React from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ThemeProvider } from "@/components/theme-provider"
import LenisSmoothScroll from '@/components/LenisWrapper';
import { CartProvider } from '@/context/CartContext'
import "./globals.css"

export const metadata = {
  title: "NabeeraBaeera - Artificial Jewelry, Men's Coats & Kids Clothing",
  description:
    "Discover exquisite artificial jewelry, stylish men's coats, and adorable kids clothing at NabeeraBaeera.",
  generator: 'v0.dev',
  icons: {
    icon: '/placeholder.svg',
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Anton&family=Space+Mono:wght@400;700&family=Bebas+Neue&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased pattern-bg">
        <ThemeProvider attribute="class" defaultTheme="light">
          <Header />
          <main className="pt-20"><LenisSmoothScroll><CartProvider>{children}</CartProvider></LenisSmoothScroll></main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
