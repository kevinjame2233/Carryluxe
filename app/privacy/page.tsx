"use client"

import { motion } from "framer-motion"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-cream-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-charcoal-900 mb-6">Privacy Policy</h1>
          <p className="text-xl text-charcoal-800">Last updated: {new Date().toLocaleDateString()}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white rounded-lg p-8 space-y-8"
        >
          <section>
            <h2 className="font-playfair text-2xl font-bold text-charcoal-900 mb-4">Information We Collect</h2>
            <p className="text-charcoal-800 mb-4">
              We collect information you provide directly to us, such as when you create an account, make a purchase, or
              contact us for support. This may include:
            </p>
            <ul className="list-disc list-inside text-charcoal-800 space-y-2">
              <li>Name, email address, and contact information</li>
              <li>Billing and shipping addresses</li>
              <li>Payment information (processed securely through our payment providers)</li>
              <li>Purchase history and preferences</li>
              <li>Communications with our customer service team</li>
            </ul>
          </section>

          <section>
            <h2 className="font-playfair text-2xl font-bold text-charcoal-900 mb-4">How We Use Your Information</h2>
            <p className="text-charcoal-800 mb-4">We use the information we collect to:</p>
            <ul className="list-disc list-inside text-charcoal-800 space-y-2">
              <li>Process and fulfill your orders</li>
              <li>Communicate with you about your purchases</li>
              <li>Provide customer support</li>
              <li>Send you marketing communications (with your consent)</li>
              <li>Improve our products and services</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="font-playfair text-2xl font-bold text-charcoal-900 mb-4">Information Sharing</h2>
            <p className="text-charcoal-800 mb-4">
              We do not sell, trade, or otherwise transfer your personal information to third parties except as
              described in this policy:
            </p>
            <ul className="list-disc list-inside text-charcoal-800 space-y-2">
              <li>Service providers who assist us in operating our business</li>
              <li>Payment processors for transaction processing</li>
              <li>Shipping companies for order fulfillment</li>
              <li>Legal authorities when required by law</li>
            </ul>
          </section>

          <section>
            <h2 className="font-playfair text-2xl font-bold text-charcoal-900 mb-4">Data Security</h2>
            <p className="text-charcoal-800 mb-4">
              We implement appropriate security measures to protect your personal information against unauthorized
              access, alteration, disclosure, or destruction. However, no method of transmission over the internet is
              100% secure.
            </p>
          </section>

          <section>
            <h2 className="font-playfair text-2xl font-bold text-charcoal-900 mb-4">Cookies and Tracking</h2>
            <p className="text-charcoal-800 mb-4">
              We use cookies and similar tracking technologies to enhance your browsing experience, analyze site
              traffic, and understand where our visitors are coming from. You can control cookie settings through your
              browser preferences.
            </p>
          </section>

          <section>
            <h2 className="font-playfair text-2xl font-bold text-charcoal-900 mb-4">Your Rights</h2>
            <p className="text-charcoal-800 mb-4">You have the right to:</p>
            <ul className="list-disc list-inside text-charcoal-800 space-y-2">
              <li>Access and update your personal information</li>
              <li>Request deletion of your personal information</li>
              <li>Opt-out of marketing communications</li>
              <li>Request a copy of your personal information</li>
            </ul>
          </section>

          <section>
            <h2 className="font-playfair text-2xl font-bold text-charcoal-900 mb-4">Contact Us</h2>
            <p className="text-charcoal-800">
              If you have any questions about this Privacy Policy, please contact us at:
              <br />
              Email: privacy@carryluxe.com
              <br />
              Phone: +1 (555) 123-4567
              <br />
              Address: 123 Luxury Lane, Beverly Hills, CA 90210
            </p>
          </section>
        </motion.div>
      </div>
    </div>
  )
}
