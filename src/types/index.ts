import type { User, Post, Comment, Rating, Report, Bookmark, Notification } from '@prisma/client'

export type { User, Post, Comment, Rating, Report, Bookmark, Notification }

export type PostWithAuthor = Post & {
  author: Pick<User, 'id' | 'username' | 'name' | 'avatar'>
  _count?: { comments: number; ratings: number; bookmarks: number }
  userRating?: number | null
  isBookmarked?: boolean
}

export type CommentWithAuthor = Comment & {
  author: Pick<User, 'id' | 'username' | 'name' | 'avatar'>
  replies?: CommentWithAuthor[]
  _count?: { replies: number }
}

export type UserProfile = User & {
  _count: { posts: number; followers: number; following: number }
  posts?: PostWithAuthor[]
  isFollowing?: boolean
}

export type FeedSort = 'new' | 'top' | 'discussed' | 'trending'
export type FeedFilter = { tag?: string; minRating?: number; gpu?: string; cpu?: string }

export type ApiResponse<T> = { data: T; error?: never } | { data?: never; error: string }

// Extend NextAuth session
declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      email: string
      name?: string | null
      image?: string | null
      username: string
      role: string
    }
  }
}
