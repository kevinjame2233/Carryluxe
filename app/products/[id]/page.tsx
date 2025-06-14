"use client"

import { useState } from "react"
import Image from "next/image"
import { Heart, ShoppingBag, Star, Truck, Shield, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import ProductCard from "@/components/ProductCard"
import Footer from "@/components/layout/Footer"
import { products } from "@/lib/data"
import { useWishlist } from "@/components/providers/WishlistProvider"
import { useCart } from "@/components/providers/CartProvider"
import { motion } from "framer-motion"

interface ProductDetailPageProps {
  params: {
    id: string
  }
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const product = products.find((p) => p.id === params.id)
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedColor, setSelectedColor] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState("")

  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const { addToCart } = useCart()
  const isWishlisted = product ? isInWishlist(product.id) : false

  if (!product) {
    return <div>Product not found</div>
  }

  const relatedProducts = products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4)

  const handleWishlistToggle = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id)
      setAlertMessage("Removed from wishlist")
    } else {
      addToWishlist(product)
      setAlertMessage("Added to wishlist")
    }
    setShowAlert(true)
    setTimeout(() => setShowAlert(false), 3000)
  }

  const handleAddToCart = () => {
    if (!product.inStock) {
      setAlertMessage("Product is out of stock")
      setShowAlert(true)
      setTimeout(() => setShowAlert(false), 3000)
      return
    }

    const selectedColorValue = selectedColor || product.colors[0]
    addToCart({
      id: Date.now().toString(),
      product,
      quantity,
      color: selectedColorValue,
    })
    setAlertMessage(`Added ${quantity} ${product.name} to cart`)
    setShowAlert(true)
    setTimeout(() => setShowAlert(false), 3000)
  }

  const handleBuyNow = () => {
    if (!product.inStock) {
      setAlertMessage("Product is out of stock")
      setShowAlert(true)
      setTimeout(() => setShowAlert(false), 3000)
      return
    }

    const selectedColorValue = selectedColor || product.colors[0]
    addToCart({
      id: Date.now().toString(),
      product,
      quantity,
      color: selectedColorValue,
    })

    // Redirect to checkout
    window.location.href = "/checkout"
  }

  return (
    <div className="min-h-screen bg-cream-50">
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square relative overflow-hidden rounded-lg bg-white">
              <Image
                src={product.images[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square relative overflow-hidden rounded-lg bg-white border-2 ${
                    selectedImage === index ? "border-gold-400" : "border-transparent"
                  }`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="font-playfair text-3xl font-bold text-charcoal-900 mb-2">{product.name}</h1>
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-gold-400 text-gold-400" />
                  ))}
                </div>
                <span className="text-sm text-charcoal-800">(24 reviews)</span>
              </div>
              <p className="text-3xl font-bold text-charcoal-900">${product.price.toLocaleString()}</p>
            </div>

            <p className="text-charcoal-800 leading-relaxed">{product.description}</p>

            {/* Color Selection */}
            <div>
              <h3 className="font-semibold text-charcoal-900 mb-3">Color</h3>
              <div className="flex space-x-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full border-2 ${
                      selectedColor === color ? "border-charcoal-900" : "border-gray-300"
                    }`}
                    style={{ backgroundColor: color.toLowerCase() }}
                    title={color}
                  />
                ))}
              </div>
              {selectedColor && <p className="text-sm text-charcoal-800 mt-2">Selected: {selectedColor}</p>}
            </div>

            {/* Quantity */}
            <div>
              <h3 className="font-semibold text-charcoal-900 mb-3">Quantity</h3>
              <Select value={quantity.toString()} onValueChange={(value) => setQuantity(Number.parseInt(value))}>
                <SelectTrigger className="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Actions */}
            <div className="space-y-4">
              <div className="flex space-x-4">
                <Button
                  size="lg"
                  className="flex-1 bg-charcoal-900 hover:bg-charcoal-800"
                  disabled={!product.inStock}
                  onClick={handleAddToCart}
                >
                  <ShoppingBag className="h-5 w-5 mr-2" />
                  {product.inStock ? "Add to Cart" : "Out of Stock"}
                </Button>
                <Button size="lg" variant="outline" onClick={handleWishlistToggle}>
                  <Heart className={`h-5 w-5 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
                </Button>
              </div>

              <Button variant="outline" size="lg" className="w-full" disabled={!product.inStock} onClick={handleBuyNow}>
                Buy Now
              </Button>
            </div>

            {/* Features */}
            <div className="border-t border-cream-200 pt-6 space-y-4">
              <div className="flex items-center space-x-3">
                <Truck className="h-5 w-5 text-gold-400" />
                <span className="text-sm text-charcoal-800">Free shipping on orders over $500</span>
              </div>
              <div className="flex items-center space-x-3">
                <Shield className="h-5 w-5 text-gold-400" />
                <span className="text-sm text-charcoal-800">2-year warranty included</span>
              </div>
              <div className="flex items-center space-x-3">
                <RotateCcw className="h-5 w-5 text-gold-400" />
                <span className="text-sm text-charcoal-800">30-day return policy</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="font-playfair text-3xl font-bold text-charcoal-900 mb-8 text-center">You May Also Like</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
