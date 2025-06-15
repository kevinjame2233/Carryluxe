import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const orderData = await request.json()

    // Generate unique order ID
    const orderId = `CL-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`

    // Create order object
    const order = {
      id: orderId,
      ...orderData,
      status: "pending",
      createdAt: new Date().toISOString(),
    }

    // Send email notification to admin
    const emailResponse = await fetch(`${request.nextUrl.origin}/api/send-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: "carryluxe3@gmail.com",
        subject: `New Order Received - ${orderId}`,
        orderData: order,
      }),
    })

    if (!emailResponse.ok) {
      console.error("Failed to send email notification")
    }

    return NextResponse.json({ success: true, orderId })
  } catch (error) {
    console.error("Order creation error:", error)
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 })
  }
}
