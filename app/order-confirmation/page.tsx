"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { CheckCircle, Download, Mail, MessageCircle, Package, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import jsPDF from "jspdf"

export default function OrderConfirmationPage() {
  const [orderData, setOrderData] = useState(null)

  useEffect(() => {
    // Get order data from localStorage or URL params
    const savedOrder = localStorage.getItem("last-order")
    if (savedOrder) {
      setOrderData(JSON.parse(savedOrder))
    } else {
      // Mock order data for demo
      setOrderData({
        id: `CL-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
        date: new Date().toLocaleDateString(),
        customer: {
          firstName: "John",
          lastName: "Doe",
          email: "john@example.com",
        },
        items: [
          {
            product: { name: "Hermès Birkin 30", price: 12000 },
            color: "Black",
            quantity: 1,
          },
        ],
        total: 12000,
      })
    }
  }, [])

  const generatePDF = () => {
    if (!orderData) return

    const doc = new jsPDF()

    // Header
    doc.setFontSize(24)
    doc.setFont("helvetica", "bold")
    doc.text("CarryLuxe", 20, 30)

    doc.setFontSize(16)
    doc.text("Order Confirmation", 20, 45)

    // Order details
    doc.setFontSize(12)
    doc.setFont("helvetica", "normal")
    doc.text(`Order ID: ${orderData.id}`, 20, 65)
    doc.text(`Date: ${orderData.date}`, 20, 75)
    doc.text(`Customer: ${orderData.customer.firstName} ${orderData.customer.lastName}`, 20, 85)
    doc.text(`Email: ${orderData.customer.email}`, 20, 95)

    // Items
    doc.setFont("helvetica", "bold")
    doc.text("Order Items:", 20, 115)

    doc.setFont("helvetica", "normal")
    let yPos = 125
    orderData.items.forEach((item, index) => {
      doc.text(`${index + 1}. ${item.product.name}`, 25, yPos)
      doc.text(`   Color: ${item.color}`, 25, yPos + 10)
      doc.text(`   Quantity: ${item.quantity}`, 25, yPos + 20)
      doc.text(`   Price: $${item.product.price.toLocaleString()}`, 25, yPos + 30)
      yPos += 50
    })

    // Total
    doc.setFont("helvetica", "bold")
    doc.text(`Total: $${orderData.total.toLocaleString()}`, 20, yPos + 20)

    // Footer
    doc.setFontSize(10)
    doc.setFont("helvetica", "normal")
    doc.text("Thank you for choosing CarryLuxe!", 20, yPos + 40)
    doc.text("For questions, contact us at carryluxe3@gmail.com", 20, yPos + 50)

    doc.save(`CarryLuxe-Order-${orderData.id}.pdf`)
  }

  if (!orderData) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gold-400"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6"
          >
            <CheckCircle className="h-10 w-10 text-green-600" />
          </motion.div>

          <h1 className="font-playfair text-4xl font-bold text-charcoal-900 mb-4">Order Confirmed!</h1>
          <p className="text-lg text-charcoal-800 mb-2">Thank you for your purchase, {orderData.customer.firstName}!</p>
          <p className="text-charcoal-600">
            Your order has been received and we'll send you payment instructions shortly.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Details */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Package className="h-5 w-5" />
                  <span>Order Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-cream-200">
                  <span className="text-sm text-charcoal-800">Order ID</span>
                  <span className="font-semibold">{orderData.id}</span>
                </div>

                <div className="flex justify-between items-center pb-2 border-b border-cream-200">
                  <span className="text-sm text-charcoal-800">Date</span>
                  <span className="font-semibold">{orderData.date}</span>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-charcoal-900">Items Ordered:</h4>
                  {orderData.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{item.product.name}</p>
                        <p className="text-sm text-charcoal-800">
                          Color: {item.color} • Qty: {item.quantity}
                        </p>
                      </div>
                      <span className="font-semibold">${(item.product.price * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-cream-200">
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>Total</span>
                    <span>${orderData.total.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            {/* Download Certificate */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Download className="h-5 w-5" />
                  <span>Order Certificate</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-charcoal-800 mb-4">
                  Download your order confirmation certificate for your records.
                </p>
                <Button onClick={generatePDF} className="w-full bg-charcoal-900 hover:bg-charcoal-800">
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF Certificate
                </Button>
              </CardContent>
            </Card>

            {/* Next Steps */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5" />
                  <span>What's Next?</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-gold-400 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    1
                  </div>
                  <div>
                    <p className="font-medium">Payment Instructions</p>
                    <p className="text-sm text-charcoal-800">We'll email you payment details within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-gold-400 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    2
                  </div>
                  <div>
                    <p className="font-medium">Processing</p>
                    <p className="text-sm text-charcoal-800">Your order will be processed once payment is confirmed</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-gold-400 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    3
                  </div>
                  <div>
                    <p className="font-medium">Delivery</p>
                    <p className="text-sm text-charcoal-800">Free shipping with tracking information provided</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Support */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageCircle className="h-5 w-5" />
                  <span>Need Help?</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-charcoal-800">Have questions about your order? We're here to help!</p>

                <div className="flex space-x-3">
                  <a
                    href="https://wa.me/16188509790?text=Hi%20CarryLuxe,%20I%20have%20a%20question%20about%20my%20order"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                  >
                    <Button variant="outline" className="w-full bg-transparent">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      WhatsApp
                    </Button>
                  </a>

                  <a href="mailto:carryluxe3@gmail.com?subject=Order%20Question" className="flex-1">
                    <Button variant="outline" className="w-full bg-transparent">
                      <Mail className="h-4 w-4 mr-2" />
                      Email
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Continue Shopping */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <Link href="/products">
            <Button
              size="lg"
              variant="outline"
              className="border-charcoal-900 text-charcoal-900 hover:bg-charcoal-900 hover:text-white bg-transparent"
            >
              Continue Shopping
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
