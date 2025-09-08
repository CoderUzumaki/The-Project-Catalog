"use client"

import type React from "react"
import { motion } from "framer-motion"
import { FiArrowRight } from "react-icons/fi"
import { FaQuoteLeft } from "react-icons/fa"
import { Button } from "@/components/ui/button"
import{Link} from "react-router-dom"

// Team member data structure
type TeamMember = {
  name: string
  role: string
  imgSrc: string
}

// Array of team members
const teamMembers: TeamMember[] = [
  {
    name: "Abhinav Mishra",
    role: "Full Stack Developer",
    imgSrc: "/abhinav.jpg",
  },
  {
    name: "Pratyu Deheria",
    role: "Frontend Developer",
    imgSrc: "/pratyu.jpg",
  },
  {
    name: "Nishant Borkar",
    role: "Backend Developer",
    imgSrc: "/nishant.jpg",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
}

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main>
        {/* Hero Section */}
        <section className="bg-hero-gradient py-16 lg:py-24">
          <div className="container max-w-7xl mx-auto px-4">
            <motion.div
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div className="text-center lg:text-left" variants={itemVariants}>
                <h1 className="text-4xl lg:text-5xl font-bold leading-tight text-balance">
                  Our Story, the Journey That's Shaped <span className="text-primary">Our</span> Success
                </h1>
                <p className="mt-6 text-lg text-muted-foreground text-pretty">
                  DevHub was born from a simple belief: that great ideas deserve great platforms. We're building
                  the future of tech collaboration, one project at a time.
                </p>
              </motion.div>

              <motion.div className="relative" variants={itemVariants}>
                <div className="relative overflow-hidden rounded-lg shadow-2xl">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/serene-ocean-beach-landscape-NSinkp1DdBC9sGh1xOIOkDUbBAQoY4.jpg"
                    alt="Team collaboration"
                    className="w-full h-[400px] object-cover"
                  />
                  <motion.div
                    className="absolute bottom-4 left-4 bg-background/95 backdrop-blur-sm p-4 rounded-lg shadow-lg border"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg">
                        500+
                      </div>
                      <div>
                        <p className="font-semibold">Projects Launched</p>
                        <p className="text-sm text-muted-foreground">Successfully Completed</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-section-light py-16 lg:py-20">
          <div className="container max-w-7xl mx-auto px-4">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-balance">Our platform drives innovation worldwide</h2>
            </motion.div>

            <motion.div
              className="grid grid-cols-2 lg:grid-cols-4 gap-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                { value: "5+", label: "Years of Innovation" },
                { value: "50+", label: "Tech Experts" },
                { value: "15+", label: "Award Winnings" },
                { value: "500+", label: "Projects Launched" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="bg-background p-6 rounded-lg shadow-lg border text-center group hover:shadow-xl transition-all duration-300"
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                >
                  <p className="text-3xl lg:text-4xl font-bold text-primary group-hover:scale-110 transition-transform duration-300">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-muted-foreground">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Team Section */}
        <section className="bg-section-lighter py-16 lg:py-20">
          <div className="container max-w-7xl mx-auto px-4">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-balance">
                Meet Our <span className="text-primary">Creative Team</span>
              </h2>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.name}
                  className="relative overflow-hidden rounded-lg group cursor-pointer"
                  variants={itemVariants}
                  whileHover={{ y: -10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="relative overflow-hidden rounded-lg">
                    <img
                      src={member.imgSrc || "/placeholder.svg"}
                      alt={member.name}
                      className="w-full h-[400px] object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 p-6 text-white"
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <h3 className="text-xl font-bold">{member.name}</h3>
                      <p className="text-gray-200">{member.role}</p>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Testimonial Section */}
        <section className="bg-section-light py-16 lg:py-20">
          <div className="container max-w-7xl mx-auto px-4">
            <motion.div
              className="text-center max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-sm font-semibold text-primary mb-6 tracking-wider">TESTIMONIAL</p>

              <motion.img
                className="w-24 h-24 rounded-full mx-auto mb-6 border-4 border-background shadow-lg"
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/professional-headshot-MVQzBgqCWCm5OITNqIsbe1y1jZinpg.png"
                alt="David G. Hance"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              />

              <div className="relative">
                <FaQuoteLeft className="absolute -top-4 left-0 text-4xl text-muted-foreground/20" />
                <motion.p
                  className="text-xl lg:text-2xl italic text-muted-foreground relative z-10 text-balance"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                >
                  "DevHub transformed how our team collaborates on projects. The platform's intuitive design and
                  powerful features helped us launch three successful products this year. It's become essential to our
                  workflow."
                </motion.p>
              </div>

              <motion.div
                className="mt-6"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                <p className="font-bold text-lg">David G. Hance</p>
                <p className="text-muted-foreground">CEO, Tech Solutions</p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-background py-16 lg:py-20">
          <div className="container max-w-7xl mx-auto px-4">
            <motion.div
              className="flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-balance">
                  Ready to innovate with us? Let's build something amazing together
                </h2>
              </div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  asChild
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg rounded-full group"
                >
                  <Link to="/contact" className="flex items-center gap-2">
                    Get Started
                    <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default AboutPage
