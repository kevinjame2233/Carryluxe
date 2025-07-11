"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, ShoppingBag, Star, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useCart } from "@/components/providers/CartProvider"
import { useWishlist } from "@/components/providers/WishlistProvider"
import { products as staticProducts } from "@/lib/data"
import FOMOPopup from "@/components/FOMOPopup"

export default function HomePage() {
  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const [products, setProducts] = useState(staticProducts)
  const [homePageSettings, setHomePageSettings] = useState(null)
  const [currentSlide, setCurrentSlide] = useState(0)

  // Load homepage settings
  useEffect(() => {
    const loadHomePageSettings = async () => {
      try {
        const response = await fetch("/api/admin/homepage")
        if (response.ok) {
          const result = await response.json()
          setHomePageSettings(result.data)
        }
      } catch (error) {
        console.error("Failed to load homepage settings:", error)
      }
    }

    loadHomePageSettings()

    // Listen for homepage settings updates
    const handleSettingsUpdate = (event) => {
      setHomePageSettings(event.detail)
    }

    window.addEventListener("homepageSettingsUpdated", handleSettingsUpdate)
    return () => window.removeEventListener("homepageSettingsUpdated", handleSettingsUpdate)
  }, [])

  // Load products from API
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetch("/api/admin/products")
        if (response.ok) {
          const result = await response.json()
          if (result.data && result.data.length > 0) {
            setProducts(result.data)
          }
        }
      } catch (error) {
        console.error("Failed to load products:", error)
      }
    }

    loadProducts()
  }, [])

  // Auto-advance carousel
  useEffect(() => {
    if (!homePageSettings?.heroMedia || homePageSettings.heroMedia.length <= 1) return

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % homePageSettings.heroMedia.length)
    }, 4000)

    return () => clearInterval(timer)
  }, [homePageSettings?.heroMedia])

  const handleWishlistToggle = (product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  const nextSlide = () => {
    if (homePageSettings?.heroMedia) {
      setCurrentSlide((prev) => (prev + 1) % homePageSettings.heroMedia.length)
    }
  }

  const prevSlide = () => {
    if (homePageSettings?.heroMedia) {
      setCurrentSlide((prev) => (prev - 1 + homePageSettings.heroMedia.length) % homePageSettings.heroMedia.length)
    }
  }

  const featuredProducts = products.filter((product) => product.featured)
  const newArrivals = products.filter((product) => product.newArrival)
  const hermesProducts = products.filter((product) => product.category === "Hermès")
  const lvProducts = products.filter((product) => product.category === "Louis Vuitton")

  // Use default settings if not loaded yet
  const settings = homePageSettings || {
    heroTitle: "Elevated Luxury.\nTimeless Icons.",
    heroSubtitle:
      "Discover the world's most coveted handbags from Hermès and Louis Vuitton.\nWhere heritage meets contemporary elegance.",
    heroMedia: [{ type: "image", url: "/placeholder.svg?height=1080&width=1920", alt: "Luxury handbags" }],
    hermesTitle: "Hermès",
    hermesDescription: "The pinnacle of French craftsmanship since 1837",
    hermesImage: "/placeholder.svg?height=400&width=600",
    lvTitle: "Louis Vuitton",
    lvDescription: "Iconic monogram and timeless elegance since 1854",
    lvImage: "/placeholder.svg?height=400&width=600",
    shopByIconTitle: "Shop by Icon",
    shopByIconSubtitle: "The most coveted handbags in the world",
    trendingTitle: "Trending Now",
    trendingSubtitle: "The latest arrivals that are capturing hearts worldwide",
    ctaTitle: "Join the Elite",
    ctaDescription: "Become part of an exclusive community that appreciates the finest in luxury craftsmanship.",
  }

  return (
    <div className="min-h-screen bg-cream-50">
      <FOMOPopup />

      {/* Hero Carousel Section */}
      <section className="relative h-screen overflow-hidden">
        <div className="absolute inset-0">
          {settings.heroMedia?.map((media, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              {media.type === "video" ? (
                <video src={media.url} className="w-full h-full object-cover" autoPlay muted loop playsInline />
              ) : (
                <Image
                  src={media.url || "/placeholder.svg?height=1080&width=1920"}
                  alt={media.alt || "Hero image"}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
              )}
            </div>
          ))}
        </div>

        {/* Carousel Controls */}
        {settings.heroMedia && settings.heroMedia.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 backdrop-blur-sm rounded-full p-2 hover:bg-white/30 transition-colors"
            >
              <ChevronLeft className="h-6 w-6 text-white" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 backdrop-blur-sm rounded-full p-2 hover:bg-white/30 transition-colors"
            >
              <ChevronRight className="h-6 w-6 text-white" />
            </button>

            {/* Carousel Indicators */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex space-x-2">
              {settings.heroMedia.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentSlide ? "bg-white" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          </>
        )}

        {/* Hero Content Overlay */}
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center text-white max-w-4xl mx-auto px-4">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="font-playfair text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            >
              {settings.heroTitle.split("\n").map((line, index) => (
                <div key={index}>{line}</div>
              ))}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl mb-8 leading-relaxed max-w-2xl mx-auto"
            >
              {settings.heroSubtitle.split("\n").map((line, index) => (
                <div key={index}>{line}</div>
              ))}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Button
                size="lg"
                className="bg-gold-400 hover:bg-gold-500 text-charcoal-900 font-semibold px-8 py-3 text-lg"
                asChild
              >
                <Link href="/products">
                  Explore Collection
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Brand Collections */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Hermès */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <Link href="/products?category=Hermès">
                <div className="relative h-96 overflow-hidden rounded-lg mb-6">
                  <Image
                    src={settings.hermesImage || "/placeholder.svg?height=400&width=600"}
                    alt="Hermès Collection"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-6 left-6 text-white">
                    <h3 className="font-playfair text-3xl font-bold mb-2">{settings.hermesTitle}</h3>
                    <p className="text-lg">{settings.hermesDescription}</p>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Louis Vuitton */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <Link href="/products?category=Louis Vuitton">
                <div className="relative h-96 overflow-hidden rounded-lg mb-6">
                  <Image
                    src={settings.lvImage || "/placeholder.svg?height=400&width=600"}
                    alt="Louis Vuitton Collection"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-6 left-6 text-white">
                    <h3 className="font-playfair text-3xl font-bold mb-2">{settings.lvTitle}</h3>
                    <p className="text-lg">{settings.lvDescription}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Shop by Icon */}
      <section className="py-20 bg-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-charcoal-900 mb-4">
              {settings.shopByIconTitle}
            </h2>
            <p className="text-xl text-charcoal-800 max-w-2xl mx-auto">{settings.shopByIconSubtitle}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.slice(0, 4).map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white">
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <Image
                        src={product.image || "/placeholder.svg?height=300&width=300"}
                        alt={product.name}
                        width={300}
                        height={300}
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 right-4 flex flex-col space-y-2">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="bg-white/80 backdrop-blur-sm hover:bg-white"
                          onClick={() => handleWishlistToggle(product)}
                        >
                          <Heart
                            className={`h-4 w-4 ${
                              isInWishlist(product.id) ? "fill-red-500 text-red-500" : "text-charcoal-900"
                            }`}
                          />
                        </Button>
                      </div>
                      {product.newArrival && (
                        <Badge className="absolute top-4 left-4 bg-gold-400 text-charcoal-900">New</Badge>
                      )}
                    </div>
                    <div className="p-6">
                      <div className="flex items-center mb-2">
                        <div className="flex text-gold-400">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-current" />
                          ))}
                        </div>
                        <span className="text-sm text-charcoal-800 ml-2">(4.9)</span>
                      </div>
                      <h3 className="font-semibold text-lg mb-2 text-charcoal-900">{product.name}</h3>
                      <p className="text-charcoal-800 text-sm mb-4 line-clamp-2">{product.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-charcoal-900">${product.price.toLocaleString()}</span>
                        <Button
                          size="sm"
                          className="bg-charcoal-900 hover:bg-charcoal-800"
                          onClick={() => addToCart(product)}
                        >
                          <ShoppingBag className="h-4 w-4 mr-2" />
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Now */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-charcoal-900 mb-4">
              {settings.trendingTitle}
            </h2>
            <p className="text-xl text-charcoal-800 max-w-2xl mx-auto">{settings.trendingSubtitle}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newArrivals.slice(0, 3).map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white">
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <Image
                        src={product.image || "/placeholder.svg?height=300&width=300"}
                        alt={product.name}
                        width={300}
                        height={300}
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 right-4 flex flex-col space-y-2">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="bg-white/80 backdrop-blur-sm hover:bg-white"
                          onClick={() => handleWishlistToggle(product)}
                        >
                          <Heart
                            className={`h-4 w-4 ${
                              isInWishlist(product.id) ? "fill-red-500 text-red-500" : "text-charcoal-900"
                            }`}
                          />
                        </Button>
                      </div>
                      <Badge className="absolute top-4 left-4 bg-gold-400 text-charcoal-900">Trending</Badge>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center mb-2">
                        <div className="flex text-gold-400">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-current" />
                          ))}
                        </div>
                        <span className="text-sm text-charcoal-800 ml-2">(4.8)</span>
                      </div>
                      <h3 className="font-semibold text-lg mb-2 text-charcoal-900">{product.name}</h3>
                      <p className="text-charcoal-800 text-sm mb-4 line-clamp-2">{product.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-charcoal-900">${product.price.toLocaleString()}</span>
                        <Button
                          size="sm"
                          className="bg-charcoal-900 hover:bg-charcoal-800"
                          onClick={() => addToCart(product)}
                        >
                          <ShoppingBag className="h-4 w-4 mr-2" />
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-charcoal-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6">{settings.ctaTitle}</h2>
            <p className="text-xl mb-8 leading-relaxed">{settings.ctaDescription}</p>
            <Button
              size="lg"
              className="bg-gold-400 hover:bg-gold-500 text-charcoal-900 font-semibold px-8 py-3 text-lg"
              asChild
            >
              <Link href="/products">
                Start Shopping
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
