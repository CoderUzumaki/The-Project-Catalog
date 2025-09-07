"use client"

import type React from "react"
import { Heart, MoreHorizontal } from "lucide-react"

interface CardProps {
  title: string
  description: string
  image_url: string
  tags?: string[]
  liked?: boolean
  difficulty?: string
  like_count?: number
  onLike?: () => void
  onMore?: () => void
  className?: string
}

export const Card: React.FC<CardProps> = ({
  title,
  description,
  image_url,
  tags = [],
  like_count,
  liked = false,
  onLike,
  onMore,
  className = "",
}) => {
  return (
    <div
      className={`bg-card border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow ${className}`}
    >
      {/* Image Section */}
      <div className="relative h-48 bg-muted overflow-hidden">
        {image_url ? (
          <img src={image_url || "/placeholder.svg"} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted to-accent">
            <div className="text-muted-foreground text-4xl font-light">{title.charAt(0).toUpperCase()}</div>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4 space-y-3">
        {/* Title and Actions */}
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold text-card-foreground text-balance leading-tight">{title}</h3>
          <div className="flex items-center gap-1 flex-shrink-0">
            <button
              onClick={onLike}
              className={`p-2 rounded-full transition-colors hover:bg-accent ${
                liked ? "text-destructive hover:text-destructive/80" : "text-muted-foreground hover:text-foreground"
              }`}
              aria-label={liked ? "Unlike" : "Like"}
            >
              <Heart size={18} className={liked ? "fill-current" : ""} />
            </button>
            <button
              onClick={onMore}
              className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              aria-label="More options"
            >
              {like_count !== undefined ? like_count : 0}
            </button>
          </div>
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs font-medium bg-secondary text-secondary-foreground rounded-md"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed text-pretty">{description}</p>
      </div>
    </div>
  )
}

export default Card
