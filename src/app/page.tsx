import { Suspense } from 'react'
import { PostCard } from '@/components/feed/PostCard'
import { FeedFilters } from '@/components/feed/FeedFilters'
import { PostCardSkeleton } from '@/components/ui/Skeleton'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import type { FeedSort } from '@/types'

const DEMO = process.env.USE_DEMO_DATA === 'true'

interface PageProps {
  searchParams: { sort?: FeedSort; tag?: string; page?: string }
}

const PAGE_SIZE = 12

async function Feed({ sort, tag, page }: { sort: FeedSort; tag: string; page: number }) {
  let posts: any[] = []
  let total = 0

  if (DEMO) {
    const { DEMO_POSTS } = await import('@/lib/demo-data')
    let filtered = [...DEMO_POSTS]
    if (tag) filtered = filtered.filter(p => p.tags.includes(tag))
    if (sort === 'top') filtered.sort((a, b) => b.avgRating - a.avgRating)
    else if (sort === 'discussed') filtered.sort((a, b) => b.commentCount - a.commentCount)
    else if (sort === 'new') filtered.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    else filtered.sort((a, b) => b.ratingCount - a.ratingCount)
    total = filtered.length
    posts = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
  } else {
    const { prisma } = await import('@/lib/prisma')
    const { auth } = await import('@/lib/auth')
    const session = await auth()
    const skip = (page - 1) * PAGE_SIZE
    const where = { published: true, ...(tag ? { tags: { has: tag } } : {}) }
    const orderBy =
      sort === 'new'       ? { createdAt: 'desc' as const } :
      sort === 'top'       ? { avgRating: 'desc' as const } :
      sort === 'discussed' ? { commentCount: 'desc' as const } :
                             { ratingCount: 'desc' as const }
    ;[posts, total] = await Promise.all([
      prisma.post.findMany({ where, orderBy, skip, take: PAGE_SIZE, include: { author: { select: { id: true, username: true, name: true, avatar: true } } } }),
      prisma.post.count({ where }),
    ])
    if (session?.user.id) {
      const bookmarks = await prisma.bookmark.findMany({ where: { userId: session.user.id, postId: { in: posts.map((p: any) => p.id) } }, select: { postId: true } })
      const ids = new Set(bookmarks.map((b: any) => b.postId))
      posts = posts.map((p: any) => ({ ...p, isBookmarked: ids.has(p.id) }))
    }
  }

  const hasMore = (page - 1) * PAGE_SIZE + posts.length < total

  if (posts.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-5xl mb-4">🖥️</div>
        <h3 className="text-lg font-semibold mb-2">No setups yet</h3>
        <p className="text-muted-foreground mb-6">Be the first to post your rig!</p>
        <Button asChild><Link href="/submit">Post Your Setup</Link></Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {posts.map((post: any) => <PostCard key={post.id} post={post} />)}
      </div>
      <div className="flex justify-center gap-3 pt-4">
        {page > 1 && <Button variant="outline" asChild><Link href={`/?sort=${sort}&tag=${tag}&page=${page - 1}`}>← Previous</Link></Button>}
        {hasMore && <Button variant="outline" asChild><Link href={`/?sort=${sort}&tag=${tag}&page=${page + 1}`}>Next →</Link></Button>}
      </div>
    </div>
  )
}

export default function HomePage({ searchParams }: PageProps) {
  const sort = (searchParams.sort ?? 'trending') as FeedSort
  const tag  = searchParams.tag ?? ''
  const page = parseInt(searchParams.page ?? '1', 10)

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {DEMO && (
        <div className="bg-primary/10 border border-primary/30 rounded-xl px-4 py-3 text-sm text-center text-primary">
          👋 This is a <strong>live demo</strong> with sample data. <a href="https://vercel.com" className="underline">Deploy your own</a> to get started.
        </div>
      )}

      <div className="text-center space-y-3 py-6">
        <h1 className="text-4xl font-black tracking-tight">
          <span className="bg-gradient-to-r from-primary via-violet-400 to-pink-400 bg-clip-text text-transparent">Post Your Rig.</span>
          <br />
          <span className="text-foreground">Get Graded.</span>
        </h1>
        <p className="text-muted-foreground max-w-md mx-auto">
          Share your gaming rig, dev workspace or home office. Let the community rate it from D to S.
        </p>
        <Button size="lg" asChild><Link href="/submit">📸 Post Your Setup</Link></Button>
      </div>

      <FeedFilters />

      <Suspense fallback={
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => <PostCardSkeleton key={i} />)}
        </div>
      }>
        <Feed sort={sort} tag={tag} page={page} />
      </Suspense>
    </div>
  )
}
