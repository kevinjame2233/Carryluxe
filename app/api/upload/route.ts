import { type NextRequest, NextResponse } from "next/server"
import { put } from "@vercel/blob"
import { verifyToken } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    // Check authentication for admin access
    const token = request.cookies.get("auth-token")?.value
    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    const decoded = verifyToken(token)
    if (!decoded || decoded.role !== "admin") {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 })
    }

    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Validate file type
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
      "image/gif",
      "video/mp4",
      "video/webm",
      "video/mov",
    ]

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        {
          error: "Invalid file type. Only images (JPEG, PNG, WebP, GIF) and videos (MP4, WebM, MOV) are allowed.",
        },
        { status: 400 },
      )
    }

    // Validate file size (10MB limit)
    const maxSize = 10 * 1024 * 1024 // 10MB
    if (file.size > maxSize) {
      return NextResponse.json(
        {
          error: "File too large. Maximum size is 10MB.",
        },
        { status: 400 },
      )
    }

    // Generate unique filename
    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(2, 15)
    const fileExtension = file.name.split(".").pop()
    const filename = `carryluxe/${timestamp}-${randomString}.${fileExtension}`

    // Upload to Vercel Blob
    const blob = await put(filename, file, {
      access: "public",
      handleUploadUrl: "/api/upload",
    })

    return NextResponse.json({
      success: true,
      url: blob.url,
      filename: file.name,
      size: file.size,
      type: file.type,
      blobUrl: blob.url,
    })
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json(
      {
        error: "Upload failed. Please try again.",
      },
      { status: 500 },
    )
  }
}

// Handle blob upload callback
export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const filename = searchParams.get("filename")

    if (!filename) {
      return NextResponse.json({ error: "Filename required" }, { status: 400 })
    }

    // This endpoint is called by Vercel Blob during upload
    // We don't need to do anything special here
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Blob callback error:", error)
    return NextResponse.json({ error: "Callback failed" }, { status: 500 })
  }
}
