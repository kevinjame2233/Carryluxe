import type { Product, Order, User } from "./types"

export const products: Product[] = [
  // Hermès Collection
  {
    id: "hermes-1",
    name: "Birkin 30",
    price: 12500,
    image: "/placeholder.svg?height=400&width=400",
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    description: "The iconic Hermès Birkin 30 in Togo leather. A symbol of ultimate luxury and craftsmanship.",
    category: "Hermès",
    colors: ["Noir", "Étoupe", "Gold"],
    inStock: true,
    featured: true,
    newArrival: false,
  },
  {
    id: "hermes-2",
    name: "Kelly 25",
    price: 11800,
    image: "/placeholder.svg?height=400&width=400",
    images: ["/placeholder.svg?height=600&width=600", "/placeholder.svg?height=600&width=600"],
    description: "The timeless Hermès Kelly 25 in Epsom leather. Grace Kelly's favorite, now yours.",
    category: "Hermès",
    colors: ["Rouge H", "Noir", "Craie"],
    inStock: true,
    featured: true,
    newArrival: false,
  },
  {
    id: "hermes-3",
    name: "Constance 24",
    price: 8900,
    image: "/placeholder.svg?height=400&width=400",
    images: ["/placeholder.svg?height=600&width=600", "/placeholder.svg?height=600&width=600"],
    description: "The sophisticated Hermès Constance 24 with signature H clasp in Swift leather.",
    category: "Hermès",
    colors: ["Bleu Saphir", "Noir", "Vert Criquet"],
    inStock: true,
    featured: false,
    newArrival: true,
  },
  {
    id: "hermes-4",
    name: "Evelyne 33",
    price: 4200,
    image: "/placeholder.svg?height=400&width=400",
    images: ["/placeholder.svg?height=600&width=600"],
    description: "The casual-chic Hermès Evelyne 33 crossbody bag in Clemence leather.",
    category: "Hermès",
    colors: ["Étoupe", "Noir", "Gold"],
    inStock: true,
    featured: false,
    newArrival: false,
  },
  {
    id: "hermes-5",
    name: "Lindy 30",
    price: 7800,
    image: "/placeholder.svg?height=400&width=400",
    images: ["/placeholder.svg?height=600&width=600", "/placeholder.svg?height=600&width=600"],
    description: "The versatile Hermès Lindy 30 with dual handles and crossbody strap.",
    category: "Hermès",
    colors: ["Gris Perle", "Noir", "Bleu Jean"],
    inStock: false,
    featured: false,
    newArrival: false,
  },

  // Louis Vuitton Collection
  {
    id: "lv-1",
    name: "Neverfull MM",
    price: 2030,
    image: "/placeholder.svg?height=400&width=400",
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    description: "The iconic Louis Vuitton Neverfull MM in Monogram canvas. Timeless and practical.",
    category: "Louis Vuitton",
    colors: ["Monogram", "Damier Ebene", "Damier Azur"],
    inStock: true,
    featured: true,
    newArrival: false,
  },
  {
    id: "lv-2",
    name: "Speedy 30",
    price: 1760,
    image: "/placeholder.svg?height=400&width=400",
    images: ["/placeholder.svg?height=600&width=600", "/placeholder.svg?height=600&width=600"],
    description: "The classic Louis Vuitton Speedy 30 handbag in Monogram canvas.",
    category: "Louis Vuitton",
    colors: ["Monogram", "Damier Ebene", "Epi Leather"],
    inStock: true,
    featured: true,
    newArrival: false,
  },
  {
    id: "lv-3",
    name: "Capucines MM",
    price: 6050,
    image: "/placeholder.svg?height=400&width=400",
    images: ["/placeholder.svg?height=600&width=600", "/placeholder.svg?height=600&width=600"],
    description: "The elegant Louis Vuitton Capucines MM in supple leather with LV closure.",
    category: "Louis Vuitton",
    colors: ["Noir", "Magnolia", "Galet"],
    inStock: true,
    featured: true,
    newArrival: true,
  },
  {
    id: "lv-4",
    name: "Twist MM",
    price: 4400,
    image: "/placeholder.svg?height=400&width=400",
    images: ["/placeholder.svg?height=600&width=600"],
    description: "The modern Louis Vuitton Twist MM with innovative LV turn-lock closure.",
    category: "Louis Vuitton",
    colors: ["Noir", "Epi Indigo", "Epi Moka"],
    inStock: true,
    featured: false,
    newArrival: true,
  },
  {
    id: "lv-5",
    name: "Alma PM",
    price: 2290,
    image: "/placeholder.svg?height=400&width=400",
    images: ["/placeholder.svg?height=600&width=600", "/placeholder.svg?height=600&width=600"],
    description: "The structured Louis Vuitton Alma PM in Monogram canvas with leather trim.",
    category: "Louis Vuitton",
    colors: ["Monogram", "Damier Ebene", "Epi Leather"],
    inStock: true,
    featured: false,
    newArrival: false,
  },
  {
    id: "lv-6",
    name: "OnTheGo MM",
    price: 3100,
    image: "/placeholder.svg?height=400&width=400",
    images: ["/placeholder.svg?height=600&width=600"],
    description: "The contemporary Louis Vuitton OnTheGo MM tote in Giant Monogram canvas.",
    category: "Louis Vuitton",
    colors: ["Giant Monogram", "Giant Damier", "Noir"],
    inStock: true,
    featured: false,
    newArrival: false,
  },
]

export const orders: Order[] = [
  {
    id: "ORD-001",
    date: "2024-01-15",
    status: "delivered",
    total: 12500,
    items: [
      {
        id: "1",
        product: products[0], // Birkin 30
        quantity: 1,
        color: "Noir",
      },
    ],
  },
  {
    id: "ORD-002",
    date: "2024-01-20",
    status: "shipped",
    total: 2030,
    items: [
      {
        id: "2",
        product: products[5], // Neverfull MM
        quantity: 1,
        color: "Monogram",
      },
    ],
  },
]

export const users: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "customer",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "admin",
  },
]
