"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Gift } from "lucide-react"
import { ArrowRight, Users, Trophy, Star, Filter, ExternalLink, Github, Sparkles } from "lucide-react"
import { motion } from "framer-motion"
import Testimonials from "@/components/Testimonials"

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const cardHover = {
  hover: {
    scale: 1.05,
    y: -10,
    transition: { duration: 0.3, ease: "easeOut" },
  },
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <motion.section
        className="relative overflow-hidden bg-hero-gradient py-20 sm:py-32"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            <motion.div variants={fadeInUp} className="mb-6">
              <motion.div
                className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6"
                whileHover={{ scale: 1.05 }}
              >
                <Sparkles className="w-4 h-4" />
                Join 10,000+ innovators
              </motion.div>
            </motion.div>

            <motion.h1 variants={fadeInUp} className="text-4xl sm:text-6xl font-bold text-foreground mb-6 text-balance">
              Build, share, and discover
              <motion.span
                className="text-primary block"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                extraordinary projects
              </motion.span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
              DevHub is the antidote to generic to-do lists. Find curated project ideas, showcase your work, and build a
              portfolio that truly impresses recruiters.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" className="text-lg px-8">
                  Start your quest <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent">
                  Browse projects
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        className="py-20 bg-section-light"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Beyond tutorials, into greatness</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Move past basic tutorials and build projects that showcase your real skills
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              {
                icon: Filter,
                title: "Curated & Filtered",
                description:
                  "Find projects by difficulty, tech stack, and time commitment. No more endless scrolling through generic ideas.",
              },
              {
                icon: Users,
                title: "Community Driven",
                description:
                  "See real implementations from other developers. Learn from their code, get inspired by their solutions.",
              },
              {
                icon: Trophy,
                title: "Portfolio Ready",
                description:
                  "Build projects that actually impress recruiters. Each quest is designed to demonstrate real-world skills.",
              },
            ].map((feature, index) => (
              <motion.div key={index} variants={fadeInUp} whileHover="hover">
                <Card className="border-border hover:shadow-lg transition-shadow cursor-pointer" {...cardHover}>
                  <CardContent className="p-6">
                    <motion.div
                      className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <feature.icon className="w-6 h-6 text-primary" />
                    </motion.div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Project Showcase */}
      <motion.section
        className="py-20 bg-section-lighter"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Featured project implementations</h2>
            <p className="text-xl text-muted-foreground">See how other developers tackled these challenges</p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              {
                title: "Real-time Collaboration Tool",
                author: "Sarah Chen",
                tech: ["React", "Socket.io", "Node.js"],
                stars: 234,
                image: "/collaborative-coding-interface.png",
              },
              {
                title: "Blockchain Voting System",
                author: "Alex Rodriguez",
                tech: ["Solidity", "Web3.js", "React"],
                stars: 189,
                image: "/blockchain-voting-interface.png",
              },
              {
                title: "AI Code Reviewer",
                author: "Jordan Kim",
                tech: ["Python", "OpenAI", "FastAPI"],
                stars: 312,
                image: "/ai-code-review-dashboard.jpg",
              },
              {
                title: "Microservices Monitor",
                author: "Taylor Swift",
                tech: ["Go", "Docker", "Grafana"],
                stars: 156,
                image: "/microservices-monitoring-dashboard.jpg",
              },
              {
                title: "AR Shopping Experience",
                author: "Morgan Lee",
                tech: ["React Native", "ARKit", "Three.js"],
                stars: 278,
                image: "/ar-shopping-mobile-app.jpg",
              },
              {
                title: "Distributed Cache System",
                author: "Casey Johnson",
                tech: ["Redis", "Go", "Kubernetes"],
                stars: 203,
                image: "/distributed-cache-architecture.jpg",
              },
            ].map((project, index) => (
              <motion.div key={index} variants={fadeInUp} whileHover="hover">
                <Card
                  className="group hover:shadow-lg transition-all duration-300 border-border cursor-pointer"
                  {...cardHover}
                >
                  <motion.div
                    className="aspect-video bg-muted rounded-t-lg overflow-hidden"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </motion.div>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Star className="w-4 h-4 fill-current text-yellow-500" />
                        <span className="text-sm text-muted-foreground">{project.stars}</span>
                      </div>
                      <div className="flex space-x-2">
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                            <Github className="w-4 h-4" />
                          </Button>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                        </motion.div>
                      </div>
                    </div>
                    <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">{project.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">by {project.author}</p>
                    <div className="flex flex-wrap gap-1">
                      {project.tech.map((tech, techIndex) => (
                        <Badge key={techIndex} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Rewards Section */}
      <motion.section
        className="py-20 bg-background"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl container mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
              Earn points. Redeem rewards.
              <motion.span
                className="text-primary"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                Level up.
              </motion.span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Contribute ideas, showcase projects, and engage with the community to earn points. Redeem points for
              exclusive rewards and level up your profile.
            </p>
          </motion.div>
        </div>

        <div className="max-w-7xl container mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {/* Earn Points Card */}
            <motion.div variants={fadeInUp} whileHover="hover">
              <Card className="bg-card border-border overflow-hidden group cursor-pointer" {...cardHover}>
                <CardContent className="p-0">
                  <motion.div
                    className="h-48 bg-gradient-to-br from-amber-400/20 to-orange-500/20 flex items-center justify-center relative overflow-hidden"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div initial={{ rotate: 0 }} whileHover={{ rotate: 360 }} transition={{ duration: 0.6 }}>
                      <TrendingUp className="w-16 h-16 text-amber-400" />
                    </motion.div>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.6 }}
                    />
                  </motion.div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">Earn Points</h3>
                    <p className="text-muted-foreground">
                      Contribute ideas, showcase projects, and engage with the community to earn points.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Redeem Rewards Card */}
            <motion.div variants={fadeInUp} whileHover="hover">
              <Card className="bg-card border-border overflow-hidden group cursor-pointer" {...cardHover}>
                <CardContent className="p-0">
                  <motion.div
                    className="h-48 bg-gradient-to-br from-pink-400/20 to-rose-500/20 flex items-center justify-center relative overflow-hidden"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div initial={{ scale: 1 }} whileHover={{ scale: 1.2 }} transition={{ duration: 0.3 }}>
                      <Gift className="w-16 h-16 text-pink-400" />
                    </motion.div>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.6 }}
                    />
                  </motion.div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">Redeem Rewards</h3>
                    <p className="text-muted-foreground">
                      Redeem your points for exclusive rewards, including swag, discounts, and more.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Level Up Card */}
            <motion.div variants={fadeInUp} whileHover="hover">
              <Card className="bg-card border-border overflow-hidden group cursor-pointer" {...cardHover}>
                <CardContent className="p-0">
                  <motion.div
                    className="h-48 bg-gradient-to-br from-green-400/20 to-emerald-500/20 flex items-center justify-center relative overflow-hidden"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div initial={{ y: 0 }} whileHover={{ y: -10 }} transition={{ duration: 0.3 }}>
                      <Trophy className="w-16 h-16 text-green-400" />
                    </motion.div>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.6 }}
                    />
                  </motion.div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">Level Up</h3>
                    <p className="text-muted-foreground">
                      Level up your profile by earning points and showcasing your contributions.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <Testimonials />
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="py-20 bg-primary text-primary-foreground"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to start your coding adventure?</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join thousands of developers building impressive projects and showcasing their skills
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" variant="secondary" className="text-lg px-8">
                  Browse projects
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
                >
                  Join the community
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </main>
  )
}
