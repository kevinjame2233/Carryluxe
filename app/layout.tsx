import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/layout/Navbar"
import FOMOPopup from "@/components/FOMOPopup"
import { ThemeProvider } from "@/components/providers/ThemeProvider"
import { WishlistProvider } from "@/components/providers/WishlistProvider"
import { CartProvider } from "@/components/providers/CartProvider"
import { AuthProvider } from "@/components/providers/AuthProvider"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: "CarryLuxe - Luxury Bags & Accessories",
  description: "Discover timeless luxury bags and accessories from CarryLuxe. Premium quality, elegant design.",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`} suppressHydrationWarning>
      <body className="font-inter">
        <ThemeProvider>
          <AuthProvider>
            <WishlistProvider>
              <CartProvider>
                <Navbar />
                <main className="min-h-screen">{children}</main>
                <FOMOPopup />
              </CartProvider>
            </WishlistProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
