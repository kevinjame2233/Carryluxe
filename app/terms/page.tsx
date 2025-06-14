"use client"

import { motion } from "framer-motion"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-cream-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-charcoal-900 mb-6">Terms of Service</h1>
          <p className="text-xl text-charcoal-800">Last updated: {new Date().toLocaleDateString()}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white rounded-lg p-8 space-y-8"
        >
          <section>
            <h2 className="font-playfair text-2xl font-bold text-charcoal-900 mb-4">1. Acceptance of Terms</h2>
            <p className="text-charcoal-800 mb-4">
              By accessing and using the CarryLuxe website, you accept and agree to be bound by the terms and provision
              of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
          </section>

          <section>
            <h2 className="font-playfair text-2xl font-bold text-charcoal-900 mb-4">2. Use License</h2>
            <p className="text-charcoal-800 mb-4">
              Permission is granted to temporarily download one copy of the materials on CarryLuxe's website for
              personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title,
              and under this license you may not:
            </p>
            <ul className="list-disc list-inside text-charcoal-800 space-y-2">
              <li>modify or copy the materials</li>
              <li>use the materials for any commercial purpose or for any public display</li>
              <li>attempt to reverse engineer any software contained on the website</li>
              <li>remove any copyright or other proprietary notations from the materials</li>
            </ul>
          </section>

          <section>
            <h2 className="font-playfair text-2xl font-bold text-charcoal-900 mb-4">3. Product Information</h2>
            <p className="text-charcoal-800 mb-4">
              We strive to provide accurate product information, including descriptions, pricing, and availability.
              However, we do not warrant that product descriptions or other content is accurate, complete, reliable,
              current, or error-free.
            </p>
          </section>

          <section>
            <h2 className="font-playfair text-2xl font-bold text-charcoal-900 mb-4">4. Pricing and Payment</h2>
            <p className="text-charcoal-800 mb-4">
              All prices are subject to change without notice. We reserve the right to modify or discontinue any product
              at any time. Payment must be received in full before products are shipped.
            </p>
          </section>

          <section>
            <h2 className="font-playfair text-2xl font-bold text-charcoal-900 mb-4">5. Shipping and Delivery</h2>
            <p className="text-charcoal-800 mb-4">
              We will make every effort to deliver products within the estimated timeframe. However, delivery dates are
              estimates and we are not liable for delays caused by circumstances beyond our control.
            </p>
          </section>

          <section>
            <h2 className="font-playfair text-2xl font-bold text-charcoal-900 mb-4">6. Returns and Exchanges</h2>
            <p className="text-charcoal-800 mb-4">
              Returns and exchanges are subject to our return policy. Items must be returned in original condition
              within 30 days of purchase. Custom or personalized items are not eligible for return.
            </p>
          </section>

          <section>
            <h2 className="font-playfair text-2xl font-bold text-charcoal-900 mb-4">7. Limitation of Liability</h2>
            <p className="text-charcoal-800 mb-4">
              In no event shall CarryLuxe or its suppliers be liable for any damages (including, without limitation,
              damages for loss of data or profit, or due to business interruption) arising out of the use or inability
              to use the materials on CarryLuxe's website.
            </p>
          </section>

          <section>
            <h2 className="font-playfair text-2xl font-bold text-charcoal-900 mb-4">8. Contact Information</h2>
            <p className="text-charcoal-800">
              If you have any questions about these Terms of Service, please contact us at:
              <br />
              Email: legal@carryluxe.com
              <br />
              Phone: +1 (555) 123-4567
            </p>
          </section>
        </motion.div>
      </div>
    </div>
  )
}
