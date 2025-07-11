"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const fomoMessages = [
  {
    name: "Sarah M.",
    location: "New York",
    product: "Hermès Birkin 30",
    image: "/placeholder.svg?height=60&width=60",
    timeAgo: "2 minutes ago",
  },
  {
    name: "Jessica L.",
    location: "Los Angeles",
    product: "Louis Vuitton Neverfull",
    image: "/placeholder.svg?height=60&width=60",
    timeAgo: "5 minutes ago",
  },
  {
    name: "Amanda K.",
    location: "Miami",
    product: "Hermès Kelly 28",
    image: "/placeholder.svg?height=60&width=60",
    timeAgo: "8 minutes ago",
  },
  {
    name: "Rachel T.",
    location: "Chicago",
    product: "Louis Vuitton Capucines",
    image: "/placeholder.svg?height=60&width=60",
    timeAgo: "12 minutes ago",
  },
]

export default function FOMOPopup() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentMessage, setCurrentMessage] = useState(0)

  useEffect(() => {
    // Show first popup after 10 seconds
    const initialTimer = setTimeout(() => {
      setIsVisible(true)
    }, 10000)

    // Show subsequent popups every 30 seconds
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % fomoMessages.length)
      setIsVisible(true)
    }, 30000)

    return () => {
      clearTimeout(initialTimer)
      clearInterval(interval)
    }
  }, [])

  useEffect(() => {
    if (isVisible) {
      // Auto-hide after 5 seconds
      const timer = setTimeout(() => {
        setIsVisible(false)
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [isVisible, currentMessage])

  const message = fomoMessages[currentMessage]

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: -100, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -100, scale: 0.8 }}
          className="fixed bottom-6 left-6 z-50 bg-white rounded-lg shadow-2xl border border-cream-200 p-4 max-w-sm"
        >
          <div className="flex items-start space-x-3">
            <div className="relative w-12 h-12 bg-cream-100 rounded-full overflow-hidden flex-shrink-0">
              <Image src={message.image || "/placeholder.svg"} alt={message.name} fill className="object-cover" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <ShoppingBag className="h-4 w-4 text-green-500" />
                <span className="text-xs font-medium text-green-600">Just purchased</span>
              </div>

              <p className="text-sm font-semibold text-charcoal-900 mb-1">
                {message.name} from {message.location}
              </p>

              <p className="text-xs text-charcoal-800 mb-2">
                purchased <span className="font-medium">{message.product}</span>
              </p>

              <p className="text-xs text-charcoal-600">{message.timeAgo}</p>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 text-charcoal-600 hover:text-charcoal-900"
              onClick={() => setIsVisible(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Pulse animation dot */}
          <div className="absolute -top-1 -right-1">
            <div className="relative">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <div className="absolute inset-0 w-3 h-3 bg-green-500 rounded-full animate-ping opacity-75"></div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
