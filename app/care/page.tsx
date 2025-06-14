"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Droplets, Sun, AlertTriangle } from "lucide-react"

export default function CarePage() {
  return (
    <div className="min-h-screen bg-cream-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-charcoal-900 mb-6">Care Instructions</h1>
          <p className="text-xl text-charcoal-800 max-w-3xl mx-auto">
            Proper care ensures your CarryLuxe pieces maintain their beauty and quality for years to come. Follow these
            guidelines to protect your investment.
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
                <Shield className="h-12 w-12 text-gold-400 mx-auto mb-4" />
                <CardTitle>Protect</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-charcoal-800">Use protective sprays and store properly to prevent damage.</p>
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
                <Droplets className="h-12 w-12 text-gold-400 mx-auto mb-4" />
                <CardTitle>Clean Gently</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-charcoal-800">Use appropriate cleaning methods for different materials.</p>
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
                <Sun className="h-12 w-12 text-gold-400 mx-auto mb-4" />
                <CardTitle>Avoid Sun</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-charcoal-800">Keep away from direct sunlight to prevent fading and cracking.</p>
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
                <AlertTriangle className="h-12 w-12 text-gold-400 mx-auto mb-4" />
                <CardTitle>Handle with Care</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-charcoal-800">Avoid overstuffing and rough handling to maintain shape.</p>
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
                <CardTitle className="font-playfair text-2xl">Leather Care</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-charcoal-900 mb-2">Daily Care</h3>
                  <ul className="list-disc list-inside text-charcoal-800 space-y-1">
                    <li>Wipe with a soft, dry cloth after each use</li>
                    <li>Allow leather to breathe - don't store in plastic</li>
                    <li>Rotate use between bags to prevent overuse</li>
                    <li>Keep away from heat sources and direct sunlight</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-charcoal-900 mb-2">Deep Cleaning</h3>
                  <ul className="list-disc list-inside text-charcoal-800 space-y-1">
                    <li>Use leather-specific cleaners only</li>
                    <li>Test on an inconspicuous area first</li>
                    <li>Apply conditioner every 3-6 months</li>
                    <li>Professional cleaning for stubborn stains</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-charcoal-900 mb-2">Water Damage</h3>
                  <p className="text-charcoal-800">
                    If your bag gets wet, blot immediately with a clean cloth. Allow to air dry naturally - never use
                    heat. Apply leather conditioner once completely dry.
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
                <CardTitle className="font-playfair text-2xl">Storage Guidelines</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-charcoal-900 mb-2">Proper Storage</h3>
                  <ul className="list-disc list-inside text-charcoal-800 space-y-1">
                    <li>Store in dust bags or cotton pillowcases</li>
                    <li>Stuff with tissue paper to maintain shape</li>
                    <li>Store in a cool, dry place with good ventilation</li>
                    <li>Keep away from direct light and heat</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-charcoal-900 mb-2">What to Avoid</h3>
                  <ul className="list-disc list-inside text-charcoal-800 space-y-1">
                    <li>Plastic bags (can cause mold and mildew)</li>
                    <li>Hanging by straps (can cause stretching)</li>
                    <li>Stacking heavy items on top</li>
                    <li>Storing in damp basements or hot attics</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-charcoal-900 mb-2">Long-term Storage</h3>
                  <p className="text-charcoal-800">
                    For seasonal storage, clean thoroughly, condition if leather, and check periodically. Rotate stored
                    bags occasionally to prevent permanent creasing.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mb-12"
        >
          <Card>
            <CardHeader>
              <CardTitle className="font-playfair text-2xl">Material-Specific Care</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-semibold text-charcoal-900 mb-3">Exotic Leathers</h3>
                  <ul className="space-y-2 text-charcoal-800 text-sm">
                    <li>
                      <strong>Crocodile/Alligator:</strong> Use specialized exotic leather cleaners
                    </li>
                    <li>
                      <strong>Python/Snake:</strong> Gentle cleaning with soft brush
                    </li>
                    <li>
                      <strong>Ostrich:</strong> Professional cleaning recommended
                    </li>
                    <li>
                      <strong>Lizard:</strong> Minimal water exposure
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-charcoal-900 mb-3">Canvas & Fabric</h3>
                  <ul className="space-y-2 text-charcoal-800 text-sm">
                    <li>
                      <strong>Canvas:</strong> Spot clean with mild soap
                    </li>
                    <li>
                      <strong>Nylon:</strong> Machine washable (check label)
                    </li>
                    <li>
                      <strong>Silk:</strong> Professional cleaning only
                    </li>
                    <li>
                      <strong>Suede:</strong> Use suede brush and protector
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-charcoal-900 mb-3">Hardware</h3>
                  <ul className="space-y-2 text-charcoal-800 text-sm">
                    <li>
                      <strong>Gold-plated:</strong> Polish with soft cloth
                    </li>
                    <li>
                      <strong>Silver:</strong> Use silver polish sparingly
                    </li>
                    <li>
                      <strong>Brass:</strong> Clean with brass cleaner
                    </li>
                    <li>
                      <strong>Zippers:</strong> Lubricate with graphite
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
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="font-playfair text-2xl">Professional Services</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold text-charcoal-900 mb-4">When to Seek Professional Help</h3>
                  <ul className="space-y-2 text-charcoal-800">
                    <li>• Deep stains or discoloration</li>
                    <li>• Hardware repair or replacement</li>
                    <li>• Structural damage or torn seams</li>
                    <li>• Color restoration or touch-ups</li>
                    <li>• Zipper replacement</li>
                    <li>• Handle or strap repair</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-charcoal-900 mb-4">CarryLuxe Repair Services</h3>
                  <p className="text-charcoal-800 mb-4">
                    We offer comprehensive repair and restoration services for all CarryLuxe products. Our skilled
                    craftsmen can restore your bag to its original beauty.
                  </p>
                  <div className="space-y-2 text-sm text-charcoal-800">
                    <p>
                      <strong>Email:</strong> repairs@carryluxe.com
                    </p>
                    <p>
                      <strong>Phone:</strong> +1 (555) 123-4567
                    </p>
                    <p>
                      <strong>Turnaround:</strong> 2-4 weeks depending on service
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-12 text-center bg-white rounded-lg p-8"
        >
          <h2 className="font-playfair text-2xl font-bold text-charcoal-900 mb-4">Care Questions?</h2>
          <p className="text-charcoal-800 mb-4">
            Our care specialists are available to answer any questions about maintaining your CarryLuxe pieces.
          </p>
          <div className="space-y-2">
            <p className="text-charcoal-800">
              <strong>Email:</strong> care@carryluxe.com
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
