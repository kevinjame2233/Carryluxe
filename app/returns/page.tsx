"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RefreshCw, Shield, Clock, CheckCircle } from "lucide-react"

export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-cream-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-charcoal-900 mb-6">Returns & Exchanges</h1>
          <p className="text-xl text-charcoal-800 max-w-3xl mx-auto">
            We want you to love your CarryLuxe purchase. If you're not completely satisfied, we offer flexible return
            and exchange options.
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
                <Clock className="h-12 w-12 text-gold-400 mx-auto mb-4" />
                <CardTitle>30-Day Returns</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-charcoal-800">Return items within 30 days of delivery for a full refund.</p>
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
                <RefreshCw className="h-12 w-12 text-gold-400 mx-auto mb-4" />
                <CardTitle>Free Exchanges</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-charcoal-800">Exchange for a different size or color at no additional cost.</p>
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
                <Shield className="h-12 w-12 text-gold-400 mx-auto mb-4" />
                <CardTitle>Quality Guarantee</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-charcoal-800">All items are inspected for quality before shipping.</p>
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
                <CheckCircle className="h-12 w-12 text-gold-400 mx-auto mb-4" />
                <CardTitle>Easy Process</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-charcoal-800">Simple online return process with prepaid shipping labels.</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="font-playfair text-2xl">Return Policy</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-charcoal-900 mb-2">Eligible Items</h3>
                  <ul className="list-disc list-inside text-charcoal-800 space-y-1">
                    <li>Items in original condition with tags attached</li>
                    <li>Unused items with original packaging</li>
                    <li>Items returned within 30 days of delivery</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-charcoal-900 mb-2">Non-Returnable Items</h3>
                  <ul className="list-disc list-inside text-charcoal-800 space-y-1">
                    <li>Personalized or custom-made items</li>
                    <li>Items damaged by normal wear and tear</li>
                    <li>Items without original tags or packaging</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-charcoal-900 mb-2">Refund Processing</h3>
                  <p className="text-charcoal-800">
                    Refunds are processed within 5-7 business days after we receive your return. The refund will be
                    credited to your original payment method.
                  </p>
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
                <CardTitle className="font-playfair text-2xl">How to Return</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="bg-gold-400 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">
                      1
                    </div>
                    <div>
                      <h4 className="font-semibold text-charcoal-900">Start Your Return</h4>
                      <p className="text-charcoal-800 text-sm">
                        Log into your account and select the items you'd like to return.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="bg-gold-400 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">
                      2
                    </div>
                    <div>
                      <h4 className="font-semibold text-charcoal-900">Print Return Label</h4>
                      <p className="text-charcoal-800 text-sm">We'll email you a prepaid return shipping label.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="bg-gold-400 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">
                      3
                    </div>
                    <div>
                      <h4 className="font-semibold text-charcoal-900">Package & Ship</h4>
                      <p className="text-charcoal-800 text-sm">
                        Pack items in original packaging and attach the return label.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="bg-gold-400 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">
                      4
                    </div>
                    <div>
                      <h4 className="font-semibold text-charcoal-900">Get Your Refund</h4>
                      <p className="text-charcoal-800 text-sm">
                        Once we receive your return, we'll process your refund.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="font-playfair text-2xl">Exchange Policy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-charcoal-900 mb-2">Size Exchanges</h3>
                <p className="text-charcoal-800">
                  If you need a different size, we offer free exchanges within 30 days. Simply follow the return process
                  and select "Exchange" instead of "Return" when starting your request.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-charcoal-900 mb-2">Color Exchanges</h3>
                <p className="text-charcoal-800">
                  Want a different color? No problem! Exchange for any available color in the same style at no
                  additional cost, subject to availability.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-charcoal-900 mb-2">Style Exchanges</h3>
                <p className="text-charcoal-800">
                  You can exchange for a different style of equal or lesser value. If the new item costs more, you'll be
                  charged the difference. If it costs less, we'll refund the difference.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-12 text-center bg-white rounded-lg p-8"
        >
          <h2 className="font-playfair text-2xl font-bold text-charcoal-900 mb-4">Need Help?</h2>
          <p className="text-charcoal-800 mb-4">
            Our customer service team is here to help with any questions about returns or exchanges.
          </p>
          <div className="space-y-2">
            <p className="text-charcoal-800">
              <strong>Email:</strong> returns@carryluxe.com
            </p>
            <p className="text-charcoal-800">
              <strong>Phone:</strong> +1 (555) 123-4567
            </p>
            <p className="text-charcoal-800">
              <strong>Hours:</strong> Monday - Friday, 9AM - 6PM PST
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
