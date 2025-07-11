import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"
import { verifyToken } from "@/lib/auth"

const sql = neon(process.env.DATABASE_URL!)

// Default site settings
const defaultSettings = {
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

export async function GET() {
  try {
    const result = await sql`
      SELECT settings_data FROM site_settings 
      WHERE id = 1
    `

    if (result.length === 0) {
      // Create default settings if none exist
      await sql`
        INSERT INTO site_settings (id, settings_data)
        VALUES (1, ${JSON.stringify(defaultSettings)})
      `
      return NextResponse.json({ success: true, data: defaultSettings })
    }

    return NextResponse.json({ success: true, data: result[0].settings_data })
  } catch (error) {
    console.error("Get site settings error:", error)
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
      INSERT INTO site_settings (id, settings_data, updated_at)
      VALUES (1, ${JSON.stringify(settingsData)}, CURRENT_TIMESTAMP)
      ON CONFLICT (id) 
      DO UPDATE SET 
        settings_data = ${JSON.stringify(settingsData)},
        updated_at = CURRENT_TIMESTAMP
    `

    return NextResponse.json({
      success: true,
      message: "Site settings saved successfully",
      data: settingsData,
    })
  } catch (error) {
    console.error("Save site settings error:", error)
    return NextResponse.json({ error: "Failed to save site settings" }, { status: 500 })
  }
}
