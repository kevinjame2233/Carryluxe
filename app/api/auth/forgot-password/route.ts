import { type NextRequest, NextResponse } from "next/server"
import { generatePasswordResetToken } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    const token = await generatePasswordResetToken(email)

    if (!token) {
      return NextResponse.json({ error: "Email not found" }, { status: 404 })
    }

    // In a real app, you would send an email here
    console.log(`Password reset token for ${email}: ${token}`)

    return NextResponse.json({
      success: true,
      message: "Password reset email sent",
    })
  } catch (error) {
    console.error("Forgot password error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
