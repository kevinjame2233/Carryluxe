"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  BarChart3,
  Package,
  Users,
  DollarSign,
  Plus,
  Edit,
  Trash2,
  Search,
  Eye,
  LinkIcon,
  Phone,
  Mail,
  MapPin,
  Instagram,
  Facebook,
  Twitter,
  X,
  ImageIcon,
  Video,
  Cloud,
} from "lucide-react"
import { products as initialProducts, orders, users as initialUsers } from "@/lib/data"
import { motion } from "framer-motion"
import { useAuth } from "@/components/providers/AuthProvider"
import { useRouter } from "next/navigation"
import Image from "next/image"
import AdminLayout from "@/components/admin/AdminLayout"
import SaveButton from "@/components/admin/SaveButton"
import CloudImageUpload from "@/components/admin/CloudImageUpload"

// Initial site settings
const initialSettings = {
  contactInfo: {
    email: "carryluxe3@gmail.com",
    phone: "+1 (618) 850-9790",
    address: "123 Luxury Lane, Beverly Hills, CA 90210",
  },
  quickLinks: [
    { id: "1", title: "About", url: "/about" },
    { id: "2", title: "Contact", url: "/contact" },
    { id: "3", title: "Terms", url: "/terms" },
    { id: "4", title: "Privacy", url: "/privacy" },
  ],
  customerCare: [
    { id: "1", title: "Shipping", url: "/shipping" },
    { id: "2", title: "Returns", url: "/returns" },
    { id: "3", title: "Size Guide", url: "/size-guide" },
    { id: "4", title: "Care Instructions", url: "/care" },
  ],
  socialMedia: [
    { id: "1", platform: "Instagram", url: "https://instagram.com/carryluxe" },
    { id: "2", platform: "Facebook", url: "https://facebook.com/carryluxe" },
    { id: "3", platform: "Twitter", url: "https://twitter.com/carryluxe" },
  ],
}

interface HomePageSettings {
  heroTitle: string
  heroSubtitle: string
  heroMedia: Array<{
    type: string
    url: string
    alt: string
  }>
  hermesTitle: string
  hermesDescription: string
  hermesImage: string
  lvTitle: string
  lvDescription: string
  lvImage: string
  shopByIconTitle: string
  shopByIconSubtitle: string
  trendingTitle: string
  trendingSubtitle: string
  ctaTitle: string
  ctaDescription: string
}

export default function AdminDashboard() {
  const { user } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("dashboard")
  const [products, setProducts] = useState(initialProducts)
  const [users, setUsers] = useState(initialUsers)
  const [siteSettings, setSiteSettings] = useState(initialSettings)
  const [isClient, setIsClient] = useState(false)

  // Product management state
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [productForm, setProductForm] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    colors: "",
    inStock: true,
    featured: false,
    newArrival: false,
    image: "",
    images: [],
  })

  // User management state
  const [selectedUser, setSelectedUser] = useState(null)
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false)
  const [isUserEditMode, setIsUserEditMode] = useState(false)
  const [userForm, setUserForm] = useState({
    name: "",
    email: "",
    role: "customer",
  })

  // Order details state
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [isOrderDialogOpen, setIsOrderDialogOpen] = useState(false)

  // Site settings state
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false)
  const [contactForm, setContactForm] = useState(initialSettings.contactInfo)

  const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false)
  const [linkForm, setLinkForm] = useState({ id: "", title: "", url: "", type: "quickLinks" })
  const [linkEditMode, setLinkEditMode] = useState(false)

  // Search and filter state
  const [productSearch, setProductSearch] = useState("")
  const [userSearch, setUserSearch] = useState("")

  // Home page settings state
  const [isHomePageDialogOpen, setIsHomePageDialogOpen] = useState(false)
  const [homePageSettings, setHomePageSettings] = useState<HomePageSettings>({
    heroTitle: "Elevated Luxury.\nTimeless Icons.",
    heroSubtitle:
      "Discover the world's most coveted handbags from Hermès and Louis Vuitton.\nWhere heritage meets contemporary elegance.",
    heroMedia: [
      {
        type: "image",
        url: "/placeholder.svg?height=1080&width=1920",
        alt: "Luxury handbags collection",
      },
    ],
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

  // Load saved settings on component mount
  useEffect(() => {
    setIsClient(true)

    // Load homepage settings from API
    const loadHomePageSettings = async () => {
      try {
        const response = await fetch("/api/homepage-settings")
        if (response.ok) {
          const settings = await response.json()
          setHomePageSettings(settings)
        }
      } catch (error) {
        console.error("Failed to load homepage settings:", error)
      }
    }

    loadHomePageSettings()

    // Only run localStorage operations on client side for other settings
    if (typeof window !== "undefined") {
      try {
        // Load saved site settings
        const savedSiteSettings = localStorage.getItem("carryluxe-site-settings")
        if (savedSiteSettings) {
          const parsed = JSON.parse(savedSiteSettings)
          setSiteSettings(parsed)
        }
      } catch (e) {
        console.error("Failed to parse saved settings", e)
      }
    }
  }, [])

  // Check if user is admin
  if (!user || user.role !== "admin") {
    router.push("/")
    return null
  }

  // Don't render until client-side hydration is complete
  if (!isClient) {
    return <div>Loading...</div>
  }

  // Mock KPI data
  const kpis = {
    totalSales: 125000,
    activeOrders: 23,
    totalProducts: products.length,
    totalCustomers: users.length,
  }

  // Product management functions
  const openProductDialog = (product = null) => {
    if (product) {
      setSelectedProduct(product)
      setProductForm({
        name: product.name,
        price: product.price.toString(),
        description: product.description,
        category: product.category,
        colors: product.colors.join(", "),
        inStock: product.inStock,
        featured: product.featured || false,
        newArrival: product.newArrival || false,
        image: product.image,
        images: product.images || [],
      })
      setIsEditMode(true)
    } else {
      setSelectedProduct(null)
      setProductForm({
        name: "",
        price: "",
        description: "",
        category: "",
        colors: "",
        inStock: true,
        featured: false,
        newArrival: false,
        image: "/placeholder.svg?height=400&width=400",
        images: [],
      })
      setIsEditMode(false)
    }
    setIsProductDialogOpen(true)
  }

  const saveProduct = async () => {
    try {
      const newProduct = {
        id: isEditMode ? selectedProduct.id : `product-${Date.now()}`,
        name: productForm.name,
        price: Number.parseFloat(productForm.price),
        image: productForm.image,
        images: productForm.images.length > 0 ? productForm.images : [productForm.image],
        description: productForm.description,
        category: productForm.category,
        colors: productForm.colors.split(",").map((c) => c.trim()),
        inStock: productForm.inStock,
        featured: productForm.featured,
        newArrival: productForm.newArrival,
      }

      if (isEditMode) {
        setProducts(products.map((p) => (p.id === selectedProduct.id ? newProduct : p)))
      } else {
        setProducts([...products, newProduct])
      }

      // Save to localStorage
      const updatedProducts = isEditMode
        ? products.map((p) => (p.id === selectedProduct.id ? newProduct : p))
        : [...products, newProduct]

      if (typeof window !== "undefined") {
        localStorage.setItem("carryluxe-products", JSON.stringify(updatedProducts))
      }
      setIsProductDialogOpen(false)
    } catch (error) {
      console.error("Failed to save product:", error)
      throw error
    }
  }

  const deleteProduct = (productId) => {
    const updatedProducts = products.filter((p) => p.id !== productId)
    setProducts(updatedProducts)
    if (typeof window !== "undefined") {
      localStorage.setItem("carryluxe-products", JSON.stringify(updatedProducts))
    }
  }

  const removeProductImage = (index) => {
    const newImages = [...productForm.images]
    newImages.splice(index, 1)
    setProductForm({ ...productForm, images: newImages })
  }

  // User management functions
  const openUserDialog = (user = null) => {
    if (user) {
      setSelectedUser(user)
      setUserForm({
        name: user.name,
        email: user.email,
        role: user.role,
      })
      setIsUserEditMode(true)
    } else {
      setSelectedUser(null)
      setUserForm({
        name: "",
        email: "",
        role: "customer",
      })
      setIsUserEditMode(false)
    }
    setIsUserDialogOpen(true)
  }

  const saveUser = async () => {
    try {
      const newUser = {
        id: isUserEditMode ? selectedUser.id : `user-${Date.now()}`,
        name: userForm.name,
        email: userForm.email,
        role: userForm.role,
      }

      const updatedUsers = isUserEditMode
        ? users.map((u) => (u.id === selectedUser.id ? newUser : u))
        : [...users, newUser]

      setUsers(updatedUsers)
      if (typeof window !== "undefined") {
        localStorage.setItem("carryluxe-users", JSON.stringify(updatedUsers))
      }
      setIsUserDialogOpen(false)
    } catch (error) {
      console.error("Failed to save user:", error)
      throw error
    }
  }

  const deleteUser = (userId) => {
    const updatedUsers = users.filter((u) => u.id !== userId)
    setUsers(updatedUsers)
    if (typeof window !== "undefined") {
      localStorage.setItem("carryluxe-users", JSON.stringify(updatedUsers))
    }
  }

  // Order details function
  const viewOrderDetails = (order) => {
    setSelectedOrder(order)
    setIsOrderDialogOpen(true)
  }

  // Contact info management
  const openContactDialog = () => {
    setContactForm(siteSettings.contactInfo)
    setIsContactDialogOpen(true)
  }

  const saveContactInfo = async () => {
    try {
      const updatedSettings = {
        ...siteSettings,
        contactInfo: contactForm,
      }
      setSiteSettings(updatedSettings)

      if (typeof window !== "undefined") {
        localStorage.setItem("carryluxe-site-settings", JSON.stringify(updatedSettings))

        // Also trigger footer update
        window.dispatchEvent(
          new CustomEvent("siteSettingsUpdated", {
            detail: updatedSettings,
          }),
        )
      }

      setIsContactDialogOpen(false)
    } catch (error) {
      console.error("Failed to save contact info:", error)
      throw error
    }
  }

  // Link management
  const openLinkDialog = (link = null, type = "quickLinks") => {
    if (link) {
      setLinkForm({
        id: link.id,
        title: link.title,
        url: link.url,
        type: type,
      })
      setLinkEditMode(true)
    } else {
      setLinkForm({
        id: "",
        title: "",
        url: "",
        type: type,
      })
      setLinkEditMode(false)
    }
    setIsLinkDialogOpen(true)
  }

  const saveLink = async () => {
    try {
      const newLink = {
        id: linkEditMode ? linkForm.id : `link-${Date.now()}`,
        title: linkForm.title,
        url: linkForm.url,
        ...(linkForm.type === "socialMedia" ? { platform: linkForm.title } : {}),
      }

      const updatedSettings = { ...siteSettings }

      if (linkEditMode) {
        updatedSettings[linkForm.type] = updatedSettings[linkForm.type].map((link) =>
          link.id === newLink.id ? newLink : link,
        )
      } else {
        updatedSettings[linkForm.type] = [...updatedSettings[linkForm.type], newLink]
      }

      setSiteSettings(updatedSettings)

      if (typeof window !== "undefined") {
        localStorage.setItem("carryluxe-site-settings", JSON.stringify(updatedSettings))

        // Trigger footer update
        window.dispatchEvent(
          new CustomEvent("siteSettingsUpdated", {
            detail: updatedSettings,
          }),
        )
      }

      setIsLinkDialogOpen(false)
    } catch (error) {
      console.error("Failed to save link:", error)
      throw error
    }
  }

  const deleteLink = (id, type) => {
    const updatedSettings = { ...siteSettings }
    updatedSettings[type] = updatedSettings[type].filter((link) => link.id !== id)
    setSiteSettings(updatedSettings)

    if (typeof window !== "undefined") {
      localStorage.setItem("carryluxe-site-settings", JSON.stringify(updatedSettings))

      // Trigger footer update
      window.dispatchEvent(
        new CustomEvent("siteSettingsUpdated", {
          detail: updatedSettings,
        }),
      )
    }
  }

  // Home page management functions
  const openHomePageDialog = () => {
    setIsHomePageDialogOpen(true)
  }

  const saveHomePageSettings = async () => {
    try {
      // Validate required fields
      if (!homePageSettings.heroTitle || !homePageSettings.heroSubtitle) {
        throw new Error("Hero title and subtitle are required")
      }

      // Save to database via API
      const response = await fetch("/api/homepage-settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(homePageSettings),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to save homepage settings")
      }

      const result = await response.json()

      // Trigger a custom event to notify other components of the change
      if (typeof window !== "undefined") {
        const event = new CustomEvent("homepageSettingsUpdated", {
          detail: homePageSettings,
        })
        window.dispatchEvent(event)
      }

      setIsHomePageDialogOpen(false)

      // Show success message after a brief delay
      setTimeout(() => {
        alert("Home page settings saved successfully! The changes are now visible on the home page.")
      }, 100)
    } catch (error) {
      console.error("Failed to save homepage settings:", error)
      alert(`Failed to save homepage settings: ${error.message}. Please try again.`)
      throw error
    }
  }

  // Hero media management with cloud upload
  const addHeroMediaFromUpload = async (file: File) => {
    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Upload failed")
      }

      const result = await response.json()
      const mediaType = file.type.startsWith("video/") ? "video" : "image"

      const newMedia = {
        type: mediaType,
        url: result.url,
        alt: file.name,
      }

      setHomePageSettings({
        ...homePageSettings,
        heroMedia: [...(homePageSettings.heroMedia || []), newMedia],
      })
    } catch (error) {
      console.error("Upload error:", error)
      alert(`Upload failed: ${error.message}`)
    }
  }

  const removeHeroMedia = (index) => {
    const newMedia = [...homePageSettings.heroMedia]
    newMedia.splice(index, 1)
    setHomePageSettings({
      ...homePageSettings,
      heroMedia: newMedia,
    })
  }

  // Filter functions
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      product.category.toLowerCase().includes(productSearch.toLowerCase()),
  )

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(userSearch.toLowerCase()) ||
      user.email.toLowerCase().includes(userSearch.toLowerCase()),
  )

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
    <AdminLayout>
      <div className="min-h-screen bg-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h1 className="font-playfair text-3xl font-bold text-charcoal-900 mb-2">Admin Dashboard</h1>
            <p className="text-charcoal-800">Manage your CarryLuxe store</p>
          </motion.div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-6 lg:w-[720px]">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="homepage">Home Page</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard" className="space-y-6">
              {/* KPI Cards */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              >
                <motion.div variants={itemVariants}>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
                      <DollarSign className="h-4 w-4 text-gold-400" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">${kpis.totalSales.toLocaleString()}</div>
                      <p className="text-xs text-charcoal-800">+12% from last month</p>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
                      <Package className="h-4 w-4 text-gold-400" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{kpis.activeOrders}</div>
                      <p className="text-xs text-charcoal-800">+3 from yesterday</p>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Products</CardTitle>
                      <BarChart3 className="h-4 w-4 text-gold-400" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{kpis.totalProducts}</div>
                      <p className="text-xs text-charcoal-800">2 added this week</p>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Customers</CardTitle>
                      <Users className="h-4 w-4 text-gold-400" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{kpis.totalCustomers}</div>
                      <p className="text-xs text-charcoal-800">+5 new this week</p>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>

              {/* Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Orders</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {orders.slice(0, 5).map((order) => (
                          <div key={order.id} className="flex items-center justify-between">
                            <div>
                              <p className="font-semibold">{order.id}</p>
                              <p className="text-sm text-charcoal-800">{order.date}</p>
                            </div>
                            <div className="text-right">
                              <Badge variant={order.status === "delivered" ? "default" : "secondary"}>
                                {order.status}
                              </Badge>
                              <p className="text-sm font-semibold">${order.total.toLocaleString()}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Top Products</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {products.slice(0, 5).map((product) => (
                          <div key={product.id} className="flex items-center justify-between">
                            <div>
                              <p className="font-semibold">{product.name}</p>
                              <p className="text-sm text-charcoal-800">{product.category}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold">${product.price.toLocaleString()}</p>
                              <p className="text-sm text-charcoal-800">
                                {product.inStock ? "In Stock" : "Out of Stock"}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </TabsContent>

            <TabsContent value="products" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex justify-between items-center"
              >
                <h2 className="text-2xl font-bold">Product Management</h2>
                <Button className="bg-charcoal-900 hover:bg-charcoal-800" onClick={() => openProductDialog()}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Product
                </Button>
              </motion.div>

              <div className="flex space-x-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search products..."
                    className="pl-10"
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                  />
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-cream-100">
                          <tr>
                            <th className="text-left p-4">Product</th>
                            <th className="text-left p-4">Category</th>
                            <th className="text-left p-4">Price</th>
                            <th className="text-left p-4">Stock</th>
                            <th className="text-left p-4">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredProducts.map((product, index) => (
                            <motion.tr
                              key={product.id}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.4, delay: index * 0.1 }}
                              className="border-b border-cream-200"
                            >
                              <td className="p-4">
                                <div className="flex items-center space-x-3">
                                  <div className="w-12 h-12 bg-cream-100 rounded overflow-hidden">
                                    <Image
                                      src={product.image || "/placeholder.svg"}
                                      alt={product.name}
                                      width={48}
                                      height={48}
                                      className="object-cover"
                                    />
                                  </div>
                                  <div>
                                    <p className="font-semibold">{product.name}</p>
                                    <p className="text-sm text-charcoal-800">ID: {product.id}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="p-4">{product.category}</td>
                              <td className="p-4">${product.price.toLocaleString()}</td>
                              <td className="p-4">
                                <Badge variant={product.inStock ? "default" : "destructive"}>
                                  {product.inStock ? "In Stock" : "Out of Stock"}
                                </Badge>
                              </td>
                              <td className="p-4">
                                <div className="flex space-x-2">
                                  <Button size="sm" variant="outline" onClick={() => openProductDialog(product)}>
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button size="sm" variant="outline" onClick={() => deleteProduct(product.id)}>
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </td>
                            </motion.tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="orders" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex justify-between items-center"
              >
                <h2 className="text-2xl font-bold">Order Management</h2>
                <div className="flex space-x-2">
                  <Button variant="outline">All</Button>
                  <Button variant="outline">Pending</Button>
                  <Button variant="outline">Shipped</Button>
                  <Button variant="outline">Delivered</Button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-cream-100">
                          <tr>
                            <th className="text-left p-4">Order ID</th>
                            <th className="text-left p-4">Customer</th>
                            <th className="text-left p-4">Date</th>
                            <th className="text-left p-4">Status</th>
                            <th className="text-left p-4">Total</th>
                            <th className="text-left p-4">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {orders.map((order, index) => (
                            <motion.tr
                              key={order.id}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.4, delay: index * 0.1 }}
                              className="border-b border-cream-200"
                            >
                              <td className="p-4 font-semibold">{order.id}</td>
                              <td className="p-4">John Doe</td>
                              <td className="p-4">{order.date}</td>
                              <td className="p-4">
                                <Badge
                                  variant={
                                    order.status === "delivered"
                                      ? "default"
                                      : order.status === "shipped"
                                        ? "secondary"
                                        : "outline"
                                  }
                                >
                                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                </Badge>
                              </td>
                              <td className="p-4 font-semibold">${order.total.toLocaleString()}</td>
                              <td className="p-4">
                                <Button size="sm" variant="outline" onClick={() => viewOrderDetails(order)}>
                                  <Eye className="h-4 w-4 mr-1" />
                                  View Details
                                </Button>
                              </td>
                            </motion.tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="users" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex justify-between items-center"
              >
                <h2 className="text-2xl font-bold">User Management</h2>
                <Button className="bg-charcoal-900 hover:bg-charcoal-800" onClick={() => openUserDialog()}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add User
                </Button>
              </motion.div>

              <div className="flex space-x-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search users..."
                    className="pl-10"
                    value={userSearch}
                    onChange={(e) => setUserSearch(e.target.value)}
                  />
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-cream-100">
                          <tr>
                            <th className="text-left p-4">User</th>
                            <th className="text-left p-4">Email</th>
                            <th className="text-left p-4">Role</th>
                            <th className="text-left p-4">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredUsers.map((user, index) => (
                            <motion.tr
                              key={user.id}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.4, delay: index * 0.1 }}
                              className="border-b border-cream-200"
                            >
                              <td className="p-4">
                                <div className="flex items-center space-x-3">
                                  <div className="w-10 h-10 bg-gold-400 rounded-full flex items-center justify-center text-white font-semibold">
                                    {user.name.charAt(0)}
                                  </div>
                                  <div>
                                    <p className="font-semibold">{user.name}</p>
                                    <p className="text-sm text-charcoal-800">ID: {user.id}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="p-4">{user.email}</td>
                              <td className="p-4">
                                <Badge variant={user.role === "admin" ? "default" : "secondary"}>
                                  {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                                </Badge>
                              </td>
                              <td className="p-4">
                                <div className="flex space-x-2">
                                  <Button size="sm" variant="outline" onClick={() => openUserDialog(user)}>
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button size="sm" variant="outline" onClick={() => deleteUser(user.id)}>
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </td>
                            </motion.tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="homepage" className="space-y-6">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-2xl font-bold">Home Page Settings</h2>
                    <p className="text-sm text-charcoal-600 flex items-center gap-1 mt-1">
                      <Cloud className="h-4 w-4" />
                      Images stored in Vercel Blob cloud storage
                    </p>
                  </div>
                  <Button className="bg-charcoal-900 hover:bg-charcoal-800" onClick={openHomePageDialog}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Home Page
                  </Button>
                </div>

                {/* Hero Carousel Preview */}
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>Hero Carousel ({homePageSettings.heroMedia?.length || 0} items)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {homePageSettings.heroMedia?.map((media, index) => (
                        <div key={index} className="relative h-32 bg-cream-100 rounded overflow-hidden">
                          {media.type === "video" ? (
                            <video src={media.url} className="w-full h-full object-cover" muted />
                          ) : (
                            <Image
                              src={media.url || "/placeholder.svg"}
                              alt={media.alt || "Hero media"}
                              fill
                              className="object-cover"
                            />
                          )}
                          <div className="absolute top-2 right-2">
                            <Badge variant={media.type === "video" ? "default" : "secondary"}>{media.type}</Badge>
                          </div>
                          <div className="absolute bottom-2 left-2">
                            <Badge variant="outline" className="bg-white/80 text-xs">
                              <Cloud className="h-3 w-3 mr-1" />
                              Cloud
                            </Badge>
                          </div>
                        </div>
                      )) || (
                        <div className="col-span-full text-center py-8 text-charcoal-800">
                          No hero media uploaded yet
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Brand Collections Preview */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Hermès Section</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="relative h-32 bg-cream-100 rounded overflow-hidden mb-2">
                        <Image
                          src={homePageSettings.hermesImage || "/placeholder.svg"}
                          alt="Hermès collection"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <h4 className="font-semibold">{homePageSettings.hermesTitle}</h4>
                      <p className="text-sm text-charcoal-800">{homePageSettings.hermesDescription}</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Louis Vuitton Section</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="relative h-32 bg-cream-100 rounded overflow-hidden mb-2">
                        <Image
                          src={homePageSettings.lvImage || "/placeholder.svg"}
                          alt="Louis Vuitton collection"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <h4 className="font-semibold">{homePageSettings.lvTitle}</h4>
                      <p className="text-sm text-charcoal-800">{homePageSettings.lvDescription}</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Other Sections Preview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Shop by Icon</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <h4 className="font-semibold mb-1">{homePageSettings.shopByIconTitle}</h4>
                      <p className="text-sm text-charcoal-800">{homePageSettings.shopByIconSubtitle}</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Trending Section</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <h4 className="font-semibold mb-1">{homePageSettings.trendingTitle}</h4>
                      <p className="text-sm text-charcoal-800">{homePageSettings.trendingSubtitle}</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>CTA Section</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <h4 className="font-semibold mb-1">{homePageSettings.ctaTitle}</h4>
                      <p className="text-sm text-charcoal-800">
                        {homePageSettings.ctaDescription.substring(0, 100)}...
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <h2 className="text-2xl font-bold mb-6">Site Settings</h2>

                {/* Contact Information */}
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                      <span>Contact Information</span>
                      <Button variant="outline" size="sm" onClick={openContactDialog}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <Mail className="h-5 w-5 text-gold-400 mt-0.5" />
                        <div>
                          <p className="font-semibold">Email</p>
                          <p className="text-charcoal-800">{siteSettings.contactInfo.email}</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <Phone className="h-5 w-5 text-gold-400 mt-0.5" />
                        <div>
                          <p className="font-semibold">Phone</p>
                          <p className="text-charcoal-800">{siteSettings.contactInfo.phone}</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <MapPin className="h-5 w-5 text-gold-400 mt-0.5" />
                        <div>
                          <p className="font-semibold">Address</p>
                          <p className="text-charcoal-800">{siteSettings.contactInfo.address}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Links */}
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                      <span>Quick Links</span>
                      <Button variant="outline" size="sm" onClick={() => openLinkDialog(null, "quickLinks")}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Link
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {siteSettings.quickLinks.map((link) => (
                        <div
                          key={link.id}
                          className="flex items-center justify-between p-2 border-b border-cream-200 last:border-0"
                        >
                          <div className="flex items-center space-x-3">
                            <LinkIcon className="h-4 w-4 text-gold-400" />
                            <div>
                              <p className="font-medium">{link.title}</p>
                              <p className="text-sm text-charcoal-800">{link.url}</p>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="ghost" onClick={() => openLinkDialog(link, "quickLinks")}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-red-500 hover:text-red-700"
                              onClick={() => deleteLink(link.id, "quickLinks")}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Customer Care */}
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                      <span>Customer Care</span>
                      <Button variant="outline" size="sm" onClick={() => openLinkDialog(null, "customerCare")}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Link
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {siteSettings.customerCare.map((link) => (
                        <div
                          key={link.id}
                          className="flex items-center justify-between p-2 border-b border-cream-200 last:border-0"
                        >
                          <div className="flex items-center space-x-3">
                            <LinkIcon className="h-4 w-4 text-gold-400" />
                            <div>
                              <p className="font-medium">{link.title}</p>
                              <p className="text-sm text-charcoal-800">{link.url}</p>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="ghost" onClick={() => openLinkDialog(link, "customerCare")}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-red-500 hover:text-red-700"
                              onClick={() => deleteLink(link.id, "customerCare")}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Social Media */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                      <span>Social Media</span>
                      <Button variant="outline" size="sm" onClick={() => openLinkDialog(null, "socialMedia")}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Link
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {siteSettings.socialMedia.map((link) => (
                        <div
                          key={link.id}
                          className="flex items-center justify-between p-2 border-b border-cream-200 last:border-0"
                        >
                          <div className="flex items-center space-x-3">
                            {link.platform === "Instagram" && <Instagram className="h-4 w-4 text-gold-400" />}
                            {link.platform === "Facebook" && <Facebook className="h-4 w-4 text-gold-400" />}
                            {link.platform === "Twitter" && <Twitter className="h-4 w-4 text-gold-400" />}
                            <div>
                              <p className="font-medium">{link.platform}</p>
                              <p className="text-sm text-charcoal-800">{link.url}</p>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="ghost" onClick={() => openLinkDialog(link, "socialMedia")}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-red-500 hover:text-red-700"
                              onClick={() => deleteLink(link.id, "socialMedia")}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          </Tabs>

          {/* Product Dialog with Cloud Image Upload */}
          <Dialog open={isProductDialogOpen} onOpenChange={setIsProductDialogOpen}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{isEditMode ? "Edit Product" : "Add New Product"}</DialogTitle>
                <DialogDescription>
                  {isEditMode ? "Update product information" : "Create a new product for your store"}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Product Name</Label>
                    <Input
                      id="name"
                      value={productForm.name}
                      onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="price">Price ($)</Label>
                    <Input
                      id="price"
                      type="number"
                      value={productForm.price}
                      onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={productForm.description}
                    onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={productForm.category}
                      onValueChange={(value) => setProductForm({ ...productForm, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Hermès">Hermès</SelectItem>
                        <SelectItem value="Louis Vuitton">Louis Vuitton</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="colors">Colors (comma separated)</Label>
                    <Input
                      id="colors"
                      value={productForm.colors}
                      onChange={(e) => setProductForm({ ...productForm, colors: e.target.value })}
                      placeholder="Black, Brown, Gold"
                    />
                  </div>
                </div>

                <CloudImageUpload
                  label="Main Product Image"
                  value={productForm.image}
                  onChange={(url) => setProductForm({ ...productForm, image: url })}
                  type="image"
                />

                <div className="flex space-x-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="inStock"
                      checked={productForm.inStock}
                      onChange={(e) => setProductForm({ ...productForm, inStock: e.target.checked })}
                    />
                    <Label htmlFor="inStock">In Stock</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="featured"
                      checked={productForm.featured}
                      onChange={(e) => setProductForm({ ...productForm, featured: e.target.checked })}
                    />
                    <Label htmlFor="featured">Featured</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="newArrival"
                      checked={productForm.newArrival}
                      onChange={(e) => setProductForm({ ...productForm, newArrival: e.target.checked })}
                    />
                    <Label htmlFor="newArrival">New Arrival</Label>
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-2 pt-4 border-t sticky bottom-0 bg-white">
                <Button variant="outline" onClick={() => setIsProductDialogOpen(false)}>
                  Cancel
                </Button>
                <SaveButton onSave={saveProduct} className="bg-charcoal-900 hover:bg-charcoal-800">
                  {isEditMode ? "Update Product" : "Add Product"}
                </SaveButton>
              </div>
            </DialogContent>
          </Dialog>

          {/* Home Page Settings Dialog with Cloud Upload */}
          <Dialog open={isHomePageDialogOpen} onOpenChange={setIsHomePageDialogOpen}>
            <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Cloud className="h-5 w-5" />
                  Edit Home Page
                </DialogTitle>
                <DialogDescription>
                  Customize your home page content with cloud-hosted media (Vercel Blob storage)
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-6 py-4">
                {/* Hero Carousel Section */}
                <Card>
                  <CardHeader>
                    <CardTitle>Hero Carousel</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="heroTitle">Hero Title</Label>
                        <Textarea
                          id="heroTitle"
                          value={homePageSettings.heroTitle}
                          onChange={(e) => setHomePageSettings({ ...homePageSettings, heroTitle: e.target.value })}
                          rows={3}
                        />
                      </div>
                      <div>
                        <Label htmlFor="heroSubtitle">Hero Subtitle</Label>
                        <Textarea
                          id="heroSubtitle"
                          value={homePageSettings.heroSubtitle}
                          onChange={(e) => setHomePageSettings({ ...homePageSettings, heroSubtitle: e.target.value })}
                          rows={3}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <Label>Hero Media (Images & Videos)</Label>
                        <div className="flex space-x-2">
                          <Input
                            type="file"
                            accept="image/*,video/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0]
                              if (file) {
                                addHeroMediaFromUpload(file)
                              }
                            }}
                            className="w-auto file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        {homePageSettings.heroMedia?.map((media, index) => (
                          <div key={index} className="relative">
                            <div className="relative w-full h-32 bg-cream-100 rounded overflow-hidden">
                              {media.type === "video" ? (
                                <video src={media.url} className="w-full h-full object-cover" muted />
                              ) : (
                                <Image
                                  src={media.url || "/placeholder.svg"}
                                  alt={media.alt || "Hero media"}
                                  fill
                                  className="object-cover"
                                />
                              )}
                              <div className="absolute top-2 left-2">
                                <Badge variant={media.type === "video" ? "default" : "secondary"}>
                                  {media.type === "video" ? (
                                    <Video className="h-3 w-3 mr-1" />
                                  ) : (
                                    <ImageIcon className="h-3 w-3 mr-1" />
                                  )}
                                  {media.type}
                                </Badge>
                              </div>
                              <div className="absolute bottom-2 left-2">
                                <Badge variant="outline" className="bg-white/80 text-xs">
                                  <Cloud className="h-3 w-3 mr-1" />
                                  Cloud
                                </Badge>
                              </div>
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="absolute -top-2 -right-2 h-6 w-6 bg-red-500 text-white rounded-full hover:bg-red-600"
                              onClick={() => removeHeroMedia(index)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                      <p className="text-xs text-charcoal-800">
                        Upload multiple images and videos for your hero carousel. Files are stored in Vercel Blob cloud
                        storage.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Brand Collections */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Hermès Section</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="hermesTitle">Title</Label>
                        <Input
                          id="hermesTitle"
                          value={homePageSettings.hermesTitle}
                          onChange={(e) => setHomePageSettings({ ...homePageSettings, hermesTitle: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="hermesDescription">Description</Label>
                        <Textarea
                          id="hermesDescription"
                          value={homePageSettings.hermesDescription}
                          onChange={(e) =>
                            setHomePageSettings({ ...homePageSettings, hermesDescription: e.target.value })
                          }
                        />
                      </div>
                      <CloudImageUpload
                        label="Hermès Collection Image"
                        value={homePageSettings.hermesImage}
                        onChange={(url) => setHomePageSettings({ ...homePageSettings, hermesImage: url })}
                        type="image"
                      />
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Louis Vuitton Section</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="lvTitle">Title</Label>
                        <Input
                          id="lvTitle"
                          value={homePageSettings.lvTitle}
                          onChange={(e) => setHomePageSettings({ ...homePageSettings, lvTitle: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="lvDescription">Description</Label>
                        <Textarea
                          id="lvDescription"
                          value={homePageSettings.lvDescription}
                          onChange={(e) => setHomePageSettings({ ...homePageSettings, lvDescription: e.target.value })}
                        />
                      </div>
                      <CloudImageUpload
                        label="Louis Vuitton Collection Image"
                        value={homePageSettings.lvImage}
                        onChange={(url) => setHomePageSettings({ ...homePageSettings, lvImage: url })}
                        type="image"
                      />
                    </CardContent>
                  </Card>
                </div>

                {/* Other Sections */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Shop by Icon Section</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="shopByIconTitle">Title</Label>
                        <Input
                          id="shopByIconTitle"
                          value={homePageSettings.shopByIconTitle}
                          onChange={(e) =>
                            setHomePageSettings({ ...homePageSettings, shopByIconTitle: e.target.value })
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="shopByIconSubtitle">Subtitle</Label>
                        <Input
                          id="shopByIconSubtitle"
                          value={homePageSettings.shopByIconSubtitle}
                          onChange={(e) =>
                            setHomePageSettings({ ...homePageSettings, shopByIconSubtitle: e.target.value })
                          }
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Trending Section</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="trendingTitle">Title</Label>
                        <Input
                          id="trendingTitle"
                          value={homePageSettings.trendingTitle}
                          onChange={(e) => setHomePageSettings({ ...homePageSettings, trendingTitle: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="trendingSubtitle">Subtitle</Label>
                        <Input
                          id="trendingSubtitle"
                          value={homePageSettings.trendingSubtitle}
                          onChange={(e) =>
                            setHomePageSettings({ ...homePageSettings, trendingSubtitle: e.target.value })
                          }
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Call to Action Section</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="ctaTitle">Title</Label>
                      <Input
                        id="ctaTitle"
                        value={homePageSettings.ctaTitle}
                        onChange={(e) => setHomePageSettings({ ...homePageSettings, ctaTitle: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="ctaDescription">Description</Label>
                      <Textarea
                        id="ctaDescription"
                        value={homePageSettings.ctaDescription}
                        onChange={(e) => setHomePageSettings({ ...homePageSettings, ctaDescription: e.target.value })}
                        rows={3}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="flex justify-end space-x-2 pt-4 border-t sticky bottom-0 bg-white">
                <Button variant="outline" onClick={() => setIsHomePageDialogOpen(false)}>
                  Cancel
                </Button>
                <SaveButton onSave={saveHomePageSettings} className="bg-charcoal-900 hover:bg-charcoal-800">
                  Save Changes
                </SaveButton>
              </div>
            </DialogContent>
          </Dialog>

          {/* Contact Dialog */}
          <Dialog open={isContactDialogOpen} onOpenChange={setIsContactDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Contact Information</DialogTitle>
                <DialogDescription>Update your store's contact details</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div>
                  <Label htmlFor="contactEmail">Email</Label>
                  <Input
                    id="contactEmail"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="contactPhone">Phone</Label>
                  <Input
                    id="contactPhone"
                    value={contactForm.phone}
                    onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="contactAddress">Address</Label>
                  <Textarea
                    id="contactAddress"
                    value={contactForm.address}
                    onChange={(e) => setContactForm({ ...contactForm, address: e.target.value })}
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsContactDialogOpen(false)}>
                  Cancel
                </Button>
                <SaveButton onSave={saveContactInfo}>Save Changes</SaveButton>
              </div>
            </DialogContent>
          </Dialog>

          {/* Link Dialog */}
          <Dialog open={isLinkDialogOpen} onOpenChange={setIsLinkDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{linkEditMode ? "Edit Link" : "Add New Link"}</DialogTitle>
                <DialogDescription>
                  {linkEditMode ? "Update link information" : "Add a new link to your site"}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div>
                  <Label htmlFor="linkTitle">Title</Label>
                  <Input
                    id="linkTitle"
                    value={linkForm.title}
                    onChange={(e) => setLinkForm({ ...linkForm, title: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="linkUrl">URL</Label>
                  <Input
                    id="linkUrl"
                    value={linkForm.url}
                    onChange={(e) => setLinkForm({ ...linkForm, url: e.target.value })}
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsLinkDialogOpen(false)}>
                  Cancel
                </Button>
                <SaveButton onSave={saveLink}>{linkEditMode ? "Update Link" : "Add Link"}</SaveButton>
              </div>
            </DialogContent>
          </Dialog>

          {/* User Dialog */}
          <Dialog open={isUserDialogOpen} onOpenChange={setIsUserDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{isUserEditMode ? "Edit User" : "Add New User"}</DialogTitle>
                <DialogDescription>
                  {isUserEditMode ? "Update user information" : "Create a new user account"}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div>
                  <Label htmlFor="userName">Name</Label>
                  <Input
                    id="userName"
                    value={userForm.name}
                    onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="userEmail">Email</Label>
                  <Input
                    id="userEmail"
                    type="email"
                    value={userForm.email}
                    onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="userRole">Role</Label>
                  <Select value={userForm.role} onValueChange={(value) => setUserForm({ ...userForm, role: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="customer">Customer</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsUserDialogOpen(false)}>
                  Cancel
                </Button>
                <SaveButton onSave={saveUser}>{isUserEditMode ? "Update User" : "Add User"}</SaveButton>
              </div>
            </DialogContent>
          </Dialog>

          {/* Order Details Dialog */}
          <Dialog open={isOrderDialogOpen} onOpenChange={setIsOrderDialogOpen}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Order Details</DialogTitle>
                <DialogDescription>View complete order information</DialogDescription>
              </DialogHeader>
              {selectedOrder && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Order ID</Label>
                      <p className="font-semibold">{selectedOrder.id}</p>
                    </div>
                    <div>
                      <Label>Date</Label>
                      <p>{selectedOrder.date}</p>
                    </div>
                    <div>
                      <Label>Status</Label>
                      <Badge
                        variant={
                          selectedOrder.status === "delivered"
                            ? "default"
                            : selectedOrder.status === "shipped"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                      </Badge>
                    </div>
                    <div>
                      <Label>Total</Label>
                      <p className="font-semibold">${selectedOrder.total.toLocaleString()}</p>
                    </div>
                  </div>
                  <div>
                    <Label>Customer</Label>
                    <p>John Doe</p>
                    <p className="text-sm text-charcoal-800">john.doe@example.com</p>
                  </div>
                </div>
              )}
              <div className="flex justify-end">
                <Button onClick={() => setIsOrderDialogOpen(false)}>Close</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </AdminLayout>
  )
}
