"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Footer() {
  const [siteSettings, setSiteSettings] = useState({
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
  })

  const [email, setEmail] = useState("")

  useEffect(() => {
    // Load saved site settings
    const savedSettings = localStorage.getItem("carryluxe-site-settings")
    if (savedSettings) {
      try {
        setSiteSettings(JSON.parse(savedSettings))
      } catch (e) {
        console.error("Failed to parse site settings", e)
      }
    }

    // Listen for settings updates
    const handleSettingsUpdate = (event) => {
      setSiteSettings(event.detail)
    }

    window.addEventListener("siteSettingsUpdated", handleSettingsUpdate)

    return () => {
      window.removeEventListener("siteSettingsUpdated", handleSettingsUpdate)
    }
  }, [])

  const handleNewsletterSubmit = (e) => {
    e.preventDefault()
    if (email) {
      // Here you would typically send to your newsletter service
      alert("Thank you for subscribing to our newsletter!")
      setEmail("")
    }
  }

  return (
    <footer className="bg-charcoal-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/">
              <h3 className="font-playfair text-2xl font-bold text-gold-400">CarryLuxe</h3>
            </Link>
            <p className="text-gray-300 text-sm">
              Discover the world's most coveted handbags from Hermès and Louis Vuitton. Where heritage meets
              contemporary elegance.
            </p>
            <div className="flex space-x-4">
              {siteSettings.socialMedia.map((social) => (
                <a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gold-400 transition-colors"
                >
                  {social.platform === "Instagram" && <Instagram className="h-5 w-5" />}
                  {social.platform === "Facebook" && <Facebook className="h-5 w-5" />}
                  {social.platform === "Twitter" && <Twitter className="h-5 w-5" />}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {siteSettings.quickLinks.map((link) => (
                <li key={link.id}>
                  <Link href={link.url} className="text-gray-300 hover:text-gold-400 transition-colors text-sm">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Customer Care</h4>
            <ul className="space-y-2">
              {siteSettings.customerCare.map((link) => (
                <li key={link.id}>
                  <Link href={link.url} className="text-gray-300 hover:text-gold-400 transition-colors text-sm">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Stay Connected</h4>

            {/* Newsletter */}
            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-charcoal-800 border-charcoal-700 text-white placeholder-gray-400"
              />
              <Button type="submit" size="sm" className="w-full bg-gold-400 hover:bg-gold-500 text-charcoal-900">
                Subscribe
              </Button>
            </form>

            {/* Contact Info */}
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-gold-400" />
                <a href={`mailto:${siteSettings.contactInfo.email}`} className="text-gray-300 hover:text-gold-400">
                  {siteSettings.contactInfo.email}
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-gold-400" />
                <a href={`tel:${siteSettings.contactInfo.phone}`} className="text-gray-300 hover:text-gold-400">
                  {siteSettings.contactInfo.phone}
                </a>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-gold-400 mt-0.5" />
                <span className="text-gray-300">{siteSettings.contactInfo.address}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-charcoal-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">© {new Date().getFullYear()} CarryLuxe. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/terms" className="text-gray-400 hover:text-gold-400 text-sm">
              Terms of Service
            </Link>
            <Link href="/privacy" className="text-gray-400 hover:text-gold-400 text-sm">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
