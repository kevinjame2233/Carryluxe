import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"
import { verifyToken } from "@/lib/auth"

const sql = process.env.DATABASE_URL ? neon(process.env.DATABASE_URL) : null

export async function GET() {
  try {
    if (!sql) {
      return NextResponse.json({ error: "Database not configured" }, { status: 500 })
    }

    const result = await sql`
      SELECT 
        hero_title,
        hero_subtitle,
        hero_media,
        hermes_title,
        hermes_description,
        hermes_image,
        lv_title,
        lv_description,
        lv_image,
        shop_by_icon_title,
        shop_by_icon_subtitle,
        trending_title,
        trending_subtitle,
        cta_title,
        cta_description
      FROM homepage_settings 
      ORDER BY id DESC 
      LIMIT 1
    `

    if (result.length === 0) {
      // Return default settings if none exist
      return NextResponse.json({
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
    }

    const settings = result[0]

    return NextResponse.json({
      heroTitle: settings.hero_title,
      heroSubtitle: settings.hero_subtitle,
      heroMedia: settings.hero_media || [],
      hermesTitle: settings.hermes_title,
      hermesDescription: settings.hermes_description,
      hermesImage: settings.hermes_image,
      lvTitle: settings.lv_title,
      lvDescription: settings.lv_description,
      lvImage: settings.lv_image,
      shopByIconTitle: settings.shop_by_icon_title,
      shopByIconSubtitle: settings.shop_by_icon_subtitle,
      trendingTitle: settings.trending_title,
      trendingSubtitle: settings.trending_subtitle,
      ctaTitle: settings.cta_title,
      ctaDescription: settings.cta_description,
    })
  } catch (error) {
    console.error("Get homepage settings error:", error)
    return NextResponse.json({ error: "Failed to fetch homepage settings" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    if (!sql) {
      return NextResponse.json({ error: "Database not configured" }, { status: 500 })
    }

    const token = request.cookies.get("auth-token")?.value

    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    const decoded = verifyToken(token)
    if (!decoded || decoded.role !== "admin") {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 })
    }

    const {
      heroTitle,
      heroSubtitle,
      heroMedia,
      hermesTitle,
      hermesDescription,
      hermesImage,
      lvTitle,
      lvDescription,
      lvImage,
      shopByIconTitle,
      shopByIconSubtitle,
      trendingTitle,
      trendingSubtitle,
      ctaTitle,
      ctaDescription,
    } = await request.json()

    // Validate required fields
    if (!heroTitle || !heroSubtitle) {
      return NextResponse.json({ error: "Hero title and subtitle are required" }, { status: 400 })
    }

    // Validate hero media URLs (ensure they're not base64 data)
    if (heroMedia && Array.isArray(heroMedia)) {
      for (const media of heroMedia) {
        if (media.url && media.url.startsWith("data:")) {
          return NextResponse.json(
            {
              error: "Base64 data URLs are not allowed. Please upload images to cloud storage first.",
            },
            { status: 400 },
          )
        }
      }
    }

    // Validate image URLs (ensure they're not base64 data)
    const imageFields = [hermesImage, lvImage]
    for (const imageUrl of imageFields) {
      if (imageUrl && imageUrl.startsWith("data:")) {
        return NextResponse.json(
          {
            error: "Base64 data URLs are not allowed. Please upload images to cloud storage first.",
          },
          { status: 400 },
        )
      }
    }

    // Check if settings exist
    const existingSettings = await sql`
      SELECT id FROM homepage_settings ORDER BY id DESC LIMIT 1
    `

    if (existingSettings.length > 0) {
      // Update existing settings
      await sql`
        UPDATE homepage_settings 
        SET 
          hero_title = ${heroTitle},
          hero_subtitle = ${heroSubtitle},
          hero_media = ${JSON.stringify(heroMedia || [])}::jsonb,
          hermes_title = ${hermesTitle},
          hermes_description = ${hermesDescription},
          hermes_image = ${hermesImage},
          lv_title = ${lvTitle},
          lv_description = ${lvDescription},
          lv_image = ${lvImage},
          shop_by_icon_title = ${shopByIconTitle},
          shop_by_icon_subtitle = ${shopByIconSubtitle},
          trending_title = ${trendingTitle},
          trending_subtitle = ${trendingSubtitle},
          cta_title = ${ctaTitle},
          cta_description = ${ctaDescription},
          updated_at = CURRENT_TIMESTAMP
        WHERE id = ${existingSettings[0].id}
      `
    } else {
      // Insert new settings
      await sql`
        INSERT INTO homepage_settings (
          hero_title,
          hero_subtitle,
          hero_media,
          hermes_title,
          hermes_description,
          hermes_image,
          lv_title,
          lv_description,
          lv_image,
          shop_by_icon_title,
          shop_by_icon_subtitle,
          trending_title,
          trending_subtitle,
          cta_title,
          cta_description
        ) VALUES (
          ${heroTitle},
          ${heroSubtitle},
          ${JSON.stringify(heroMedia || [])}::jsonb,
          ${hermesTitle},
          ${hermesDescription},
          ${hermesImage},
          ${lvTitle},
          ${lvDescription},
          ${lvImage},
          ${shopByIconTitle},
          ${shopByIconSubtitle},
          ${trendingTitle},
          ${trendingSubtitle},
          ${ctaTitle},
          ${ctaDescription}
        )
      `
    }

    return NextResponse.json({ success: true, message: "Homepage settings saved successfully" })
  } catch (error) {
    console.error("Save homepage settings error:", error)
    return NextResponse.json({ error: "Failed to save homepage settings" }, { status: 500 })
  }
}
