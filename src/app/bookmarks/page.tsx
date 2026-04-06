import Link from 'next/link'
import type { Metadata } from 'next'
import { PostCard } from '@/components/feed/PostCard'

export const metadata: Metadata = { title: 'Bookmarks' }

const DEMO = process.env.USE_DEMO_DATA === 'true'

export default async function BookmarksPage() {
  if (DEMO) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-8 text-center">
        <div className="text-5xl mb-4">🔖</div>
        <h1 className="text-2xl font-bold mb-2">Bookmarks</h1>
        <p className="text-muted-foreground mb-6">Sign in to save setups you want to revisit later.</p>
        <Link href="/login" className="inline-flex items-center justify-center px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
          Sign In
        </Link>
      </div>
    )
  }

  const { redirect } = await import('next/navigation')
  const { auth } = await import('@/lib/auth')
  const { prisma } = await import('@/lib/prisma')

  const session = await auth()
  if (!session) return redirect('/login?callbackUrl=/bookmarks')

  const bookmarks = await prisma.bookmark.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: 'desc' },
    include: {
      post: {
        include: {
          author: { select: { id: true, username: true, name: true, avatar: true } },
        },
      },
    },
  })

  const posts = bookmarks.map(b => b.post).filter(Boolean)

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-1">Bookmarks</h1>
        <p className="text-muted-foreground text-sm">{posts.length} saved setup{posts.length !== 1 ? 's' : ''}</p>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <div className="text-5xl mb-4">🔖</div>
          <p className="font-medium mb-1">No bookmarks yet</p>
          <p className="text-sm">Bookmark setups you want to revisit later.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {posts.map(post => <PostCard key={post.id} post={post as any} />)}
        </div>
      )}
    </div>
  )
}
