import { type NextRequest, NextResponse } from "next/server"
import { put } from "@vercel/blob"
import { verifyToken } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    // Check authentication for admin access
    const authHeader = request.headers.get("authorization")
    const cookieToken = request.cookies.get("auth-token")?.value

    let token = null

    // Try to get token from Authorization header first
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.substring(7)
    }
    // Fallback to cookie
    else if (cookieToken) {
      token = cookieToken
    }

    if (!token) {
      console.log("No token found in request")
      return NextResponse.json({ error: "Not authenticated - no token provided" }, { status: 401 })
    }

    const decoded = verifyToken(token)
    if (!decoded) {
      console.log("Invalid token")
      return NextResponse.json({ error: "Not authenticated - invalid token" }, { status: 401 })
    }

    if (decoded.role !== "admin") {
      console.log("User role:", decoded.role, "Required: admin")
      return NextResponse.json({ error: "Admin access required" }, { status: 403 })
    }

    console.log("Authentication successful for user:", decoded.email)

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
      "video/avi",
      "video/quicktime",
    ]

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        {
          error: `Invalid file type: ${file.type}. Only images (JPEG, PNG, WebP, GIF) and videos (MP4, WebM, MOV, AVI) are allowed.`,
        },
        { status: 400 },
      )
    }

    // Validate file size (50MB limit for videos, 10MB for images)
    const maxSize = file.type.startsWith("video/") ? 50 * 1024 * 1024 : 10 * 1024 * 1024
    if (file.size > maxSize) {
      const maxSizeMB = file.type.startsWith("video/") ? "50MB" : "10MB"
      return NextResponse.json(
        {
          error: `File too large. Maximum size is ${maxSizeMB}.`,
        },
        { status: 400 },
      )
    }

    // Generate unique filename
    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(2, 15)
    const fileExtension = file.name.split(".").pop()?.toLowerCase() || "bin"
    const filename = `carryluxe/${timestamp}-${randomString}.${fileExtension}`

    console.log("Uploading file:", filename, "Size:", file.size, "Type:", file.type)

    // Upload to Vercel Blob
    const blob = await put(filename, file, {
      access: "public",
    })

    console.log("Upload successful:", blob.url)

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
        error: `Upload failed: ${error.message || "Unknown error"}`,
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
