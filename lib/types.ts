export interface Product {
  id: string
  name: string
  price: number
  image: string
  images: string[]
  description: string
  category: string
  colors: string[]
  inStock: boolean
  featured?: boolean
  newArrival?: boolean
}

export interface CartItem {
  id: string
  product: Product
  quantity: number
  color?: string
}

export interface Order {
  id: string
  date: string
  status: "pending" | "shipped" | "delivered"
  total: number
  items: CartItem[]
}

export interface User {
  id: string
  name: string
  email: string
  role: "customer" | "admin"
}
