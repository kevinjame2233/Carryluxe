import type React from "react"
import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"

const Footer: React.FC = () => {
  const CUSTOMER_SERVICE = {
    whatsapp: "+1 (618) 850-9790",
    email: "carryluxe3@gmail.com",
    phone: "+1 (618) 850-9790",
  }

  return (
    <footer className="bg-charcoal-900 text-cream-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="font-playfair text-2xl font-bold mb-4">CarryLuxe</h3>
            <p className="text-cream-200 mb-4">Curating the finest luxury handbags for the discerning woman.</p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 hover:text-gold-400 cursor-pointer" />
              <Instagram className="h-5 w-5 hover:text-gold-400 cursor-pointer" />
              <Twitter className="h-5 w-5 hover:text-gold-400 cursor-pointer" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-cream-200">
              <li>
                <Link href="/about" className="hover:text-gold-400">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-gold-400">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-gold-400">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/account" className="hover:text-gold-400">
                  My Account
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="font-semibold mb-4">Customer Care</h4>
            <ul className="space-y-2 text-cream-200">
              <li>
                <Link href="/shipping" className="hover:text-gold-400">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-gold-400">
                  Returns
                </Link>
              </li>
              <li>
                <Link href="/size-guide" className="hover:text-gold-400">
                  Size Guide
                </Link>
              </li>
              <li>
                <Link href="/care" className="hover:text-gold-400">
                  Care Instructions
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact & Legal</h4>
            <ul className="space-y-2 text-cream-200">
              <li>
                <Link href="/terms" className="hover:text-gold-400">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-gold-400">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <a href={`mailto:${CUSTOMER_SERVICE.email}`} className="hover:text-gold-400">
                  {CUSTOMER_SERVICE.email}
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${CUSTOMER_SERVICE.whatsapp.replace(/\D/g, "")}`}
                  className="hover:text-gold-400"
                >
                  WhatsApp: {CUSTOMER_SERVICE.whatsapp}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-cream-700 my-8" />

        <div className="text-center text-cream-200">
          <p>&copy; {new Date().getFullYear()} CarryLuxe. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
