import { neon } from "@neondatabase/serverless"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const sql = neon(process.env.DATABASE_URL!)

// Admin configuration
const ADMIN_CONFIG = {
  email: process.env.ADMIN_EMAIL || "carryluxe3@gmail.com",
  password: process.env.ADMIN_PASSWORD || "kevinjame@2",
}

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
  token?: string
  error?: string
}

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production"

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10)
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

export function generateToken(user: User): string {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: "7d" },
  )
}

export function verifyToken(token: string): any {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch (error) {
    return null
  }
}

export async function createUser(
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  phone?: string,
): Promise<AuthResult> {
  try {
    // Check if user already exists
    const existingUser = await sql`
      SELECT id FROM users WHERE email = ${email}
    `

    if (existingUser.length > 0) {
      return { success: false, error: "User already exists" }
    }

    // Hash password
    const passwordHash = await hashPassword(password)

    // Determine role based on admin email
    const role = email === ADMIN_CONFIG.email ? "admin" : "customer"

    // Create user
    const result = await sql`
      INSERT INTO users (email, password_hash, first_name, last_name, phone, role)
      VALUES (${email}, ${passwordHash}, ${firstName}, ${lastName}, ${phone}, ${role})
      RETURNING id, email, first_name, last_name, phone, role, created_at
    `

    const user: User = {
      id: result[0].id,
      email: result[0].email,
      firstName: result[0].first_name,
      lastName: result[0].last_name,
      phone: result[0].phone,
      role: result[0].role,
      createdAt: result[0].created_at,
    }

    const token = generateToken(user)

    return { success: true, user, token }
  } catch (error) {
    console.error("Create user error:", error)
    return { success: false, error: "Failed to create user" }
  }
}

export async function authenticateUser(email: string, password: string): Promise<AuthResult> {
  try {
    const result = await sql`
      SELECT id, email, password_hash, first_name, last_name, phone, role, created_at
      FROM users 
      WHERE email = ${email}
    `

    if (result.length === 0) {
      return { success: false, error: "Invalid credentials" }
    }

    const userData = result[0]
    const isValidPassword = await verifyPassword(password, userData.password_hash)

    if (!isValidPassword) {
      return { success: false, error: "Invalid credentials" }
    }

    const user: User = {
      id: userData.id,
      email: userData.email,
      firstName: userData.first_name,
      lastName: userData.last_name,
      phone: userData.phone,
      role: userData.role,
      createdAt: userData.created_at,
    }

    const token = generateToken(user)

    return { success: true, user, token }
  } catch (error) {
    console.error("Authentication error:", error)
    return { success: false, error: "Authentication failed" }
  }
}

export async function getUserById(id: number): Promise<User | null> {
  try {
    const result = await sql`
      SELECT id, email, first_name, last_name, phone, role, created_at
      FROM users 
      WHERE id = ${id}
    `

    if (result.length === 0) {
      return null
    }

    const userData = result[0]
    return {
      id: userData.id,
      email: userData.email,
      firstName: userData.first_name,
      lastName: userData.last_name,
      phone: userData.phone,
      role: userData.role,
      createdAt: userData.created_at,
    }
  } catch (error) {
    console.error("Get user error:", error)
    return null
  }
}

export async function updateUser(
  id: number,
  updates: {
    firstName?: string
    lastName?: string
    phone?: string
    email?: string
  },
): Promise<{ success: boolean; user?: User; error?: string }> {
  try {
    const updateFields = []
    const values = []

    if (updates.firstName !== undefined) {
      updateFields.push("first_name = $" + (values.length + 1))
      values.push(updates.firstName)
    }
    if (updates.lastName !== undefined) {
      updateFields.push("last_name = $" + (values.length + 1))
      values.push(updates.lastName)
    }
    if (updates.phone !== undefined) {
      updateFields.push("phone = $" + (values.length + 1))
      values.push(updates.phone)
    }
    if (updates.email !== undefined) {
      updateFields.push("email = $" + (values.length + 1))
      values.push(updates.email)
    }

    if (updateFields.length === 0) {
      return { success: false, error: "No fields to update" }
    }

    updateFields.push("updated_at = CURRENT_TIMESTAMP")
    values.push(id)

    const query = `
      UPDATE users 
      SET ${updateFields.join(", ")}
      WHERE id = $${values.length}
      RETURNING id, email, first_name, last_name, phone, role, created_at
    `

    const result = await sql.unsafe(query, values)

    if (result.length === 0) {
      return { success: false, error: "User not found" }
    }

    const userData = result[0]
    const user: User = {
      id: userData.id,
      email: userData.email,
      firstName: userData.first_name,
      lastName: userData.last_name,
      phone: userData.phone,
      role: userData.role,
      createdAt: userData.created_at,
    }

    return { success: true, user }
  } catch (error) {
    console.error("Update user error:", error)
    return { success: false, error: "Failed to update user" }
  }
}

export async function updatePassword(
  id: number,
  currentPassword: string,
  newPassword: string,
): Promise<{ success: boolean; error?: string }> {
  try {
    // Get current password hash
    const result = await sql`
      SELECT password_hash FROM users WHERE id = ${id}
    `

    if (result.length === 0) {
      return { success: false, error: "User not found" }
    }

    // Verify current password
    const isValidPassword = await verifyPassword(currentPassword, result[0].password_hash)
    if (!isValidPassword) {
      return { success: false, error: "Current password is incorrect" }
    }

    // Hash new password
    const newPasswordHash = await hashPassword(newPassword)

    // Update password
    await sql`
      UPDATE users 
      SET password_hash = ${newPasswordHash}, updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
    `

    return { success: true }
  } catch (error) {
    console.error("Update password error:", error)
    return { success: false, error: "Failed to update password" }
  }
}

export async function getUserOrders(userId: number) {
  try {
    const orders = await sql`
      SELECT 
        o.id,
        o.order_number,
        o.status,
        o.payment_status,
        o.total,
        o.created_at,
        json_agg(
          json_build_object(
            'id', oi.id,
            'productId', oi.product_id,
            'productName', oi.product_name,
            'productPrice', oi.product_price,
            'quantity', oi.quantity,
            'color', oi.color
          )
        ) as items
      FROM orders o
      LEFT JOIN order_items oi ON o.id = oi.order_id
      WHERE o.user_id = ${userId}
      GROUP BY o.id, o.order_number, o.status, o.payment_status, o.total, o.created_at
      ORDER BY o.created_at DESC
    `

    return orders
  } catch (error) {
    console.error("Get user orders error:", error)
    return []
  }
}

export async function generatePasswordResetToken(email: string): Promise<string | null> {
  try {
    const user = await sql`
      SELECT id FROM users WHERE email = ${email}
    `

    if (user.length === 0) {
      return null
    }

    const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    const expiresAt = new Date(Date.now() + 3600000) // 1 hour

    await sql`
      INSERT INTO password_reset_tokens (user_id, token, expires_at)
      VALUES (${user[0].id}, ${token}, ${expiresAt})
    `

    return token
  } catch (error) {
    console.error("Generate reset token error:", error)
    return null
  }
}
