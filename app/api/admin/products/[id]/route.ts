import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"
import { verifyToken } from "@/lib/auth"

const sql = neon(process.env.DATABASE_URL!)

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
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
    const productId = params.id

    const result = await sql`
      UPDATE products SET
        name = ${productData.name},
        price = ${productData.price},
        description = ${productData.description},
        category = ${productData.category},
        colors = ${JSON.stringify(productData.colors)},
        in_stock = ${productData.inStock},
        featured = ${productData.featured},
        new_arrival = ${productData.newArrival},
        main_image = ${productData.image},
        gallery_images = ${JSON.stringify(productData.images)},
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${productId}
      RETURNING id, name, price, description, category, colors, in_stock, 
                featured, new_arrival, main_image, gallery_images, updated_at
    `

    if (result.length === 0) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    const updatedProduct = {
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
      updatedAt: result[0].updated_at,
    }

    return NextResponse.json({ success: true, data: updatedProduct, message: "Product updated successfully" })
  } catch (error) {
    console.error("Update product error:", error)
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
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

    const productId = params.id

    const result = await sql`
      DELETE FROM products WHERE id = ${productId}
      RETURNING id
    `

    if (result.length === 0) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, message: "Product deleted successfully" })
  } catch (error) {
    console.error("Delete product error:", error)
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 })
  }
}
