"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, ShoppingBag, ChevronLeft, ChevronRight, Star, Shield, Truck, RotateCcw } from "lucide-react"
import { useWishlist } from "@/components/providers/WishlistProvider"
import { useCart } from "@/components/providers/CartProvider"
import { products } from "@/lib/data"
import { motion, AnimatePresence } from "framer-motion"
import Footer from "@/components/layout/Footer"
import ProductCard from "@/components/ProductCard"
import { Label } from "@/components/ui/label"

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const { addToCart } = useCart()

  const [product, setProduct] = useState(null)
  const [selectedColor, setSelectedColor] = useState("")
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState("")

  useEffect(() => {
    // Load products from localStorage or use default
    const savedProducts = localStorage.getItem("carryluxe-products")
    const allProducts = savedProducts ? JSON.parse(savedProducts) : products

    const foundProduct = allProducts.find((p) => p.id === params.id)
    if (foundProduct) {
      setProduct(foundProduct)
      setSelectedColor(foundProduct.colors[0])
    }
  }, [params.id])

  if (!product) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-charcoal-900 mb-4">Product Not Found</h1>
          <Link href="/products">
            <Button>Back to Products</Button>
          </Link>
        </div>
      </div>
    )
  }

  const isWishlisted = isInWishlist(product.id)
  const relatedProducts = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)
  const productImages = product.images && product.images.length > 0 ? product.images : [product.image]

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
      quantity,
      color: selectedColor,
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
      quantity,
      color: selectedColor,
    })

    // Redirect to checkout
    router.push("/checkout")
  }

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev === productImages.length - 1 ? 0 : prev + 1))
  }

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev === 0 ? productImages.length - 1 : prev - 1))
  }

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Alert */}
      <AnimatePresence>
        {showAlert && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-20 right-4 z-50 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg"
          >
            {alertMessage}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center space-x-2 text-sm text-charcoal-800 mb-8"
        >
          <Link href="/" className="hover:text-gold-400">
            Home
          </Link>
          <span>/</span>
          <Link href="/products" className="hover:text-gold-400">
            Products
          </Link>
          <span>/</span>
          <Link href={`/products?category=${product.category}`} className="hover:text-gold-400">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-charcoal-900 font-medium">{product.name}</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            {/* Main Image */}
            <div className="relative aspect-square bg-white rounded-lg overflow-hidden mb-4 group">
              <Image
                src={productImages[selectedImageIndex] || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />

              {/* Image Navigation */}
              {productImages.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}

              {/* Badges */}
              <div className="absolute top-4 left-4 space-y-2">
                {product.newArrival && <Badge className="bg-gold-400 text-charcoal-900">New Arrival</Badge>}
                {product.featured && <Badge className="bg-charcoal-900 text-white">Featured</Badge>}
                {!product.inStock && <Badge variant="destructive">Out of Stock</Badge>}
              </div>

              {/* Wishlist Button */}
              <button
                onClick={handleWishlistToggle}
                className="absolute top-4 right-4 bg-white/80 hover:bg-white rounded-full p-2 transition-colors"
              >
                <Heart className={`h-5 w-5 ${isWishlisted ? "fill-red-500 text-red-500" : "text-charcoal-900"}`} />
              </button>
            </div>

            {/* Thumbnail Images */}
            {productImages.length > 1 && (
              <div className="grid grid-cols-5 gap-2">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative aspect-square bg-white rounded overflow-hidden border-2 transition-colors ${
                      index === selectedImageIndex ? "border-gold-400" : "border-transparent hover:border-cream-300"
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
            )}
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div>
              <p className="text-sm text-charcoal-800 mb-2">{product.category}</p>
              <h1 className="font-playfair text-3xl font-bold text-charcoal-900 mb-4">{product.name}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <span className="text-3xl font-bold text-charcoal-900">${product.price.toLocaleString()}</span>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-gold-400 text-gold-400" />
                  ))}
                  <span className="text-sm text-charcoal-800 ml-2">(127 reviews)</span>
                </div>
              </div>
            </div>

            <div className="prose prose-sm text-charcoal-800">
              <p>{product.description}</p>
            </div>

            {/* Color Selection */}
            <div>
              <Label className="text-sm font-medium text-charcoal-900 mb-3 block">Color: {selectedColor}</Label>
              <div className="flex space-x-3">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${
                      selectedColor === color
                        ? "border-charcoal-900 scale-110"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                    style={{ backgroundColor: color.toLowerCase() }}
                    title={color}
                  />
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <Label className="text-sm font-medium text-charcoal-900 mb-3 block">Quantity</Label>
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

            {/* Action Buttons */}
            <div className="space-y-4">
              <Button
                onClick={handleBuyNow}
                size="lg"
                className="w-full bg-charcoal-900 hover:bg-charcoal-800 text-white"
                disabled={!product.inStock}
              >
                <ShoppingBag className="h-5 w-5 mr-2" />
                {product.inStock ? "Buy Now" : "Out of Stock"}
              </Button>

              <Button
                onClick={handleAddToCart}
                size="lg"
                variant="outline"
                className="w-full border-charcoal-900 text-charcoal-900 hover:bg-charcoal-900 hover:text-white bg-transparent"
                disabled={!product.inStock}
              >
                Add to Cart
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-cream-200">
              <div className="flex items-center space-x-3">
                <Shield className="h-5 w-5 text-gold-400" />
                <span className="text-sm text-charcoal-800">Authenticity Guaranteed</span>
              </div>
              <div className="flex items-center space-x-3">
                <Truck className="h-5 w-5 text-gold-400" />
                <span className="text-sm text-charcoal-800">Free Shipping</span>
              </div>
              <div className="flex items-center space-x-3">
                <RotateCcw className="h-5 w-5 text-gold-400" />
                <span className="text-sm text-charcoal-800">30-Day Returns</span>
              </div>
              <div className="flex items-center space-x-3">
                <Star className="h-5 w-5 text-gold-400" />
                <span className="text-sm text-charcoal-800">Premium Quality</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16"
          >
            <h2 className="font-playfair text-2xl font-bold text-charcoal-900 mb-8">You May Also Like</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </motion.section>
        )}
      </div>

      <Footer />
    </div>
  )
}
