'use client'

import Link from 'next/link'
import Image from 'next/image'
import { formatScore, gradeFromScore, timeAgo, truncate } from '@/lib/utils'
import { Badge } from '@/components/ui/Badge'
import { Avatar } from '@/components/ui/Avatar'
import type { PostWithAuthor } from '@/types'

export function PostCard({ post }: { post: PostWithAuthor }) {
  const { grade, color } = gradeFromScore(post.avgRating)
  const hasRatings = post.ratingCount > 0

  return (
    <Link href={`/post/${post.id}`} className="group block">
      <article className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary/40 transition-all hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5">
        {/* Image */}
        <div className="relative aspect-video overflow-hidden bg-secondary">
          {post.images[0] ? (
            <Image
              src={post.images[0]}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-4xl text-muted-foreground/30">
              🖥️
            </div>
          )}

          {/* Grade badge */}
          {hasRatings && (
            <div className="absolute top-2 right-2">
              <div className={`text-2xl font-black ${color} bg-background/80 backdrop-blur-sm rounded-lg px-2.5 py-1 border border-border/60`}>
                {grade}
                <span className="text-xs font-normal ml-1 opacity-80">{formatScore(post.avgRating)}</span>
              </div>
            </div>
          )}

          {post.featured && (
            <div className="absolute top-2 left-2">
              <Badge variant="default" className="text-xs">⭐ Featured</Badge>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <h2 className="font-semibold text-base leading-tight mb-1.5 group-hover:text-primary transition-colors line-clamp-2">
            {post.title}
          </h2>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {truncate(post.description, 100)}
          </p>

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {post.tags.slice(0, 3).map(tag => (
                <Badge key={tag} variant="secondary" className="text-xs">#{tag}</Badge>
              ))}
              {post.tags.length > 3 && (
                <span className="text-xs text-muted-foreground">+{post.tags.length - 3}</span>
              )}
            </div>
          )}

          {/* Specs preview */}
          {(post.cpu || post.gpu) && (
            <div className="flex gap-3 text-xs text-muted-foreground mb-3 font-mono">
              {post.cpu && <span className="truncate">{post.cpu.split(' ').slice(-2).join(' ')}</span>}
              {post.gpu && <span className="truncate">{post.gpu.split(' ').slice(-2).join(' ')}</span>}
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between pt-2 border-t border-border">
            <div className="flex items-center gap-2">
              <Avatar src={post.author.avatar} username={post.author.username} size={24} />
              <span className="text-xs text-muted-foreground">
                <span className="text-foreground font-medium">@{post.author.username}</span>
                {' · '}{timeAgo(post.createdAt)}
              </span>
            </div>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span title="Ratings">⭐ {post.ratingCount}</span>
              <span title="Comments">💬 {post.commentCount}</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}
