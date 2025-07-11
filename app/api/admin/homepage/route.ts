import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"
import { verifyToken } from "@/lib/auth"

const sql = neon(process.env.DATABASE_URL!)

// Default homepage settings
const defaultSettings = {
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
}

export async function GET() {
  try {
    const result = await sql`
      SELECT settings_data FROM homepage_settings 
      WHERE id = 1
    `

    if (result.length === 0) {
      // Create default settings if none exist
      await sql`
        INSERT INTO homepage_settings (id, settings_data)
        VALUES (1, ${JSON.stringify(defaultSettings)})
      `
      return NextResponse.json({ success: true, data: defaultSettings })
    }

    return NextResponse.json({ success: true, data: result[0].settings_data })
  } catch (error) {
    console.error("Get homepage settings error:", error)
    return NextResponse.json({ success: true, data: defaultSettings })
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

    const settingsData = await request.json()

    await sql`
      INSERT INTO homepage_settings (id, settings_data, updated_at)
      VALUES (1, ${JSON.stringify(settingsData)}, CURRENT_TIMESTAMP)
      ON CONFLICT (id) 
      DO UPDATE SET 
        settings_data = ${JSON.stringify(settingsData)},
        updated_at = CURRENT_TIMESTAMP
    `

    return NextResponse.json({
      success: true,
      message: "Homepage settings saved successfully",
      data: settingsData,
    })
  } catch (error) {
    console.error("Save homepage settings error:", error)
    return NextResponse.json({ error: "Failed to save homepage settings" }, { status: 500 })
  }
}
