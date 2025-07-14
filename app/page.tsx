"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import ProductCard from "@/components/ProductCard"
import Footer from "@/components/layout/Footer"
import { products } from "@/lib/data"
import { motion } from "framer-motion"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"

interface HomePageSettings {
  heroTitle: string
  heroSubtitle: string
  heroMedia: Array<{
    type: string
    url: string
    alt: string
  }>
  hermesTitle: string
  hermesDescription: string
  hermesImage: string
  lvTitle: string
  lvDescription: string
  lvImage: string
  shopByIconTitle: string
  shopByIconSubtitle: string
  trendingTitle: string
  trendingSubtitle: string
  ctaTitle: string
  ctaDescription: string
}

export default function HomePage() {
  const [homePageContent, setHomePageContent] = useState<HomePageSettings>({
    heroTitle: "Elevated Luxury.\nTimeless Icons.",
    heroSubtitle:
      "Discover the world's most coveted handbags from Hermès and Louis Vuitton.\nWhere heritage meets contemporary elegance.",
    heroMedia: [
      {
        type: "image",
        url: "/placeholder.svg?height=1080&width=1920",
        alt: "Luxury handbags collection",
      },
    ],
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
    ctaDescription:
      "Become part of an exclusive community that appreciates the finest in luxury craftsmanship. Discover pieces that transcend trends and define timeless elegance.",
  })

  const [currentMediaIndex, setCurrentMediaIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load homepage settings from API
    const loadHomePageSettings = async () => {
      try {
        const response = await fetch("/api/homepage-settings")
        if (response.ok) {
          const settings = await response.json()
          setHomePageContent(settings)
        }
      } catch (error) {
        console.error("Failed to load homepage settings:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadHomePageSettings()

    // Listen for homepage settings updates from admin
    const handleSettingsUpdate = (event: CustomEvent) => {
      setHomePageContent(event.detail)
    }

    window.addEventListener("homepageSettingsUpdated", handleSettingsUpdate as EventListener)

    return () => {
      window.removeEventListener("homepageSettingsUpdated", handleSettingsUpdate as EventListener)
    }
  }, [])

  // Auto-advance carousel every 4 seconds
  useEffect(() => {
    if (homePageContent.heroMedia && homePageContent.heroMedia.length > 1) {
      const interval = setInterval(() => {
        setCurrentMediaIndex((prev) => (prev === homePageContent.heroMedia.length - 1 ? 0 : prev + 1))
      }, 4000)

      return () => clearInterval(interval)
    }
  }, [homePageContent.heroMedia])

  const featuredProducts = products.filter((p) => p.featured)
  const hermesProducts = products.filter((p) => p.category === "Hermès")
  const lvProducts = products.filter((p) => p.category === "Louis Vuitton")
  const trendingBags = products.filter((p) => p.newArrival).slice(0, 3)

  const nextMedia = () => {
    setCurrentMediaIndex((prev) => (prev === homePageContent.heroMedia.length - 1 ? 0 : prev + 1))
  }

  const prevMedia = () => {
    setCurrentMediaIndex((prev) => (prev === 0 ? homePageContent.heroMedia.length - 1 : prev - 1))
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
      },
    },
  }

  const currentMedia = homePageContent.heroMedia?.[currentMediaIndex] || homePageContent.heroMedia?.[0]

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gold-400 mx-auto mb-4"></div>
          <p className="text-charcoal-800">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section with Carousel */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          {currentMedia?.type === "video" ? (
            <video src={currentMedia.url} className="w-full h-full object-cover" autoPlay muted loop playsInline />
          ) : (
            <Image
              src={currentMedia?.url || "/placeholder.svg?height=1080&width=1920"}
              alt={currentMedia?.alt || "Luxury handbags"}
              fill
              className="object-cover"
              priority
            />
          )}
          <div className="absolute inset-0 bg-black bg-opacity-40" />
        </div>

        {/* Carousel Controls */}
        {homePageContent.heroMedia && homePageContent.heroMedia.length > 1 && (
          <>
            <button
              onClick={prevMedia}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
            >
              <ChevronLeft className="h-6 w-6 text-white" />
            </button>
            <button
              onClick={nextMedia}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
            >
              <ChevronRight className="h-6 w-6 text-white" />
            </button>

            {/* Carousel Indicators */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
              {homePageContent.heroMedia.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentMediaIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentMediaIndex ? "bg-white" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          </>
        )}

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative z-10 text-center text-white max-w-4xl mx-auto px-4"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-playfair text-5xl md:text-7xl font-bold mb-6"
          >
            {homePageContent.heroTitle.split("\n").map((line, index) => (
              <span key={index}>
                {line}
                {index < homePageContent.heroTitle.split("\n").length - 1 && <br />}
              </span>
            ))}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl md:text-2xl mb-8 text-cream-100"
          >
            {homePageContent.heroSubtitle.split("\n").map((line, index) => (
              <span key={index}>
                {line}
                {index < homePageContent.heroSubtitle.split("\n").length - 1 && <br />}
              </span>
            ))}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/products?category=Hermès">
              <Button
                size="lg"
                className="bg-gold-400 hover:bg-gold-500 text-charcoal-900 font-semibold px-8 py-3 text-lg"
              >
                Shop Hermès
              </Button>
            </Link>
            <Link href="/products?category=Louis Vuitton">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-charcoal-900 font-semibold px-8 py-3 text-lg bg-transparent"
              >
                Shop Louis Vuitton
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Brand Collections */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-playfair text-4xl font-bold text-charcoal-900 mb-4">Iconic Collections</h2>
          <p className="text-charcoal-800 text-lg max-w-2xl mx-auto">
            Explore the legendary craftsmanship of two of the world's most prestigious luxury houses
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Hermès Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-300">
              <div className="relative h-80">
                <Image
                  src={homePageContent.hermesImage || "/placeholder.svg?height=400&width=600"}
                  alt="Hermès Collection"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="font-playfair text-3xl font-bold mb-2">{homePageContent.hermesTitle}</h3>
                  <p className="text-lg mb-4">{homePageContent.hermesDescription}</p>
                  <Link href="/products?category=Hermès">
                    <Button
                      variant="outline"
                      className="border-white text-white hover:bg-white hover:text-charcoal-900 bg-transparent"
                    >
                      Explore Collection
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Louis Vuitton Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-300">
              <div className="relative h-80">
                <Image
                  src={homePageContent.lvImage || "/placeholder.svg?height=400&width=600"}
                  alt="Louis Vuitton Collection"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="font-playfair text-3xl font-bold mb-2">{homePageContent.lvTitle}</h3>
                  <p className="text-lg mb-4">{homePageContent.lvDescription}</p>
                  <Link href="/products?category=Louis Vuitton">
                    <Button
                      variant="outline"
                      className="border-white text-white hover:bg-white hover:text-charcoal-900 bg-transparent"
                    >
                      Explore Collection
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Shop by Icon */}
      <section className="py-16 bg-cream-100">
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-playfair text-4xl font-bold text-charcoal-900 mb-4">
              {homePageContent.shopByIconTitle}
            </h2>
            <p className="text-charcoal-800 text-lg">{homePageContent.shopByIconSubtitle}</p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {featuredProducts.map((product, index) => (
              <motion.div key={product.id} variants={itemVariants}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Trending Now */}
      {trendingBags.length > 0 && (
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-playfair text-4xl font-bold text-charcoal-900 mb-4">{homePageContent.trendingTitle}</h2>
            <p className="text-charcoal-800 text-lg">{homePageContent.trendingSubtitle}</p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {trendingBags.map((product, index) => (
              <motion.div key={product.id} variants={itemVariants}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="font-playfair text-4xl font-bold text-charcoal-900 mb-4">{homePageContent.ctaTitle}</h2>
          <p className="text-charcoal-800 text-lg mb-8 max-w-2xl mx-auto">{homePageContent.ctaDescription}</p>
          <Link href="/products">
            <Button
              size="lg"
              variant="outline"
              className="border-charcoal-900 text-charcoal-900 hover:bg-charcoal-900 hover:text-white bg-transparent"
            >
              View All Collections
            </Button>
          </Link>
        </motion.div>
      </section>

      <Footer />
    </div>
  )
}
