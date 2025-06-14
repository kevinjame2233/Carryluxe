import Link from "next/link"
import { CheckCircle, Package, Truck, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function OrderConfirmationPage() {
  const orderNumber = "ORD-" + Math.random().toString(36).substr(2, 9).toUpperCase()
  const estimatedDelivery = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()

  return (
    <div className="min-h-screen bg-cream-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h1 className="font-playfair text-4xl font-bold text-charcoal-900 mb-4">Order Confirmed!</h1>
          <p className="text-charcoal-800 text-lg">
            Thank you for your purchase. Your order has been successfully placed.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Order Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-charcoal-800">Order Number</p>
                <p className="font-semibold text-lg">{orderNumber}</p>
              </div>
              <div>
                <p className="text-sm text-charcoal-800">Order Date</p>
                <p className="font-semibold">{new Date().toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm text-charcoal-800">Total Amount</p>
                <p className="font-semibold text-lg">$6,642.00</p>
              </div>
              <div>
                <p className="text-sm text-charcoal-800">Payment Method</p>
                <p className="font-semibold">•••• •••• •••• 3456</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Delivery Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-charcoal-800">Estimated Delivery</p>
                <p className="font-semibold text-lg">{estimatedDelivery}</p>
              </div>
              <div>
                <p className="text-sm text-charcoal-800">Shipping Address</p>
                <div className="font-semibold">
                  <p>John Doe</p>
                  <p>123 Luxury Lane</p>
                  <p>Beverly Hills, CA 90210</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-charcoal-800">Shipping Method</p>
                <p className="font-semibold">Express Delivery (Free)</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-cream-200">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-cream-100 rounded"></div>
                  <div>
                    <p className="font-semibold">Elegance Tote</p>
                    <p className="text-sm text-charcoal-800">Black • Quantity: 1</p>
                  </div>
                </div>
                <p className="font-semibold">$2,850</p>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-cream-200">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-cream-100 rounded"></div>
                  <div>
                    <p className="font-semibold">Heritage Clutch</p>
                    <p className="text-sm text-charcoal-800">Gold • Quantity: 2</p>
                  </div>
                </div>
                <p className="font-semibold">$3,300</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="bg-cream-100 rounded-lg p-6 mb-8">
          <h3 className="font-semibold text-charcoal-900 mb-4">What happens next?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3">
              <Package className="h-8 w-8 text-gold-400" />
              <div>
                <p className="font-semibold">Order Processing</p>
                <p className="text-sm text-charcoal-800">1-2 business days</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Truck className="h-8 w-8 text-gold-400" />
              <div>
                <p className="font-semibold">Shipping</p>
                <p className="text-sm text-charcoal-800">3-5 business days</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Home className="h-8 w-8 text-gold-400" />
              <div>
                <p className="font-semibold">Delivery</p>
                <p className="text-sm text-charcoal-800">Signature required</p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center space-y-4">
          <p className="text-charcoal-800">We'll send you tracking information via email once your order ships.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/account">
              <Button variant="outline" size="lg">
                Track Your Order
              </Button>
            </Link>
            <Link href="/">
              <Button size="lg" className="bg-charcoal-900 hover:bg-charcoal-800">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
