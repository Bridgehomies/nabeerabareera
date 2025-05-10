"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Menu, X, Search, ShoppingBag, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useMobile } from "@/hooks/use-mobile"
import { AnimatedButton } from "@/components/ui-brutalist/animated-button"
import { StarDoodle, CircleDoodle } from "@/components/ui-brutalist/doodles"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null)
  const isMobile = useMobile()
  const headerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setActiveMegaMenu(null)
      }
    }

    window.addEventListener("scroll", handleScroll)
    document.addEventListener("mousedown", handleClickOutside)

    // Check initial scroll position
    handleScroll()

    return () => {
      window.removeEventListener("scroll", handleScroll)
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const toggleMegaMenu = (menuId: string) => {
    if (activeMegaMenu === menuId) {
      setActiveMegaMenu(null)
    } else {
      setActiveMegaMenu(menuId)
    }
  }

  const closeMegaMenu = () => {
    setActiveMegaMenu(null)
  }

  return (
    <header ref={headerRef} className="brutalist-header">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between py-4 w-full max-w-full">
          {/* Logo with Image */}
          <Link href="/" className="brutalist-logo z-20 flex items-center flex-nowrap" style={{ minWidth: 0 }}>
            NABEERA BAREERA
            {/*<img src="/logo.jpg" alt="Nabeera Baeera Logo" className="ml-2 h-8 w-8 object-contain" />*/}
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              className={`uppercase font-bold hover:text-accent ${activeMegaMenu === "jewelry" ? "text-accent" : ""}`}
              onClick={() => toggleMegaMenu("jewelry")}
            >
              Jewelry
            </button>
            <button
              className={`uppercase font-bold hover:text-accent ${activeMegaMenu === "mens" ? "text-accent" : ""}`}
              onClick={() => toggleMegaMenu("mens")}
            >
              Men's Coats
            </button>
            <button
              className={`uppercase font-bold hover:text-accent ${activeMegaMenu === "kids" ? "text-accent" : ""}`}
              onClick={() => toggleMegaMenu("kids")}
            >
              Kids Clothing
            </button>
            <Link href="/new-arrivals" className="uppercase font-bold hover:text-accent">
              New Arrivals
            </Link>
            <Link href="/sale" className="uppercase font-bold hover:text-accent">
              Sale
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4 z-20">
            {/* Search */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 border-2 border-primary hover:bg-primary hover:text-white"
              aria-label="Search"
            >
              {isSearchOpen ? <X size={20} /> : <Search size={20} />}
            </button>

            {/* Account */}
            <Link
              href="/account"
              className="p-2 border-2 border-primary hover:bg-primary hover:text-white hidden sm:flex"
              aria-label="Account"
            >
              <User size={20} />
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className="p-2 relative border-2 border-primary hover:bg-primary hover:text-white"
              aria-label="Cart"
            >
              <ShoppingBag size={20} />
              <span className="absolute -top-2 -right-2 bg-accent text-white text-xs font-bold h-5 w-5 flex items-center justify-center">
                3
              </span>
            </Link>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu size={24} />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="border-l-4 border-primary">
                <div className="flex flex-col h-full py-6">
                  <h2 className="text-2xl font-bold mb-6 brutalist-logo">NABEERA BAEERA</h2>
                  <nav className="flex flex-col space-y-4">
                    <Link
                      href="/category/jewelry"
                      className="text-lg py-2 hover:text-accent uppercase font-bold"
                    >
                      Jewelry
                    </Link>
                    <Link
                      href="/category/mens-coats"
                      className="text-lg py-2 hover:text-accent uppercase font-bold"
                    >
                      Men's Coats
                    </Link>
                    <Link
                      href="/category/kids-clothing"
                      className="text-lg py-2 hover:text-accent uppercase font-bold"
                    >
                      Kids Clothing
                    </Link>
                    <Link
                      href="/new-arrivals"
                      className="text-lg py-2 hover:text-accent uppercase font-bold"
                    >
                      New Arrivals
                    </Link>
                    <Link href="/sale" className="text-lg py-2 hover:text-accent uppercase font-bold">
                      Sale
                    </Link>
                  </nav>
                  <div className="mt-auto space-y-4">
                    <Link href="/account" className="flex items-center py-2 text-lg uppercase font-bold">
                      <User className="mr-2" size={20} />
                      My Account
                    </Link>
                    <Link href="/cart" className="flex items-center py-2 text-lg uppercase font-bold">
                      <ShoppingBag className="mr-2" size={20} />
                      Shopping Bag (3)
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="mt-4 transition-all duration-300 pb-4">
            <div className="relative">
              <Input
                type="search"
                placeholder="SEARCH FOR PRODUCTS..."
                className="w-full pr-10 brutalist-input"
                autoFocus
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2" size={18} />
            </div>
          </div>
        )}

        {/* Mega Menu - Jewelry */}
        <div className={`mega-menu ${activeMegaMenu === "jewelry" ? "open" : ""}`}>
          <StarDoodle className="absolute top-5 right-5 text-accent" />
          <div className="mega-menu-column">
            <h3 className="mega-menu-title">Categories</h3>
            <Link href="/category/jewelry/necklaces" className="mega-menu-link">
              Necklaces
            </Link>
            <Link href="/category/jewelry/earrings" className="mega-menu-link">
              Earrings
            </Link>
            <Link href="/category/jewelry/bracelets" className="mega-menu-link">
              Bracelets
            </Link>
            <Link href="/category/jewelry/rings" className="mega-menu-link">
              Rings
            </Link>
          </div>
          <div className="mega-menu-column">
            <h3 className="mega-menu-title">Collections</h3>
            <Link href="/category/jewelry/crystal" className="mega-menu-link">
              Crystal Collection
            </Link>
            <Link href="/category/jewelry/pearl" className="mega-menu-link">
              Pearl Collection
            </Link>
            <Link href="/category/jewelry/statement" className="mega-menu-link">
              Statement Pieces
            </Link>
            <Link href="/category/jewelry/minimalist" className="mega-menu-link">
              Minimalist
            </Link>
          </div>
          <div className="mega-menu-column">
            <h3 className="mega-menu-title">Materials</h3>
            <Link href="/category/jewelry/gold-plated" className="mega-menu-link">
              Gold Plated
            </Link>
            <Link href="/category/jewelry/silver-plated" className="mega-menu-link">
              Silver Plated
            </Link>
            <Link href="/category/jewelry/rose-gold" className="mega-menu-link">
              Rose Gold
            </Link>
            <Link href="/category/jewelry/gemstones" className="mega-menu-link">
              Gemstones
            </Link>
          </div>
          <div className="mega-menu-column">
            <div className="brutalist-container h-full flex flex-col justify-center items-center">
              <CircleDoodle className="absolute -top-5 -right-5 text-accent" />
              <h3 className="text-2xl font-bold mb-4">NEW IN</h3>
              <p className="mb-4 uppercase text-center">Discover our latest jewelry arrivals</p>
              <AnimatedButton href="/category/jewelry/new" animation="bounce">
                SHOP NOW
              </AnimatedButton>
            </div>
          </div>
        </div>

        {/* Mega Menu - Men's Coats */}
        <div className={`mega-menu ${activeMegaMenu === "mens" ? "open" : ""}`}>
          <StarDoodle className="absolute top-5 left-5 text-accent" />
          <div className="mega-menu-column">
            <h3 className="mega-menu-title">Categories</h3>
            <Link href="/category/mens-coats/overcoats" className="mega-menu-link">
              Overcoats
            </Link>
            <Link href="/category/mens-coats/trench-coats" className="mega-menu-link">
              Trench Coats
            </Link>
            <Link href="/category/mens-coats/puffer-jackets" className="mega-menu-link">
              Puffer Jackets
            </Link>
            <Link href="/category/mens-coats/parkas" className="mega-menu-link">
              Parkas
            </Link>
          </div>
          <div className="mega-menu-column">
            <h3 className="mega-menu-title">Materials</h3>
            <Link href="/category/mens-coats/wool" className="mega-menu-link">
              Wool
            </Link>
            <Link href="/category/mens-coats/leather" className="mega-menu-link">
              Leather
            </Link>
            <Link href="/category/mens-coats/cotton" className="mega-menu-link">
              Cotton
            </Link>
            <Link href="/category/mens-coats/synthetic" className="mega-menu-link">
              Synthetic
            </Link>
          </div>
          <div className="mega-menu-column">
            <h3 className="mega-menu-title">Seasons</h3>
            <Link href="/category/mens-coats/winter" className="mega-menu-link">
              Winter
            </Link>
            <Link href="/category/mens-coats/fall" className="mega-menu-link">
              Fall
            </Link>
            <Link href="/category/mens-coats/spring" className="mega-menu-link">
              Spring
            </Link>
            <Link href="/category/mens-coats/all-season" className="mega-menu-link">
              All Season
            </Link>
          </div>
          <div className="mega-menu-column">
            <div className="brutalist-container h-full flex flex-col justify-center items-center">
              <CircleDoodle className="absolute -bottom-5 -left-5 text-accent" />
              <h3 className="text-2xl font-bold mb-4">WINTER SALE</h3>
              <p className="mb-4 uppercase text-center">Up to 50% off selected coats</p>
              <AnimatedButton href="/category/mens-coats/sale" animation="shake">
                SHOP SALE
              </AnimatedButton>
            </div>
          </div>
        </div>

        {/* Mega Menu - Kids Clothing */}
        <div className={`mega-menu ${activeMegaMenu === "kids" ? "open" : ""}`}>
          <StarDoodle className="absolute bottom-5 right-5 text-accent" />
          <div className="mega-menu-column">
            <h3 className="mega-menu-title">Categories</h3>
            <Link href="/category/kids-clothing/tops" className="mega-menu-link">
              Tops
            </Link>
            <Link href="/category/kids-clothing/bottoms" className="mega-menu-link">
              Bottoms
            </Link>
            <Link href="/category/kids-clothing/dresses" className="mega-menu-link">
              Dresses
            </Link>
            <Link href="/category/kids-clothing/outerwear" className="mega-menu-link">
              Outerwear
            </Link>
          </div>
          <div className="mega-menu-column">
            <h3 className="mega-menu-title">Age Groups</h3>
            <Link href="/category/kids-clothing/baby" className="mega-menu-link">
              Baby (0-2 years)
            </Link>
            <Link href="/category/kids-clothing/toddler" className="mega-menu-link">
              Toddler (2-4 years)
            </Link>
            <Link href="/category/kids-clothing/little-kids" className="mega-menu-link">
              Little Kids (4-7 years)
            </Link>
            <Link href="/category/kids-clothing/big-kids" className="mega-menu-link">
              Big Kids (8-12 years)
            </Link>
          </div>
          <div className="mega-menu-column">
            <h3 className="mega-menu-title">Collections</h3>
            <Link href="/category/kids-clothing/casual" className="mega-menu-link">
              Casual
            </Link>
            <Link href="/category/kids-clothing/formal" className="mega-menu-link">
              Formal
            </Link>
            <Link href="/category/kids-clothing/school" className="mega-menu-link">
              School
            </Link>
            <Link href="/category/kids-clothing/seasonal" className="mega-menu-link">
              Seasonal
            </Link>
          </div>
          <div className="mega-menu-column">
            <div className="brutalist-container h-full flex flex-col justify-center items-center">
              <CircleDoodle className="absolute -top-5 -left-5 text-accent" />
              <h3 className="text-2xl font-bold mb-4">NEW ARRIVALS</h3>
              <p className="mb-4 uppercase text-center">Check out our latest kids collection</p>
              <AnimatedButton href="/category/kids-clothing/new" animation="pulse">
                EXPLORE NOW
              </AnimatedButton>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay to close mega menu when clicking outside */}
      {activeMegaMenu && <div className="fixed inset-0 bg-black bg-opacity-50 z-10" onClick={closeMegaMenu} />}
    </header>
  )
}