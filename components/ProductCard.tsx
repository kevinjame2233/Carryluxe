"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingBag, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import type { Product } from "@/lib/types"
import { useWishlist } from "@/components/providers/WishlistProvider"
import { useCart } from "@/components/providers/CartProvider"
import { motion } from "framer-motion"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState("")
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const { addToCart } = useCart()
  const isWishlisted = isInWishlist(product.id)

  const handleWishlistToggle = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id)
      setAlertMessage("Removed from wishlist")
    } else {
      addToWishlist(product)
      setAlertMessage("Added to wishlist")
    }
    setShowAlert(true)
    setTimeout(() => setShowAlert(false), 2000)
  }

  const handleAddToCart = () => {
    if (!product.inStock) {
      setAlertMessage("Product is out of stock")
      setShowAlert(true)
      setTimeout(() => setShowAlert(false), 2000)
      return
    }

    addToCart({
      id: Date.now().toString(),
      product,
      quantity: 1,
      color: product.colors[0],
    })
    setAlertMessage("Added to cart")
    setShowAlert(true)
    setTimeout(() => setShowAlert(false), 2000)
  }

  const handleBuyNow = () => {
    if (!product.inStock) {
      setAlertMessage("Product is out of stock")
      setShowAlert(true)
      setTimeout(() => setShowAlert(false), 2000)
      return
    }

    // Add to cart first
    addToCart({
      id: Date.now().toString(),
      product,
      quantity: 1,
      color: product.colors[0],
    })

    // Redirect to checkout
    window.location.href = "/checkout"
  }

  return (
    <div className="relative">
      {showAlert && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-4 right-4 z-50"
        >
          <Alert className="bg-green-50 border-green-200">
            <AlertDescription className="text-green-800">{alertMessage}</AlertDescription>
          </Alert>
        </motion.div>
      )}

      <motion.div
        whileHover={{ y: -5 }}
        transition={{ duration: 0.3 }}
        className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {/* Overlay buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center space-x-2"
          >
            <Link href={`/products/${product.id}`}>
              <Button size="sm" variant="secondary" className="bg-white hover:bg-cream-100">
                <Eye className="h-4 w-4 mr-1" />
                Quick View
              </Button>
            </Link>
            <Button
              size="sm"
              className="bg-charcoal-900 hover:bg-charcoal-800 text-white"
              onClick={handleBuyNow}
              disabled={!product.inStock}
            >
              <ShoppingBag className="h-4 w-4 mr-1" />
              Buy Now
            </Button>
          </motion.div>

          {/* Wishlist button */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: isHovered ? 1 : 0 }} transition={{ duration: 0.3 }}>
            <Button
              size="icon"
              variant="ghost"
              className="absolute top-2 right-2 bg-white hover:bg-cream-100"
              onClick={handleWishlistToggle}
            >
              <Heart className={`h-4 w-4 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
            </Button>
          </motion.div>

          {/* Badges */}
          <div className="absolute top-2 left-2 space-y-1">
            {product.newArrival && <span className="bg-gold-400 text-white text-xs px-2 py-1 rounded">New</span>}
            {!product.inStock && <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">Sold Out</span>}
          </div>
        </div>

        <div className="p-4">
          <Link href={`/products/${product.id}`}>
            <h3 className="font-playfair text-lg font-semibold text-charcoal-900 hover:text-gold-400 transition-colors">
              {product.name}
            </h3>
          </Link>
          <p className="text-charcoal-800 mt-1">${product.price.toLocaleString()}</p>

          {/* Color options */}
          <div className="flex space-x-1 mt-2">
            {product.colors.slice(0, 3).map((color, index) => (
              <div
                key={index}
                className="w-4 h-4 rounded-full border border-gray-300"
                style={{ backgroundColor: color.toLowerCase() }}
              />
            ))}
            {product.colors.length > 3 && <span className="text-xs text-gray-500">+{product.colors.length - 3}</span>}
          </div>

          {/* Action buttons */}
          <div className="flex space-x-2 mt-4">
            <Button
              size="sm"
              variant="outline"
              className="flex-1"
              onClick={handleAddToCart}
              disabled={!product.inStock}
            >
              <ShoppingBag className="h-4 w-4 mr-1" />
              {product.inStock ? "Add to Cart" : "Out of Stock"}
            </Button>
            <Button size="sm" variant="ghost" onClick={handleWishlistToggle}>
              <Heart className={`h-4 w-4 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
