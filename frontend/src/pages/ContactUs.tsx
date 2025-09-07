"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/useToast"
import { Mail, Phone, MapPin, Send, MessageSquare } from "lucide-react"

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  subject?: string
  message?: string
}

export default function ContactPage() {
  const { toast } = useToast()
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required"
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required"
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters long"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors in the form",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "Message Sent Successfully!",
        description: "We'll get back to you within 24 hours.",
        variant: "default",
      })

      // Reset form
      setFormData({ name: "", email: "", subject: "", message: "" })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const getInputClassName = (field: keyof FormData) => {
    const baseClass = "transition-all duration-200"
    if (errors[field]) {
      return `${baseClass} border-red-500 focus:border-red-500 focus:ring-red-500/20`
    }
    if (formData[field] && !errors[field]) {
      return `${baseClass} border-green-500 focus:border-green-500 focus:ring-green-500/20`
    }
    return `${baseClass} border-purple-200 focus:border-purple-500 focus:ring-purple-500/20`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100">
      {/* Hero Section */}
      <motion.section
        className="bg-hero-gradient py-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            className="text-4xl md:text-6xl font-bold text-white mb-6 text-balance"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Get in Touch
          </motion.h1>
          <motion.p
            className="text-xl text-purple-100 max-w-3xl mx-auto text-pretty"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Have a question, suggestion, or want to collaborate? We'd love to hear from you. Reach out and let's start a
            conversation.
          </motion.p>
        </div>
      </motion.section>

      {/* Contact Form & Info Section */}
      <section className="py-20 bg-section-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    <MessageSquare className="h-6 w-6 text-purple-600" />
                    Send us a Message
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Fill out the form below and we'll get back to you as soon as possible.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name *
                        </label>
                        <Input
                          id="name"
                          type="text"
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          className={`${getInputClassName("name")} text-gray-900`}
                          placeholder="Enter your full name"
                        />
                        {errors.name && (
                          <motion.p
                            className="text-red-500 text-sm mt-1"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                          >
                            {errors.name}
                          </motion.p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          className={`${getInputClassName("email")} text-gray-900`}
                          placeholder="Enter your email"
                        />
                        {errors.email && (
                          <motion.p
                            className="text-red-500 text-sm mt-1"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                          >
                            {errors.email}
                          </motion.p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                        Subject *
                      </label>
                      <Input
                        id="subject"
                        type="text"
                        value={formData.subject}
                        onChange={(e) => handleInputChange("subject", e.target.value)}
                        className={`${getInputClassName("subject")} text-gray-900`}
                        placeholder="What's this about?"
                      />
                      {errors.subject && (
                        <motion.p
                          className="text-red-500 text-sm mt-1"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          {errors.subject}
                        </motion.p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                        Message *
                      </label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        className={`${getInputClassName("message")} min-h-[120px] resize-none text-gray-900`}
                        placeholder="Tell us more about your inquiry..."
                      />
                      {errors.message && (
                        <motion.p
                          className="text-red-500 text-sm mt-1"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          {errors.message}
                        </motion.p>
                      )}
                    </div>

                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Sending...
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <Send className="h-4 w-4" />
                            Send Message
                          </div>
                        )}
                      </Button>
                    </motion.div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div>
                <h2 className="text-3xl font-bold text-gray-300 mb-6">Let's Connect</h2>
                <p className="text-gray-400 text-lg leading-relaxed">
                  Whether you're looking to collaborate, have questions about our platform, or just want to say hello,
                  we're here to help. Choose the best way to reach us.
                </p>
              </div>

              <div className="space-y-6">
                <motion.div
                  className="flex items-start gap-4 p-4 rounded-lg bg-white/60 backdrop-blur-sm border border-purple-100"
                  whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.8)" }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <Mail className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Email Us</h3>
                    <p className="text-gray-600">hello@devhub.com</p>
                    <p className="text-sm text-gray-500">We'll respond within 24 hours</p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-start gap-4 p-4 rounded-lg bg-white/60 backdrop-blur-sm border border-purple-100"
                  whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.8)" }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <Phone className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Call Us</h3>
                    <p className="text-gray-600">+91 12345 67890</p>
                    <p className="text-sm text-gray-500">Mon-Fri, 9AM-6PM IST</p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-start gap-4 p-4 rounded-lg bg-white/60 backdrop-blur-sm border border-purple-100"
                  whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.8)" }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <MapPin className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Visit Us</h3>
                    <p className="text-gray-600">
                      F42, NIT Raipur
                      <br />
                      GE Road, Raipur
                    </p>
                    <p className="text-sm text-gray-500">Open office hours by appointment</p>
                  </div>
                </motion.div>
              </div>

              {/* Quick Stats */}
              {/* <motion.div
                className="grid grid-cols-2 gap-4 pt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <div className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-lg border border-purple-100">
                  <Clock className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">24h</div>
                  <div className="text-sm text-gray-600">Response Time</div>
                </div>
                <div className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-lg border border-purple-100">
                  <Users className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">10k+</div>
                  <div className="text-sm text-gray-600">Happy Users</div>
                </div>
              </motion.div> */}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
