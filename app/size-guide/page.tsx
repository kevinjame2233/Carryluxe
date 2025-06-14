"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Ruler, Info } from "lucide-react"

export default function SizeGuidePage() {
  return (
    <div className="min-h-screen bg-cream-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-charcoal-900 mb-6">Size Guide</h1>
          <p className="text-xl text-charcoal-800 max-w-3xl mx-auto">
            Find your perfect fit with our comprehensive size guide for handbags, accessories, and more.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12"
        >
          <Card>
            <CardHeader>
              <CardTitle className="font-playfair text-2xl flex items-center">
                <Ruler className="h-6 w-6 text-gold-400 mr-3" />
                How to Measure
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold text-charcoal-900 mb-4">Handbag Measurements</h3>
                  <ul className="space-y-2 text-charcoal-800">
                    <li>
                      <strong>Length:</strong> Measure from left to right at the widest point
                    </li>
                    <li>
                      <strong>Height:</strong> Measure from bottom to top, excluding handles
                    </li>
                    <li>
                      <strong>Depth:</strong> Measure from front to back at the deepest point
                    </li>
                    <li>
                      <strong>Handle Drop:</strong> Measure from top of bag to bottom of handle
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-charcoal-900 mb-4">Strap Measurements</h3>
                  <ul className="space-y-2 text-charcoal-800">
                    <li>
                      <strong>Adjustable Straps:</strong> Minimum to maximum length
                    </li>
                    <li>
                      <strong>Fixed Straps:</strong> Total length from end to end
                    </li>
                    <li>
                      <strong>Chain Straps:</strong> Measured when laid flat
                    </li>
                    <li>
                      <strong>Width:</strong> Measured at the widest point
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="font-playfair text-2xl">Handbag Sizes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-cream-200">
                        <th className="text-left py-2 font-semibold">Size</th>
                        <th className="text-left py-2 font-semibold">Length</th>
                        <th className="text-left py-2 font-semibold">Height</th>
                        <th className="text-left py-2 font-semibold">Depth</th>
                      </tr>
                    </thead>
                    <tbody className="text-charcoal-800">
                      <tr className="border-b border-cream-100">
                        <td className="py-2 font-medium">Mini</td>
                        <td className="py-2">6-8"</td>
                        <td className="py-2">4-6"</td>
                        <td className="py-2">2-3"</td>
                      </tr>
                      <tr className="border-b border-cream-100">
                        <td className="py-2 font-medium">Small</td>
                        <td className="py-2">8-10"</td>
                        <td className="py-2">6-8"</td>
                        <td className="py-2">3-4"</td>
                      </tr>
                      <tr className="border-b border-cream-100">
                        <td className="py-2 font-medium">Medium</td>
                        <td className="py-2">10-12"</td>
                        <td className="py-2">8-10"</td>
                        <td className="py-2">4-5"</td>
                      </tr>
                      <tr className="border-b border-cream-100">
                        <td className="py-2 font-medium">Large</td>
                        <td className="py-2">12-14"</td>
                        <td className="py-2">10-12"</td>
                        <td className="py-2">5-6"</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-medium">Extra Large</td>
                        <td className="py-2">14"+</td>
                        <td className="py-2">12"+</td>
                        <td className="py-2">6"+</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="font-playfair text-2xl">Wallet & Accessory Sizes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-cream-200">
                        <th className="text-left py-2 font-semibold">Item</th>
                        <th className="text-left py-2 font-semibold">Length</th>
                        <th className="text-left py-2 font-semibold">Height</th>
                        <th className="text-left py-2 font-semibold">Depth</th>
                      </tr>
                    </thead>
                    <tbody className="text-charcoal-800">
                      <tr className="border-b border-cream-100">
                        <td className="py-2 font-medium">Card Holder</td>
                        <td className="py-2">4"</td>
                        <td className="py-2">3"</td>
                        <td className="py-2">0.5"</td>
                      </tr>
                      <tr className="border-b border-cream-100">
                        <td className="py-2 font-medium">Compact Wallet</td>
                        <td className="py-2">4.5"</td>
                        <td className="py-2">3.5"</td>
                        <td className="py-2">1"</td>
                      </tr>
                      <tr className="border-b border-cream-100">
                        <td className="py-2 font-medium">Long Wallet</td>
                        <td className="py-2">7.5"</td>
                        <td className="py-2">4"</td>
                        <td className="py-2">1"</td>
                      </tr>
                      <tr className="border-b border-cream-100">
                        <td className="py-2 font-medium">Clutch</td>
                        <td className="py-2">8-12"</td>
                        <td className="py-2">5-7"</td>
                        <td className="py-2">1-2"</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-medium">Pouch</td>
                        <td className="py-2">6-10"</td>
                        <td className="py-2">4-6"</td>
                        <td className="py-2">2-3"</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-12"
        >
          <Card>
            <CardHeader>
              <CardTitle className="font-playfair text-2xl">Size Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-semibold text-charcoal-900 mb-3">Everyday Use</h3>
                  <ul className="space-y-2 text-charcoal-800">
                    <li>
                      <strong>Tote Bags:</strong> Medium to Large
                    </li>
                    <li>
                      <strong>Crossbody:</strong> Small to Medium
                    </li>
                    <li>
                      <strong>Shoulder Bags:</strong> Medium
                    </li>
                    <li>
                      <strong>Backpacks:</strong> Medium to Large
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-charcoal-900 mb-3">Evening & Special Events</h3>
                  <ul className="space-y-2 text-charcoal-800">
                    <li>
                      <strong>Clutches:</strong> Small to Medium
                    </li>
                    <li>
                      <strong>Evening Bags:</strong> Mini to Small
                    </li>
                    <li>
                      <strong>Chain Bags:</strong> Small
                    </li>
                    <li>
                      <strong>Wristlets:</strong> Mini
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-charcoal-900 mb-3">Travel & Work</h3>
                  <ul className="space-y-2 text-charcoal-800">
                    <li>
                      <strong>Work Totes:</strong> Large to Extra Large
                    </li>
                    <li>
                      <strong>Laptop Bags:</strong> Large
                    </li>
                    <li>
                      <strong>Travel Bags:</strong> Extra Large
                    </li>
                    <li>
                      <strong>Weekenders:</strong> Extra Large
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="font-playfair text-2xl flex items-center">
                <Info className="h-6 w-6 text-gold-400 mr-3" />
                Sizing Tips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-charcoal-900 mb-3">Consider Your Lifestyle</h3>
                  <ul className="space-y-2 text-charcoal-800">
                    <li>• Think about what you typically carry daily</li>
                    <li>• Consider your body frame and proportions</li>
                    <li>• Factor in comfort for extended wear</li>
                    <li>• Think about versatility across occasions</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-charcoal-900 mb-3">Still Unsure?</h3>
                  <p className="text-charcoal-800 mb-3">
                    Our customer service team is here to help you find the perfect size. Contact us with any questions
                    about sizing or fit.
                  </p>
                  <div className="space-y-1 text-sm text-charcoal-800">
                    <p>
                      <strong>Email:</strong> sizing@carryluxe.com
                    </p>
                    <p>
                      <strong>Phone:</strong> +1 (555) 123-4567
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
