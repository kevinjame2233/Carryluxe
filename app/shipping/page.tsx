"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Truck, Clock, Globe, Shield } from "lucide-react"

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-cream-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-charcoal-900 mb-6">Shipping Information</h1>
          <p className="text-xl text-charcoal-800 max-w-3xl mx-auto">
            We offer secure, reliable shipping options to ensure your luxury items arrive safely and on time.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card className="text-center h-full">
              <CardHeader>
                <Truck className="h-12 w-12 text-gold-400 mx-auto mb-4" />
                <CardTitle>Free Shipping</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-charcoal-800">
                  Complimentary shipping on all orders over $500 within the continental US.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="text-center h-full">
              <CardHeader>
                <Clock className="h-12 w-12 text-gold-400 mx-auto mb-4" />
                <CardTitle>Fast Delivery</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-charcoal-800">Express shipping available with delivery in 1-2 business days.</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="text-center h-full">
              <CardHeader>
                <Globe className="h-12 w-12 text-gold-400 mx-auto mb-4" />
                <CardTitle>Worldwide</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-charcoal-800">International shipping available to over 100 countries worldwide.</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="text-center h-full">
              <CardHeader>
                <Shield className="h-12 w-12 text-gold-400 mx-auto mb-4" />
                <CardTitle>Secure Packaging</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-charcoal-800">Premium packaging and insurance included on all shipments.</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="font-playfair text-2xl">Domestic Shipping (US)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-b border-cream-200 pb-4">
                  <h3 className="font-semibold text-charcoal-900 mb-2">Standard Shipping (5-7 business days)</h3>
                  <p className="text-charcoal-800">$15.00 - Free on orders over $500</p>
                </div>
                <div className="border-b border-cream-200 pb-4">
                  <h3 className="font-semibold text-charcoal-900 mb-2">Express Shipping (2-3 business days)</h3>
                  <p className="text-charcoal-800">$25.00</p>
                </div>
                <div className="border-b border-cream-200 pb-4">
                  <h3 className="font-semibold text-charcoal-900 mb-2">Overnight Shipping (1 business day)</h3>
                  <p className="text-charcoal-800">$45.00</p>
                </div>
                <div>
                  <h3 className="font-semibold text-charcoal-900 mb-2">White Glove Delivery</h3>
                  <p className="text-charcoal-800">$75.00 - Premium service with signature confirmation</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="font-playfair text-2xl">International Shipping</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-b border-cream-200 pb-4">
                  <h3 className="font-semibold text-charcoal-900 mb-2">Canada & Mexico (7-10 business days)</h3>
                  <p className="text-charcoal-800">$35.00</p>
                </div>
                <div className="border-b border-cream-200 pb-4">
                  <h3 className="font-semibold text-charcoal-900 mb-2">Europe & UK (10-14 business days)</h3>
                  <p className="text-charcoal-800">$55.00</p>
                </div>
                <div className="border-b border-cream-200 pb-4">
                  <h3 className="font-semibold text-charcoal-900 mb-2">Asia Pacific (12-16 business days)</h3>
                  <p className="text-charcoal-800">$65.00</p>
                </div>
                <div>
                  <h3 className="font-semibold text-charcoal-900 mb-2">Rest of World (14-21 business days)</h3>
                  <p className="text-charcoal-800">$75.00</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-12"
        >
          <Card>
            <CardHeader>
              <CardTitle className="font-playfair text-2xl">Important Shipping Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-charcoal-900 mb-2">Processing Time</h3>
                <p className="text-charcoal-800">
                  All orders are processed within 1-2 business days. Orders placed on weekends or holidays will be
                  processed the next business day.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-charcoal-900 mb-2">Tracking Information</h3>
                <p className="text-charcoal-800">
                  You will receive a tracking number via email once your order ships. You can track your package on our
                  website or the carrier's website.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-charcoal-900 mb-2">Customs and Duties</h3>
                <p className="text-charcoal-800">
                  International customers are responsible for any customs duties, taxes, or fees imposed by their
                  country. These charges are not included in our shipping costs.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-charcoal-900 mb-2">Delivery Issues</h3>
                <p className="text-charcoal-800">
                  If you experience any issues with your delivery, please contact our customer service team at
                  shipping@carryluxe.com or +1 (555) 123-4567.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
