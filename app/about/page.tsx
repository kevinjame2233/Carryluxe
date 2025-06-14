"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-cream-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-charcoal-900 mb-6">About CarryLuxe</h1>
          <p className="text-xl text-charcoal-800 max-w-3xl mx-auto">
            Crafting timeless luxury since 1985, we believe that true elegance lies in the perfect balance of heritage
            craftsmanship and contemporary design.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="font-playfair text-3xl font-bold text-charcoal-900 mb-6">Our Story</h2>
            <p className="text-charcoal-800 mb-4">
              Founded in the heart of Milan by master craftsman Alessandro Rossi, CarryLuxe began as a small atelier
              dedicated to creating exceptional leather goods for discerning clientele.
            </p>
            <p className="text-charcoal-800 mb-4">
              Over four decades, we have remained true to our founding principles: uncompromising quality, timeless
              design, and meticulous attention to detail. Each piece is carefully crafted by skilled artisans using
              traditional techniques passed down through generations.
            </p>
            <p className="text-charcoal-800">
              Today, CarryLuxe continues to set the standard for luxury accessories, combining heritage craftsmanship
              with contemporary innovation to create pieces that transcend trends and seasons.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative h-96 rounded-lg overflow-hidden"
          >
            <Image src="/placeholder.svg?height=400&width=600" alt="CarryLuxe atelier" fill className="object-cover" />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-white rounded-lg p-8 mb-16"
        >
          <h2 className="font-playfair text-3xl font-bold text-charcoal-900 mb-8 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="font-semibold text-xl text-charcoal-900 mb-4">Craftsmanship</h3>
              <p className="text-charcoal-800">
                Every piece is meticulously handcrafted by skilled artisans using time-honored techniques and the finest
                materials.
              </p>
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-xl text-charcoal-900 mb-4">Sustainability</h3>
              <p className="text-charcoal-800">
                We are committed to responsible sourcing and sustainable practices, ensuring our luxury doesn't come at
                the expense of our planet.
              </p>
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-xl text-charcoal-900 mb-4">Excellence</h3>
              <p className="text-charcoal-800">
                We never compromise on quality, ensuring that every CarryLuxe piece meets our exacting standards of
                excellence.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center"
        >
          <h2 className="font-playfair text-3xl font-bold text-charcoal-900 mb-6">Visit Our Flagship Store</h2>
          <p className="text-charcoal-800 mb-4">
            Experience the full CarryLuxe collection at our flagship boutique in Beverly Hills.
          </p>
          <p className="text-charcoal-800 font-semibold">123 Luxury Lane, Beverly Hills, CA 90210</p>
          <p className="text-charcoal-800">Open Monday - Saturday: 10AM - 8PM | Sunday: 12PM - 6PM</p>
        </motion.div>
      </div>
    </div>
  )
}
