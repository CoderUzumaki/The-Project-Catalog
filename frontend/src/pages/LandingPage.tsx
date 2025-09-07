import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRight,
  Users,
  Trophy,
  Star,
  Filter,
  ExternalLink,
  Github,
} from "lucide-react"
import Testimonials from "@/components/Testimonials"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/20 py-20 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-6xl font-bold text-foreground mb-6 text-balance">
              Build, share, and discover
              <span className="text-primary block">extraordinary projects</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
              DevHub is the antidote to generic to-do lists. Find curated project ideas, showcase your work, and
              build a portfolio that truly impresses recruiters.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8">
                Start your quest <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent">
                Browse projects
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Beyond tutorials, into greatness</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Move past basic tutorials and build projects that showcase your real skills
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Filter className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Curated & Filtered</h3>
                <p className="text-muted-foreground">
                  Find projects by difficulty, tech stack, and time commitment. No more endless scrolling through
                  generic ideas.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Community Driven</h3>
                <p className="text-muted-foreground">
                  See real implementations from other developers. Learn from their code, get inspired by their
                  solutions.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Trophy className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Portfolio Ready</h3>
                <p className="text-muted-foreground">
                  Build projects that actually impress recruiters. Each quest is designed to demonstrate real-world
                  skills.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Project Showcase */}
      <section className="py-20 bg-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Featured project implementations</h2>
            <p className="text-xl text-muted-foreground">See how other developers tackled these challenges</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-border">
                <div className="aspect-video bg-muted rounded-t-lg overflow-hidden">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Star className="w-4 h-4 fill-current text-yellow-500" />
                      <span className="text-sm text-muted-foreground">{project.stars}</span>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <Github className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <ExternalLink className="w-4 h-4" />
                      </Button>
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
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials />

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to start your coding adventure?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of developers building impressive projects and showcasing their skills
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              Browse projects
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
            >
              Join the community
            </Button>
          </div>
        </div>
      </section>
      
    </div>
  )
}
