"use client"

import { motion } from "framer-motion"
import { Heart, Github, ExternalLink } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export interface ProjectCardProps {
  id: string
  title: string
  description?: string
  imageUrl?: string
  repoUrl?: string
  liveUrl?: string
  tags: string[]
  likeCount: number
  username: string
  ideaId?: string   // ⬅ make optional
  className?: string
  onClick?: () => void
}


const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  hover: { y: -5 },
}

const cardHover = {
  whileHover: {
    scale: 1.02,
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  },
  transition: { duration: 0.3 },
}

export function ProjectCard({
  title,
  imageUrl,
  repoUrl,
  liveUrl,
  tags,
  likeCount,
  username,
  className = ""
}: ProjectCardProps) {
  return (
    <motion.div variants={fadeInUp} whileHover="hover" className={className}>
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
            src={imageUrl || "/placeholder.svg?height=200&width=300&query=project preview"}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </motion.div>

        <CardContent className="p-4">
          {/* Likes + Actions */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Heart className="w-4 h-4 fill-current text-yellow-500" />
              <span className="text-sm text-muted-foreground">{likeCount}</span>
            </div>
            <div className="flex space-x-2">
              {repoUrl && (
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-8 w-8 p-0"
                    onClick={(e) => {
                      e.stopPropagation()
                      window.open(repoUrl, "_blank")
                    }}
                  >
                    <Github className="w-4 h-4" />
                  </Button>
                </motion.div>
              )}
              {liveUrl && (
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-8 w-8 p-0"
                    onClick={(e) => {
                      e.stopPropagation()
                      window.open(liveUrl, "_blank")
                    }}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </motion.div>
              )}
            </div>
          </div>

          {/* Title + Author */}
          <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground mb-3">by {username}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1">
            {tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
