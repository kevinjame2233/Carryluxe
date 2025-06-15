import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const { to, subject, orderData } = await request.json()

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #2c3e50; border-bottom: 2px solid #f39c12; padding-bottom: 10px;">
          New Order Received - CarryLuxe
        </h1>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h2 style="color: #2c3e50; margin-top: 0;">Order Details</h2>
          <p><strong>Order ID:</strong> ${orderData.id}</p>
          <p><strong>Date:</strong> ${new Date(orderData.createdAt).toLocaleString()}</p>
          <p><strong>Payment Method:</strong> ${orderData.paymentMethod.replace("_", " ").toUpperCase()}</p>
        </div>

        <div style="background-color: #fff; padding: 20px; border: 1px solid #dee2e6; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #2c3e50;">Customer Information</h3>
          <p><strong>Name:</strong> ${orderData.customer.firstName} ${orderData.customer.lastName}</p>
          <p><strong>Email:</strong> ${orderData.customer.email}</p>
          <p><strong>Phone:</strong> ${orderData.customer.phone}</p>
          <p><strong>Address:</strong> ${orderData.customer.address}, ${orderData.customer.city}, ${orderData.customer.state} ${orderData.customer.zipCode}</p>
          ${orderData.customer.notes ? `<p><strong>Notes:</strong> ${orderData.customer.notes}</p>` : ""}
        </div>

        <div style="background-color: #fff; padding: 20px; border: 1px solid #dee2e6; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #2c3e50;">Order Items</h3>
          ${orderData.items
            .map(
              (item) => `
            <div style="border-bottom: 1px solid #eee; padding: 10px 0;">
              <p><strong>${item.product.name}</strong></p>
              <p>Color: ${item.color} | Quantity: ${item.quantity}</p>
              <p>Price: $${(item.product.price * item.quantity).toLocaleString()}</p>
            </div>
          `,
            )
            .join("")}
        </div>

        <div style="background-color: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #2c3e50;">Order Summary</h3>
          <p><strong>Subtotal:</strong> $${orderData.totals.subtotal.toLocaleString()}</p>
          <p><strong>Shipping:</strong> ${orderData.totals.shipping === 0 ? "Free" : `$${orderData.totals.shipping}`}</p>
          <p><strong>Tax:</strong> $${orderData.totals.tax.toFixed(2)}</p>
          <p style="font-size: 18px; font-weight: bold; color: #27ae60;">
            <strong>Total: $${orderData.totals.total.toFixed(2)}</strong>
          </p>
        </div>

        <div style="background-color: #fff3cd; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <h4 style="color: #856404; margin-top: 0;">Next Steps:</h4>
          <ol style="color: #856404;">
            <li>Review the order details above</li>
            <li>Send payment instructions to the customer at: ${orderData.customer.email}</li>
            <li>Process the order once payment is confirmed</li>
          </ol>
        </div>

        <p style="color: #6c757d; font-size: 12px; text-align: center; margin-top: 30px;">
          This email was sent from your CarryLuxe website order system.
        </p>
      </div>
    `

    const { data, error } = await resend.emails.send({
      from: "CarryLuxe Orders <orders@carryluxe.com>",
      to: [to],
      subject: subject,
      html: emailHtml,
    })

    if (error) {
      console.error("Resend error:", error)
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error("Email sending error:", error)
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
  }
}
