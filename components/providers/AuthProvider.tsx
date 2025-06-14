"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface User {
  id: number
  email: string
  firstName: string
  lastName: string
  phone?: string
  role: "customer" | "admin"
  createdAt: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  register: (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    phone?: string,
  ) => Promise<{ success: boolean; error?: string }>
  logout: () => Promise<void>
  updateProfile: (data: {
    firstName: string
    lastName: string
    phone?: string
    email: string
  }) => Promise<{ success: boolean; error?: string }>
  updatePassword: (currentPassword: string, newPassword: string) => Promise<{ success: boolean; error?: string }>
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      // Check localStorage for demo user
      const savedUser = localStorage.getItem("carryluxe-user")
      if (savedUser) {
        setUser(JSON.parse(savedUser))
      }
    } catch (error) {
      console.error("Auth check error:", error)
    } finally {
      setLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    try {
      // Demo authentication - simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      if (email === "admin@carryluxe.com" && password === "admin123") {
        const adminUser: User = {
          id: 1,
          email: "admin@carryluxe.com",
          firstName: "Admin",
          lastName: "User",
          role: "admin",
          createdAt: new Date().toISOString(),
        }
        setUser(adminUser)
        localStorage.setItem("carryluxe-user", JSON.stringify(adminUser))
        return { success: true }
      } else if (email === "customer@example.com" && password === "admin123") {
        const customerUser: User = {
          id: 2,
          email: "customer@example.com",
          firstName: "John",
          lastName: "Doe",
          phone: "+1-555-123-4567",
          role: "customer",
          createdAt: new Date().toISOString(),
        }
        setUser(customerUser)
        localStorage.setItem("carryluxe-user", JSON.stringify(customerUser))
        return { success: true }
      } else {
        return { success: false, error: "Invalid credentials" }
      }
    } catch (error) {
      return { success: false, error: "Network error" }
    }
  }

  const register = async (email: string, password: string, firstName: string, lastName: string, phone?: string) => {
    try {
      // Demo registration - simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const newUser: User = {
        id: Date.now(),
        email,
        firstName,
        lastName,
        phone,
        role: "customer",
        createdAt: new Date().toISOString(),
      }
      setUser(newUser)
      localStorage.setItem("carryluxe-user", JSON.stringify(newUser))
      return { success: true }
    } catch (error) {
      return { success: false, error: "Registration failed" }
    }
  }

  const updateProfile = async (profileData: {
    firstName: string
    lastName: string
    phone?: string
    email: string
  }) => {
    try {
      // Demo profile update
      await new Promise((resolve) => setTimeout(resolve, 500))

      if (user) {
        const updatedUser = {
          ...user,
          firstName: profileData.firstName,
          lastName: profileData.lastName,
          email: profileData.email,
          phone: profileData.phone,
        }
        setUser(updatedUser)
        localStorage.setItem("carryluxe-user", JSON.stringify(updatedUser))
      }
      return { success: true }
    } catch (error) {
      return { success: false, error: "Network error" }
    }
  }

  const updatePassword = async (currentPassword: string, newPassword: string) => {
    try {
      // Demo password update
      await new Promise((resolve) => setTimeout(resolve, 500))

      if (currentPassword === "admin123") {
        return { success: true }
      } else {
        return { success: false, error: "Current password is incorrect" }
      }
    } catch (error) {
      return { success: false, error: "Network error" }
    }
  }

  const logout = async () => {
    try {
      setUser(null)
      localStorage.removeItem("carryluxe-user")
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateProfile, updatePassword, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
