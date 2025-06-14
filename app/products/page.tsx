"use client"

import { useState, useMemo, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Filter, Grid, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import ProductCard from "@/components/ProductCard"
import Footer from "@/components/layout/Footer"
import { products } from "@/lib/data"
import { motion } from "framer-motion"

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("name")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)

  // Get search and category from URL params
  const searchQuery = searchParams.get("search") || ""
  const categoryParam = searchParams.get("category") || ""

  useEffect(() => {
    if (categoryParam) {
      setSelectedCategories([categoryParam])
    }
  }, [categoryParam])

  const categories = ["Hermès", "Louis Vuitton"]

  const filteredProducts = useMemo(() => {
    let filtered = products

    // Apply category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product) => selectedCategories.includes(product.category))
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter((product) => {
        const nameMatch = product.name.toLowerCase().includes(query)
        const categoryMatch = product.category.toLowerCase().includes(query)

        // Search for specific bag models and sizes
        const modelMatch =
          (query.includes("birkin") && product.name.toLowerCase().includes("birkin")) ||
          (query.includes("kelly") && product.name.toLowerCase().includes("kelly")) ||
          (query.includes("speedy") && product.name.toLowerCase().includes("speedy")) ||
          (query.includes("neverfull") && product.name.toLowerCase().includes("neverfull")) ||
          (query.includes("capucines") && product.name.toLowerCase().includes("capucines")) ||
          (query.includes("constance") && product.name.toLowerCase().includes("constance")) ||
          (query.includes("evelyne") && product.name.toLowerCase().includes("evelyne")) ||
          (query.includes("lindy") && product.name.toLowerCase().includes("lindy")) ||
          (query.includes("twist") && product.name.toLowerCase().includes("twist")) ||
          (query.includes("alma") && product.name.toLowerCase().includes("alma")) ||
          (query.includes("onthego") && product.name.toLowerCase().includes("onthego"))

        // Search for sizes
        const sizeMatch =
          (query.includes("30") && product.name.includes("30")) ||
          (query.includes("25") && product.name.includes("25")) ||
          (query.includes("24") && product.name.includes("24")) ||
          (query.includes("33") && product.name.includes("33")) ||
          (query.includes("mm") && product.name.includes("MM")) ||
          (query.includes("pm") && product.name.includes("PM"))

        return nameMatch || categoryMatch || modelMatch || sizeMatch
      })
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "name":
        default:
          return a.name.localeCompare(b.name)
      }
    })

    return filtered
  }, [selectedCategories, searchQuery, sortBy])

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
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
            {searchQuery
              ? `Search Results for "${searchQuery}"`
              : categoryParam
                ? `${categoryParam} Collection`
                : "Luxury Collections"}
          </h1>
          <p className="text-charcoal-800 text-lg">
            {searchQuery
              ? `Found ${filteredProducts.length} results`
              : categoryParam
                ? `Discover the finest ${categoryParam} handbags`
                : "Discover the world's most coveted handbags from Hermès and Louis Vuitton"}
          </p>
        </motion.div>

        {/* Filters and Sort */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 space-y-4 lg:space-y-0">
          <div className="flex items-center space-x-4">
            <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="lg:hidden">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>

            <div className="flex items-center space-x-2">
              <span className="text-sm text-charcoal-800">View:</span>
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
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-sm text-charcoal-800">Sort by:</span>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className={`lg:w-64 space-y-6 ${showFilters ? "block" : "hidden lg:block"}`}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white p-6 rounded-lg shadow-sm"
            >
              <h3 className="font-semibold text-charcoal-900 mb-4">Maisons</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={category}
                      checked={selectedCategories.includes(category)}
                      onCheckedChange={() => toggleCategory(category)}
                    />
                    <label htmlFor={category} className="text-sm text-charcoal-800 font-medium">
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Popular Searches */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white p-6 rounded-lg shadow-sm"
            >
              <h3 className="font-semibold text-charcoal-900 mb-4">Popular Searches</h3>
              <div className="space-y-2">
                {["Birkin 30", "Kelly 25", "Neverfull MM", "Speedy 30", "Capucines MM"].map((search) => (
                  <button
                    key={search}
                    onClick={() => (window.location.href = `/products?search=${encodeURIComponent(search)}`)}
                    className="block text-sm text-charcoal-800 hover:text-gold-400 transition-colors"
                  >
                    {search}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="mb-4">
              <p className="text-sm text-charcoal-800">
                Showing {filteredProducts.length} of {products.length} products
              </p>
            </div>

            {filteredProducts.length > 0 ? (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className={`grid gap-6 ${
                  viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
                }`}
              >
                {filteredProducts.map((product, index) => (
                  <motion.div key={product.id} variants={itemVariants}>
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center py-12"
              >
                <p className="text-charcoal-800 text-lg mb-4">
                  {searchQuery ? `No results found for "${searchQuery}"` : "No products found matching your criteria."}
                </p>
                <p className="text-charcoal-600 mb-6">
                  Try searching for specific models like "Birkin", "Kelly", "Neverfull", or "Speedy"
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedCategories([])
                    window.location.href = "/products"
                  }}
                >
                  View All Products
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
