// Client-side auth utilities (no server dependencies)
export interface User {
  id: number
  email: string
  firstName: string
  lastName: string
  phone?: string
  role: "customer" | "admin"
  createdAt: string
}

export interface AuthResult {
  success: boolean
  user?: User
  error?: string
}
