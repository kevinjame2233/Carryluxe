import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"
import { verifyToken } from "@/lib/auth"

const sql = neon(process.env.DATABASE_URL!)

export async function GET(request: NextRequest) {
  try {
    const products = await sql`
      SELECT 
        id,
        name,
        price,
        description,
        category,
        colors,
        in_stock,
        featured,
        new_arrival,
        main_image,
        gallery_images,
        created_at,
        updated_at
      FROM products 
      ORDER BY created_at DESC
    `

    const formattedProducts = products.map((product) => ({
      id: product.id,
      name: product.name,
      price: product.price,
      description: product.description,
      category: product.category,
      colors: product.colors || [],
      inStock: product.in_stock,
      featured: product.featured || false,
      newArrival: product.new_arrival || false,
      image: product.main_image,
      images: product.gallery_images || [product.main_image],
      createdAt: product.created_at,
      updatedAt: product.updated_at,
    }))

    return NextResponse.json({ success: true, data: formattedProducts })
  } catch (error) {
    console.error("Get products error:", error)
    return NextResponse.json({ error: "Failed to get products" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    // Verify admin token
    const authHeader = request.headers.get("authorization")
    if (!authHeader) {
      return NextResponse.json({ error: "No authorization header" }, { status: 401 })
    }

    const token = authHeader.replace("Bearer ", "")
    const decoded = verifyToken(token)

    if (!decoded || decoded.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const productData = await request.json()

    const result = await sql`
      INSERT INTO products (
        name, price, description, category, colors, in_stock, 
        featured, new_arrival, main_image, gallery_images
      )
      VALUES (
        ${productData.name},
        ${productData.price},
        ${productData.description},
        ${productData.category},
        ${JSON.stringify(productData.colors)},
        ${productData.inStock},
        ${productData.featured},
        ${productData.newArrival},
        ${productData.image},
        ${JSON.stringify(productData.images)}
      )
      RETURNING id, name, price, description, category, colors, in_stock, 
                featured, new_arrival, main_image, gallery_images, created_at
    `

    const newProduct = {
      id: result[0].id,
      name: result[0].name,
      price: result[0].price,
      description: result[0].description,
      category: result[0].category,
      colors: result[0].colors || [],
      inStock: result[0].in_stock,
      featured: result[0].featured || false,
      newArrival: result[0].new_arrival || false,
      image: result[0].main_image,
      images: result[0].gallery_images || [result[0].main_image],
      createdAt: result[0].created_at,
    }

    return NextResponse.json({ success: true, data: newProduct, message: "Product created successfully" })
  } catch (error) {
    console.error("Create product error:", error)
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 })
  }
}
