"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Search, Heart, User, ShoppingBag, Menu, X, Sun, Moon, LogIn, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useTheme } from "@/components/providers/ThemeProvider"
import { useWishlist } from "@/components/providers/WishlistProvider"
import { useCart } from "@/components/providers/CartProvider"
import { useAuth } from "@/components/providers/AuthProvider"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const { theme, setTheme } = useTheme()
  const { wishlistItems } = useWishlist()
  const { getTotalItems } = useCart()
  const { user, logout } = useAuth()
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`)
      setIsSearchOpen(false)
      setSearchQuery("")
    }
  }

  const handleLogout = async () => {
    await logout()
    router.push("/")
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 bg-cream-50 border-b border-cream-200 backdrop-blur-md bg-opacity-95"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/" className="flex-shrink-0">
              <h1 className="text-2xl font-playfair font-bold text-charcoal-900">CarryLuxe</h1>
            </Link>
          </motion.div>

          {/* Desktop Navigation - Only Hermès and Louis Vuitton */}
          <div className="hidden md:flex items-center space-x-12">
            <Link
              href="/products?category=Hermès"
              className="text-charcoal-800 hover:text-gold-400 transition-colors font-medium"
            >
              Hermès
            </Link>
            <Link
              href="/products?category=Louis Vuitton"
              className="text-charcoal-800 hover:text-gold-400 transition-colors font-medium"
            >
              Louis Vuitton
            </Link>
          </div>

          {/* Desktop Icons */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(!isSearchOpen)} className="relative">
                <Search className="h-5 w-5" />
              </Button>
            </div>

            <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
              {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </Button>

            <Link href="/wishlist">
              <Button variant="ghost" size="icon" className="relative">
                <Heart className="h-5 w-5" />
                {wishlistItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gold-400 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {wishlistItems.length}
                  </span>
                )}
              </Button>
            </Link>

            {/* User Authentication */}
            {user ? (
              <div className="flex items-center space-x-2">
                <Link href="/account">
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </Link>
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/login">
                  <Button variant="ghost" size="sm">
                    <LogIn className="h-4 w-4 mr-1" />
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button variant="outline" size="sm">
                    <UserPlus className="h-4 w-4 mr-1" />
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}

            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingBag className="h-5 w-5" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gold-400 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Expandable Search Bar */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-t border-cream-200"
            >
              <div className="py-4">
                <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
                  <div className="relative">
                    <Input
                      placeholder="Search for bags... (e.g., 'Birkin 30', 'LV Speedy', 'Kelly', 'Neverfull')"
                      className="w-full pr-12 text-lg py-3"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      autoFocus
                    />
                    <Button
                      type="submit"
                      size="icon"
                      className="absolute right-1 top-1 bg-gold-400 hover:bg-gold-500 text-charcoal-900"
                    >
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden"
            >
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-cream-200">
                {/* Mobile Search */}
                <div className="px-3 py-2">
                  <form onSubmit={handleSearch}>
                    <div className="relative">
                      <Input
                        placeholder="Search bags..."
                        className="w-full pr-10"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      <Button type="submit" size="icon" variant="ghost" className="absolute right-1 top-1">
                        <Search className="h-4 w-4" />
                      </Button>
                    </div>
                  </form>
                </div>

                <Link
                  href="/products?category=Hermès"
                  className="block px-3 py-2 text-charcoal-800 hover:text-gold-400 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Hermès
                </Link>
                <Link
                  href="/products?category=Louis Vuitton"
                  className="block px-3 py-2 text-charcoal-800 hover:text-gold-400 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Louis Vuitton
                </Link>

                <div className="flex items-center space-x-4 px-3 py-2 pt-4">
                  <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
                    {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                  </Button>
                  <Link href="/wishlist" className="relative">
                    <Heart className="h-5 w-5" />
                    {wishlistItems.length > 0 && (
                      <span className="absolute -top-1 -right-1 bg-gold-400 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                        {wishlistItems.length}
                      </span>
                    )}
                  </Link>
                  {user ? (
                    <>
                      <Link href="/account">
                        <User className="h-5 w-5" />
                      </Link>
                      <Button variant="ghost" size="sm" onClick={handleLogout}>
                        Logout
                      </Button>
                    </>
                  ) : (
                    <>
                      <Link href="/login">
                        <LogIn className="h-5 w-5" />
                      </Link>
                      <Link href="/register">
                        <UserPlus className="h-5 w-5" />
                      </Link>
                    </>
                  )}
                  <Link href="/cart" className="relative">
                    <ShoppingBag className="h-5 w-5" />
                    {getTotalItems() > 0 && (
                      <span className="absolute -top-1 -right-1 bg-gold-400 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                        {getTotalItems()}
                      </span>
                    )}
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}
