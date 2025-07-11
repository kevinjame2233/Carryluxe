"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter } from "lucide-react"

export default function Footer() {
  const [siteSettings, setSiteSettings] = useState(null)

  useEffect(() => {
    const loadSiteSettings = async () => {
      try {
        const response = await fetch("/api/admin/settings")
        if (response.ok) {
          const result = await response.json()
          setSiteSettings(result.data)
        }
      } catch (error) {
        console.error("Failed to load site settings:", error)
      }
    }

    loadSiteSettings()

    // Listen for site settings updates
    const handleSettingsUpdate = (event) => {
      setSiteSettings(event.detail)
    }

    window.addEventListener("siteSettingsUpdated", handleSettingsUpdate)
    return () => window.removeEventListener("siteSettingsUpdated", handleSettingsUpdate)
  }, [])

  // Default settings fallback
  const settings = siteSettings || {
    contactInfo: {
      email: "carryluxe3@gmail.com",
      phone: "+1 (618) 850-9790",
      address: "123 Luxury Lane, Beverly Hills, CA 90210",
    },
    quickLinks: [
      { id: "1", title: "About", url: "/about" },
      { id: "2", title: "Contact", url: "/contact" },
      { id: "3", title: "Terms", url: "/terms" },
      { id: "4", title: "Privacy", url: "/privacy" },
    ],
    customerCare: [
      { id: "1", title: "Shipping", url: "/shipping" },
      { id: "2", title: "Returns", url: "/returns" },
      { id: "3", title: "Size Guide", url: "/size-guide" },
      { id: "4", title: "Care Instructions", url: "/care" },
    ],
    socialMedia: [
      { id: "1", platform: "Instagram", url: "https://instagram.com/carryluxe" },
      { id: "2", platform: "Facebook", url: "https://facebook.com/carryluxe" },
      { id: "3", platform: "Twitter", url: "https://twitter.com/carryluxe" },
    ],
  }

  return (
    <footer className="bg-charcoal-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Image src="/placeholder-logo.svg" alt="CarryLuxe" width={32} height={32} className="text-gold-400" />
              <span className="font-playfair text-2xl font-bold">CarryLuxe</span>
            </Link>
            <p className="text-cream-100 leading-relaxed">
              Curating the world's most coveted luxury handbags from Hermès and Louis Vuitton. Where heritage meets
              contemporary elegance.
            </p>
            <div className="flex space-x-4">
              {settings.socialMedia.map((social) => (
                <Link
                  key={social.id}
                  href={social.url}
                  className="text-cream-100 hover:text-gold-400 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.platform === "Instagram" && <Instagram className="h-5 w-5" />}
                  {social.platform === "Facebook" && <Facebook className="h-5 w-5" />}
                  {social.platform === "Twitter" && <Twitter className="h-5 w-5" />}
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {settings.quickLinks.map((link) => (
                <li key={link.id}>
                  <Link href={link.url} className="text-cream-100 hover:text-gold-400 transition-colors">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Customer Care</h3>
            <ul className="space-y-2">
              {settings.customerCare.map((link) => (
                <li key={link.id}>
                  <Link href={link.url} className="text-cream-100 hover:text-gold-400 transition-colors">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-gold-400 mt-0.5 flex-shrink-0" />
                <a
                  href={`mailto:${settings.contactInfo.email}`}
                  className="text-cream-100 hover:text-gold-400 transition-colors"
                >
                  {settings.contactInfo.email}
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-gold-400 mt-0.5 flex-shrink-0" />
                <a
                  href={`tel:${settings.contactInfo.phone}`}
                  className="text-cream-100 hover:text-gold-400 transition-colors"
                >
                  {settings.contactInfo.phone}
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-gold-400 mt-0.5 flex-shrink-0" />
                <span className="text-cream-100">{settings.contactInfo.address}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-charcoal-800 mt-12 pt-8">
          <div className="max-w-md mx-auto text-center">
            <h3 className="font-semibold text-lg mb-2">Stay Updated</h3>
            <p className="text-cream-100 mb-4">Subscribe to our newsletter for exclusive offers and new arrivals.</p>
            <div className="flex space-x-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-charcoal-800 border-charcoal-700 text-white placeholder-cream-100"
              />
              <Button className="bg-gold-400 hover:bg-gold-500 text-charcoal-900">Subscribe</Button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-charcoal-800 mt-8 pt-8 text-center">
          <p className="text-cream-100">© {new Date().getFullYear()} CarryLuxe. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
