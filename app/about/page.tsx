"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Shield, Award, Heart, Users, CheckCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import Footer from "@/components/layout/Footer"

export default function AboutPage() {
  const values = [
    {
      icon: Shield,
      title: "Authenticity Guaranteed",
      description:
        "Every piece is thoroughly authenticated by our expert team using industry-leading verification methods.",
    },
    {
      icon: Award,
      title: "Curated Excellence",
      description:
        "We hand-select only the finest luxury handbags from Hermès and Louis Vuitton's most coveted collections.",
    },
    {
      icon: Heart,
      title: "Passionate Service",
      description: "Our team of luxury specialists provides personalized service to help you find your perfect piece.",
    },
    {
      icon: Users,
      title: "Trusted Community",
      description: "Join thousands of satisfied customers who trust CarryLuxe for their luxury handbag needs.",
    },
  ]

  const stats = [
    { number: "10,000+", label: "Happy Customers" },
    { number: "99.9%", label: "Authenticity Rate" },
    { number: "5 Star", label: "Average Rating" },
    { number: "24/7", label: "Customer Support" },
  ]

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="font-playfair text-5xl font-bold text-charcoal-900 mb-6">About CarryLuxe</h1>
            <p className="text-xl text-charcoal-800 max-w-3xl mx-auto leading-relaxed">
              Founded on the belief that luxury should be accessible, authentic, and extraordinary. We curate the
              world's most coveted handbags from Hermès and Louis Vuitton, bringing timeless elegance directly to
              discerning collectors worldwide.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-96 rounded-2xl overflow-hidden mb-16"
          >
            <Image
              src="/placeholder.svg?height=600&width=1200"
              alt="CarryLuxe luxury showroom"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-8 left-8 text-white">
              <h3 className="text-2xl font-bold mb-2">Our Luxury Showroom</h3>
              <p className="text-lg">Where heritage meets contemporary elegance</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="font-playfair text-4xl font-bold text-charcoal-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-charcoal-800">
                <p>
                  CarryLuxe was born from a passion for exceptional craftsmanship and timeless design. Our founders,
                  longtime collectors of luxury handbags, recognized the need for a trusted source that combines
                  authenticity with accessibility.
                </p>
                <p>
                  What started as a personal collection has evolved into a curated marketplace where luxury enthusiasts
                  can discover, authenticate, and acquire the world's most coveted handbags from Hermès and Louis
                  Vuitton.
                </p>
                <p>
                  Today, we're proud to serve thousands of customers worldwide, each sharing our appreciation for the
                  artistry, heritage, and enduring value of these iconic pieces.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative h-96 rounded-xl overflow-hidden"
            >
              <Image
                src="/placeholder.svg?height=500&width=600"
                alt="Luxury handbag craftsmanship"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-playfair text-4xl font-bold text-charcoal-900 mb-4">Our Values</h2>
            <p className="text-lg text-charcoal-800 max-w-2xl mx-auto">
              These principles guide everything we do, from sourcing to service
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full text-center p-6 hover:shadow-lg transition-shadow">
                  <CardContent className="space-y-4">
                    <div className="w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center mx-auto">
                      <value.icon className="h-8 w-8 text-gold-600" />
                    </div>
                    <h3 className="font-semibold text-xl text-charcoal-900">{value.title}</h3>
                    <p className="text-charcoal-800">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-charcoal-900 text-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-playfair text-4xl font-bold mb-4">Trusted by Thousands</h2>
            <p className="text-lg text-gray-300">Our commitment to excellence speaks for itself</p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-gold-400 mb-2">{stat.number}</div>
                <div className="text-gray-300">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Authentication Process */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-playfair text-4xl font-bold text-charcoal-900 mb-4">Our Authentication Process</h2>
            <p className="text-lg text-charcoal-800 max-w-2xl mx-auto">
              Every piece undergoes rigorous authentication by certified experts
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Initial Inspection",
                description: "Comprehensive visual and tactile examination of materials, construction, and hardware",
              },
              {
                step: "02",
                title: "Expert Verification",
                description: "Detailed authentication by certified specialists using advanced verification techniques",
              },
              {
                step: "03",
                title: "Documentation",
                description: "Complete certification with detailed authenticity report and guarantee",
              },
            ].map((process, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="text-center p-6 h-full">
                  <CardContent className="space-y-4">
                    <div className="text-3xl font-bold text-gold-400">{process.step}</div>
                    <h3 className="font-semibold text-xl text-charcoal-900">{process.title}</h3>
                    <p className="text-charcoal-800">{process.description}</p>
                    <CheckCircle className="h-8 w-8 text-green-500 mx-auto" />
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-cream-100">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-playfair text-4xl font-bold text-charcoal-900 mb-4">Meet Our Team</h2>
            <p className="text-lg text-charcoal-800 max-w-2xl mx-auto">
              Passionate experts dedicated to bringing you the finest luxury handbags
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Founder & CEO",
                image: "/placeholder.svg?height=300&width=300",
                bio: "20+ years in luxury retail with expertise in Hermès and Louis Vuitton authentication",
              },
              {
                name: "Michael Chen",
                role: "Head of Authentication",
                image: "/placeholder.svg?height=300&width=300",
                bio: "Certified luxury goods authenticator with extensive training from major auction houses",
              },
              {
                name: "Emma Rodriguez",
                role: "Customer Experience Director",
                image: "/placeholder.svg?height=300&width=300",
                bio: "Dedicated to ensuring every customer receives personalized, white-glove service",
              },
            ].map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="text-center overflow-hidden">
                  <div className="relative h-64">
                    <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-xl text-charcoal-900 mb-1">{member.name}</h3>
                    <p className="text-gold-600 font-medium mb-3">{member.role}</p>
                    <p className="text-charcoal-800 text-sm">{member.bio}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
