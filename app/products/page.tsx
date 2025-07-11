"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Heart, ShoppingBag, Star, Search } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useCart } from "@/components/providers/CartProvider"
import { useWishlist } from "@/components/providers/WishlistProvider"
import { products as staticProducts } from "@/lib/data"

function ProductsContent() {
  const searchParams = useSearchParams()
  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()

  const [products, setProducts] = useState(staticProducts)
  const [filteredProducts, setFilteredProducts] = useState(staticProducts)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState(searchParams?.get("category") || "all")
  const [sortBy, setSortBy] = useState("name")

  // Load products from API
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetch("/api/admin/products")
        if (response.ok) {
          const result = await response.json()
          if (result.data && result.data.length > 0) {
            setProducts(result.data)
            setFilteredProducts(result.data)
          }
        }
      } catch (error) {
        console.error("Failed to load products:", error)
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  // Filter and sort products
  useEffect(() => {
    let filtered = [...products]

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((product) => product.category === selectedCategory)
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "name":
          return a.name.localeCompare(b.name)
        default:
          return 0
      }
    })

    setFilteredProducts(filtered)
  }, [products, searchTerm, selectedCategory, sortBy])

  const handleWishlistToggle = (product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  const categories = ["all", ...new Set(products.map((product) => product.category))]

  if (loading) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold-400 mx-auto mb-4"></div>
          <p className="text-charcoal-800">Loading products...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-charcoal-900 mb-4">Luxury Collection</h1>
          <p className="text-xl text-charcoal-800 max-w-2xl mx-auto">
            Discover our curated selection of the world's most coveted handbags
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-lg shadow-sm p-6 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search products..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Category Filter */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>

            {/* Results Count */}
            <div className="flex items-center justify-center md:justify-start">
              <span className="text-sm text-charcoal-800">
                {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""} found
              </span>
            </div>
          </div>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden">
                    <Link href={`/products/${product.id}`}>
                      <Image
                        src={product.image || "/placeholder.svg?height=300&width=300"}
                        alt={product.name}
                        width={300}
                        height={300}
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </Link>
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
                    {product.featured && (
                      <Badge className="absolute top-4 left-4 bg-charcoal-900 text-white">Featured</Badge>
                    )}
                    {!product.inStock && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <Badge variant="destructive">Out of Stock</Badge>
                      </div>
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
                    <Link href={`/products/${product.id}`}>
                      <h3 className="font-semibold text-lg mb-2 text-charcoal-900 hover:text-gold-600 transition-colors">
                        {product.name}
                      </h3>
                    </Link>
                    <p className="text-charcoal-800 text-sm mb-2">{product.category}</p>
                    <p className="text-charcoal-800 text-sm mb-4 line-clamp-2">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-charcoal-900">${product.price.toLocaleString()}</span>
                      <Button
                        size="sm"
                        className="bg-charcoal-900 hover:bg-charcoal-800"
                        onClick={() => addToCart(product)}
                        disabled={!product.inStock}
                      >
                        <ShoppingBag className="h-4 w-4 mr-2" />
                        {product.inStock ? "Add to Cart" : "Out of Stock"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {filteredProducts.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-semibold text-charcoal-900 mb-2">No products found</h3>
            <p className="text-charcoal-800 mb-6">Try adjusting your search or filter criteria</p>
            <Button
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("all")
                setSortBy("name")
              }}
              className="bg-charcoal-900 hover:bg-charcoal-800"
            >
              Clear Filters
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-cream-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold-400 mx-auto mb-4"></div>
            <p className="text-charcoal-800">Loading...</p>
          </div>
        </div>
      }
    >
      <ProductsContent />
    </Suspense>
  )
}
