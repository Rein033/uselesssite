import { Suspense } from 'react'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { PostCard } from '@/components/feed/PostCard'
import { FeedFilters } from '@/components/feed/FeedFilters'
import { PostCardSkeleton } from '@/components/ui/Skeleton'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import type { FeedSort } from '@/types'

interface PageProps {
  searchParams: { sort?: FeedSort; tag?: string; page?: string }
}

const PAGE_SIZE = 12

async function Feed({ sort, tag, page }: { sort: FeedSort; tag: string; page: number }) {
  const session = await auth()
  const skip = (page - 1) * PAGE_SIZE

  const where = {
    published: true,
    ...(tag ? { tags: { has: tag } } : {}),
  }

  const orderBy =
    sort === 'new'       ? { createdAt: 'desc' as const } :
    sort === 'top'       ? { avgRating: 'desc' as const } :
    sort === 'discussed' ? { commentCount: 'desc' as const } :
    /* trending */         { ratingCount: 'desc' as const }

  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where,
      orderBy,
      skip,
      take: PAGE_SIZE,
      include: {
        author: { select: { id: true, username: true, name: true, avatar: true } },
      },
    }),
    prisma.post.count({ where }),
  ])

  // Add user bookmarks
  let bookmarkedIds: Set<string> = new Set()
  if (session?.user.id) {
    const bookmarks = await prisma.bookmark.findMany({
      where: { userId: session.user.id, postId: { in: posts.map(p => p.id) } },
      select: { postId: true },
    })
    bookmarkedIds = new Set(bookmarks.map(b => b.postId))
  }

  const hasMore = skip + posts.length < total

  if (posts.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-5xl mb-4">🖥️</div>
        <h3 className="text-lg font-semibold mb-2">No setups yet</h3>
        <p className="text-muted-foreground mb-6">Be the first to post your rig!</p>
        <Button asChild>
          <Link href="/submit">Post Your Setup</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {posts.map(post => (
          <PostCard key={post.id} post={{ ...post, isBookmarked: bookmarkedIds.has(post.id) }} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-3 pt-4">
        {page > 1 && (
          <Button variant="outline" asChild>
            <Link href={`/?sort=${sort}&tag=${tag}&page=${page - 1}`}>← Previous</Link>
          </Button>
        )}
        {hasMore && (
          <Button variant="outline" asChild>
            <Link href={`/?sort=${sort}&tag=${tag}&page=${page + 1}`}>Next →</Link>
          </Button>
        )}
      </div>
    </div>
  )
}

export default function HomePage({ searchParams }: PageProps) {
  const sort  = (searchParams.sort ?? 'trending') as FeedSort
  const tag   = searchParams.tag ?? ''
  const page  = parseInt(searchParams.page ?? '1', 10)

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Hero */}
      <div className="text-center space-y-3 py-6">
        <h1 className="text-4xl font-black tracking-tight">
          <span className="bg-gradient-to-r from-primary via-violet-400 to-pink-400 bg-clip-text text-transparent">
            Post Your Rig.
          </span>
          <br />
          <span className="text-foreground">Get Graded.</span>
        </h1>
        <p className="text-muted-foreground max-w-md mx-auto">
          Share your gaming rig, dev workspace or home office. Let the community rate it from D to S.
        </p>
        <Button size="lg" asChild>
          <Link href="/submit">📸 Post Your Setup</Link>
        </Button>
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
