"use client"

import { Heart, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import ProductCard from "@/components/ProductCard"
import { useWishlist } from "@/components/providers/WishlistProvider"
import { motion } from "framer-motion"
import Link from "next/link"

export default function WishlistPage() {
  const { wishlistItems, clearWishlist } = useWishlist()

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

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-cream-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center py-16"
          >
            <Heart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h1 className="font-playfair text-3xl font-bold text-charcoal-900 mb-4">Your wishlist is empty</h1>
            <p className="text-charcoal-800 mb-8">Save items you love to your wishlist</p>
            <Link href="/products">
              <Button size="lg" className="bg-charcoal-900 hover:bg-charcoal-800">
                <ShoppingBag className="h-4 w-4 mr-2" />
                Continue Shopping
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-between items-center mb-8"
        >
          <div>
            <h1 className="font-playfair text-3xl font-bold text-charcoal-900 mb-2">My Wishlist</h1>
            <p className="text-charcoal-800">{wishlistItems.length} items saved</p>
          </div>
          {wishlistItems.length > 0 && (
            <Button variant="outline" onClick={clearWishlist}>
              Clear All
            </Button>
          )}
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {wishlistItems.map((product, index) => (
            <motion.div key={product.id} variants={itemVariants}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
