"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { Search, Grid, List, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import ProductCard from "@/components/ProductCard"
import Footer from "@/components/layout/Footer"
import { products as initialProducts } from "@/lib/data"

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const [products, setProducts] = useState(initialProducts)
  const [filteredProducts, setFilteredProducts] = useState(initialProducts)
  const [searchQuery, setSearchQuery] = useState(searchParams?.get("search") || "")
  const [selectedCategory, setSelectedCategory] = useState(searchParams?.get("category") || "all")
  const [sortBy, setSortBy] = useState("name")
  const [priceRange, setPriceRange] = useState("all")
  const [inStockOnly, setInStockOnly] = useState(false)
  const [viewMode, setViewMode] = useState("grid")
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    // Load products from localStorage if available
    const savedProducts = localStorage.getItem("carryluxe-products")
    if (savedProducts) {
      try {
        const parsedProducts = JSON.parse(savedProducts)
        setProducts(parsedProducts)
        setFilteredProducts(parsedProducts)
      } catch (e) {
        console.error("Failed to parse saved products", e)
      }
    }
  }, [])

  useEffect(() => {
    let filtered = [...products]

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter((product) => product.category === selectedCategory)
    }

    // Price range filter
    if (priceRange !== "all") {
      switch (priceRange) {
        case "under-5000":
          filtered = filtered.filter((product) => product.price < 5000)
          break
        case "5000-10000":
          filtered = filtered.filter((product) => product.price >= 5000 && product.price < 10000)
          break
        case "10000-20000":
          filtered = filtered.filter((product) => product.price >= 10000 && product.price < 20000)
          break
        case "over-20000":
          filtered = filtered.filter((product) => product.price >= 20000)
          break
      }
    }

    // Stock filter
    if (inStockOnly) {
      filtered = filtered.filter((product) => product.inStock)
    }

    // Sort
    switch (sortBy) {
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "newest":
        filtered.sort((a, b) => (b.newArrival ? 1 : 0) - (a.newArrival ? 1 : 0))
        break
    }

    setFilteredProducts(filtered)
  }, [products, searchQuery, selectedCategory, sortBy, priceRange, inStockOnly])

  const categories = ["all", ...Array.from(new Set(products.map((p) => p.category)))]

  return (
    <div className="min-h-screen bg-cream-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="font-playfair text-4xl font-bold text-charcoal-900 mb-4">
            {selectedCategory === "all" ? "All Products" : selectedCategory}
          </h1>
          <p className="text-charcoal-800">Discover our curated collection of luxury handbags</p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search bags... (e.g., 'Birkin 30', 'LV Speedy', 'Kelly')"
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Quick Category Buttons */}
            <div className="flex space-x-2">
              <Button
                variant={selectedCategory === "all" ? "default" : "outline"}
                onClick={() => setSelectedCategory("all")}
                className={selectedCategory === "all" ? "bg-charcoal-900" : ""}
              >
                All
              </Button>
              <Button
                variant={selectedCategory === "Hermès" ? "default" : "outline"}
                onClick={() => setSelectedCategory("Hermès")}
                className={selectedCategory === "Hermès" ? "bg-charcoal-900" : ""}
              >
                Hermès
              </Button>
              <Button
                variant={selectedCategory === "Louis Vuitton" ? "default" : "outline"}
                onClick={() => setSelectedCategory("Louis Vuitton")}
                className={selectedCategory === "Louis Vuitton" ? "bg-charcoal-900" : ""}
              >
                Louis Vuitton
              </Button>
            </div>

            {/* Filter Toggle */}
            <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="lg:hidden">
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>

          {/* Advanced Filters */}
          <div className={`grid grid-cols-1 lg:grid-cols-5 gap-4 ${showFilters ? "block" : "hidden lg:grid"}`}>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name A-Z</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="newest">Newest First</SelectItem>
              </SelectContent>
            </Select>

            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger>
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="under-5000">Under $5,000</SelectItem>
                <SelectItem value="5000-10000">$5,000 - $10,000</SelectItem>
                <SelectItem value="10000-20000">$10,000 - $20,000</SelectItem>
                <SelectItem value="over-20000">Over $20,000</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center space-x-2">
              <Checkbox id="inStock" checked={inStockOnly} onCheckedChange={setInStockOnly} />
              <Label htmlFor="inStock" className="text-sm">
                In Stock Only
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>

            <div className="text-sm text-charcoal-800 flex items-center">
              {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""} found
            </div>
          </div>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-charcoal-900 mb-2">No products found</h3>
              <p className="text-charcoal-800 mb-4">Try adjusting your search or filters</p>
              <Button
                onClick={() => {
                  setSearchQuery("")
                  setSelectedCategory("all")
                  setPriceRange("all")
                  setInStockOnly(false)
                }}
              >
                Clear All Filters
              </Button>
            </div>
          ) : (
            <div
              className={`grid gap-6 ${
                viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"
              }`}
            >
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  {viewMode === "grid" ? (
                    <ProductCard product={product} />
                  ) : (
                    <Card className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="flex">
                          <div className="w-48 h-48 bg-cream-100 flex-shrink-0">
                            <img
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 p-6">
                            <div className="flex justify-between items-start mb-4">
                              <div>
                                <h3 className="font-playfair text-xl font-semibold text-charcoal-900 mb-2">
                                  {product.name}
                                </h3>
                                <p className="text-charcoal-800 mb-2">{product.category}</p>
                                <p className="text-sm text-charcoal-600 mb-4">{product.description}</p>
                              </div>
                              <div className="text-right">
                                <p className="text-2xl font-bold text-charcoal-900 mb-2">
                                  ${product.price.toLocaleString()}
                                </p>
                                {!product.inStock && <span className="text-red-500 text-sm">Out of Stock</span>}
                              </div>
                            </div>
                            <div className="flex justify-between items-center">
                              <div className="flex space-x-1">
                                {product.colors.slice(0, 3).map((color, index) => (
                                  <div
                                    key={index}
                                    className="w-4 h-4 rounded-full border border-gray-300"
                                    style={{ backgroundColor: color.toLowerCase() }}
                                  />
                                ))}
                                {product.colors.length > 3 && (
                                  <span className="text-xs text-gray-500">+{product.colors.length - 3}</span>
                                )}
                              </div>
                              <Button size="sm" disabled={!product.inStock}>
                                {product.inStock ? "View Details" : "Out of Stock"}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      <Footer />
    </div>
  )
}
