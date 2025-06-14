"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import ProductCard from "@/components/ProductCard"
import Footer from "@/components/layout/Footer"
import { products } from "@/lib/data"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { useState, useEffect } from "react"

export default function HomePage() {
  const [homePageContent, setHomePageContent] = useState({
    heroTitle: "Elevated Luxury.\nTimeless Icons.",
    heroSubtitle:
      "Discover the world's most coveted handbags from Hermès and Louis Vuitton.\nWhere heritage meets contemporary elegance.",
    heroImage: "/placeholder.svg?height=1080&width=1920",
    heroVideo: "",
    useVideo: false,
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

  useEffect(() => {
    // Load saved homepage settings
    const savedSettings = localStorage.getItem("carryluxe-homepage-settings")
    if (savedSettings) {
      try {
        setHomePageContent(JSON.parse(savedSettings))
      } catch (e) {
        console.error("Failed to parse homepage settings", e)
      }
    }

    // Listen for homepage settings updates
    const handleSettingsUpdate = (event) => {
      setHomePageContent(event.detail)
    }

    window.addEventListener("homepageSettingsUpdated", handleSettingsUpdate)

    return () => {
      window.removeEventListener("homepageSettingsUpdated", handleSettingsUpdate)
    }
  }, [])

  const featuredProducts = products.filter((p) => p.featured)
  const hermesProducts = products.filter((p) => p.category === "Hermès")
  const lvProducts = products.filter((p) => p.category === "Louis Vuitton")
  const trendingBags = products.filter((p) => p.newArrival).slice(0, 3)

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

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          {homePageContent.useVideo && homePageContent.heroVideo ? (
            <video
              src={homePageContent.heroVideo}
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
            />
          ) : (
            <Image
              src={homePageContent.heroImage || "/placeholder.svg?height=1080&width=1920"}
              alt="Luxury handbags"
              fill
              className="object-cover"
              priority
            />
          )}
          <div className="absolute inset-0 bg-black bg-opacity-40" />
        </div>

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
                className="border-white text-white hover:bg-white hover:text-charcoal-900 font-semibold px-8 py-3 text-lg"
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
                      className="border-white text-white hover:bg-white hover:text-charcoal-900"
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
                      className="border-white text-white hover:bg-white hover:text-charcoal-900"
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
              className="border-charcoal-900 text-charcoal-900 hover:bg-charcoal-900 hover:text-white"
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
