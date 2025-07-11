"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, ShoppingBag, Star, ArrowLeft, Share2, Truck, Shield, RotateCcw } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useCart } from "@/components/providers/CartProvider"
import { useWishlist } from "@/components/providers/WishlistProvider"
import { products as staticProducts } from "@/lib/data"

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()

  const [product, setProduct] = useState(null)
  const [relatedProducts, setRelatedProducts] = useState([])
  const [selectedColor, setSelectedColor] = useState("")
  const [selectedImage, setSelectedImage] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProduct = async () => {
      try {
        // First try to load from API
        const response = await fetch("/api/admin/products")
        if (response.ok) {
          const result = await response.json()
          if (result.data && result.data.length > 0) {
            const foundProduct = result.data.find((p) => p.id.toString() === params?.id)
            if (foundProduct) {
              setProduct(foundProduct)
              setSelectedColor(foundProduct.colors?.[0] || "")

              // Set related products from same category
              const related = result.data
                .filter((p) => p.category === foundProduct.category && p.id !== foundProduct.id)
                .slice(0, 4)
              setRelatedProducts(related)
            } else {
              // Fallback to static data
              const staticProduct = staticProducts.find((p) => p.id === params?.id)
              if (staticProduct) {
                setProduct(staticProduct)
                setSelectedColor(staticProduct.colors?.[0] || "")

                const related = staticProducts
                  .filter((p) => p.category === staticProduct.category && p.id !== staticProduct.id)
                  .slice(0, 4)
                setRelatedProducts(related)
              }
            }
          }
        } else {
          // Fallback to static data
          const staticProduct = staticProducts.find((p) => p.id === params?.id)
          if (staticProduct) {
            setProduct(staticProduct)
            setSelectedColor(staticProduct.colors?.[0] || "")

            const related = staticProducts
              .filter((p) => p.category === staticProduct.category && p.id !== staticProduct.id)
              .slice(0, 4)
            setRelatedProducts(related)
          }
        }
      } catch (error) {
        console.error("Failed to load product:", error)
        // Fallback to static data
        const staticProduct = staticProducts.find((p) => p.id === params?.id)
        if (staticProduct) {
          setProduct(staticProduct)
          setSelectedColor(staticProduct.colors?.[0] || "")

          const related = staticProducts
            .filter((p) => p.category === staticProduct.category && p.id !== staticProduct.id)
            .slice(0, 4)
          setRelatedProducts(related)
        }
      } finally {
        setLoading(false)
      }
    }

    if (params?.id) {
      loadProduct()
    }
  }, [params?.id])

  const handleWishlistToggle = () => {
    if (!product) return

    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  const handleAddToCart = () => {
    if (!product) return

    const productWithColor = {
      ...product,
      selectedColor,
    }
    addToCart(productWithColor)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold-400 mx-auto mb-4"></div>
          <p className="text-charcoal-800">Loading product...</p>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-semibold text-charcoal-900 mb-2">Product not found</h2>
          <p className="text-charcoal-800 mb-6">The product you're looking for doesn't exist.</p>
          <Button onClick={() => router.push("/products")} className="bg-charcoal-900 hover:bg-charcoal-800">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Products
          </Button>
        </div>
      </div>
    )
  }

  const productImages = product.images && product.images.length > 0 ? product.images : [product.image]

  return (
    <div className="min-h-screen bg-cream-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center space-x-2 text-sm text-charcoal-800 mb-8"
        >
          <Link href="/" className="hover:text-gold-600">
            Home
          </Link>
          <span>/</span>
          <Link href="/products" className="hover:text-gold-600">
            Products
          </Link>
          <span>/</span>
          <span className="text-charcoal-900 font-medium">{product.name}</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative aspect-square overflow-hidden rounded-lg bg-white">
                <Image
                  src={productImages[selectedImage] || "/placeholder.svg?height=600&width=600"}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
                {product.newArrival && (
                  <Badge className="absolute top-4 left-4 bg-gold-400 text-charcoal-900">New Arrival</Badge>
                )}
                {product.featured && (
                  <Badge className="absolute top-4 right-4 bg-charcoal-900 text-white">Featured</Badge>
                )}
              </div>

              {/* Thumbnail Images */}
              {productImages.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                  {productImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative aspect-square overflow-hidden rounded-lg border-2 transition-colors ${
                        selectedImage === index ? "border-gold-400" : "border-transparent"
                      }`}
                    >
                      <Image
                        src={image || "/placeholder.svg?height=150&width=150"}
                        alt={`${product.name} ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            {/* Header */}
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Badge variant="outline">{product.category}</Badge>
                {!product.inStock && <Badge variant="destructive">Out of Stock</Badge>}
              </div>
              <h1 className="font-playfair text-3xl md:text-4xl font-bold text-charcoal-900 mb-4">{product.name}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex text-gold-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <span className="text-charcoal-800">(4.9) • 127 reviews</span>
              </div>
              <p className="text-3xl font-bold text-charcoal-900">${product.price.toLocaleString()}</p>
            </div>

            {/* Description */}
            <div>
              <h3 className="font-semibold text-lg mb-2">Description</h3>
              <p className="text-charcoal-800 leading-relaxed">{product.description}</p>
            </div>

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <h3 className="font-semibold text-lg mb-3">Color</h3>
                <Select value={selectedColor} onValueChange={setSelectedColor}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a color" />
                  </SelectTrigger>
                  <SelectContent>
                    {product.colors.map((color) => (
                      <SelectItem key={color} value={color}>
                        {color}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Actions */}
            <div className="space-y-4">
              <div className="flex space-x-4">
                <Button
                  size="lg"
                  className="flex-1 bg-charcoal-900 hover:bg-charcoal-800"
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                >
                  <ShoppingBag className="h-5 w-5 mr-2" />
                  {product.inStock ? "Add to Cart" : "Out of Stock"}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={handleWishlistToggle}
                  className="border-charcoal-900 text-charcoal-900 hover:bg-charcoal-900 hover:text-white bg-transparent"
                >
                  <Heart className={`h-5 w-5 ${isInWishlist(product.id) ? "fill-red-500 text-red-500" : ""}`} />
                </Button>
                <Button size="lg" variant="outline">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Features */}
            <div className="border-t pt-6">
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center space-x-3">
                  <Truck className="h-5 w-5 text-gold-400" />
                  <span className="text-charcoal-800">Free shipping on orders over $500</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="h-5 w-5 text-gold-400" />
                  <span className="text-charcoal-800">Authenticity guaranteed</span>
                </div>
                <div className="flex items-center space-x-3">
                  <RotateCcw className="h-5 w-5 text-gold-400" />
                  <span className="text-charcoal-800">30-day return policy</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <motion.section initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h2 className="font-playfair text-3xl font-bold text-charcoal-900 mb-8 text-center">You Might Also Like</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((relatedProduct) => (
                <Card
                  key={relatedProduct.id}
                  className="group hover:shadow-xl transition-all duration-300 border-0 bg-white"
                >
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <Link href={`/products/${relatedProduct.id}`}>
                        <Image
                          src={relatedProduct.image || "/placeholder.svg?height=300&width=300"}
                          alt={relatedProduct.name}
                          width={300}
                          height={300}
                          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </Link>
                    </div>
                    <div className="p-6">
                      <Link href={`/products/${relatedProduct.id}`}>
                        <h3 className="font-semibold text-lg mb-2 text-charcoal-900 hover:text-gold-600 transition-colors">
                          {relatedProduct.name}
                        </h3>
                      </Link>
                      <p className="text-charcoal-800 text-sm mb-4">{relatedProduct.category}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-charcoal-900">
                          ${relatedProduct.price.toLocaleString()}
                        </span>
                        <Button
                          size="sm"
                          className="bg-charcoal-900 hover:bg-charcoal-800"
                          onClick={() => addToCart(relatedProduct)}
                        >
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.section>
        )}
      </div>
    </div>
  )
}
