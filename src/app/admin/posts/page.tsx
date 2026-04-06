import { Suspense } from 'react'
import { gradeFromScore } from '@/lib/utils'
import Link from 'next/link'

const DEMO = process.env.USE_DEMO_DATA === 'true'

async function AdminPostsInner() {
  if (DEMO) {
    const { DEMO_POSTS } = await import('@/lib/demo-data')
    return (
      <div className="space-y-2">
        {DEMO_POSTS.map(post => {
          const { grade, color } = gradeFromScore(post.avgRating)
          return (
            <div key={post.id} className="bg-card border border-border rounded-xl p-4 flex items-center gap-4">
              <span className={`text-lg font-black w-8 text-center ${color}`}>{grade}</span>
              <div className="flex-1 min-w-0">
                <Link href={`/post/${post.id}`} className="font-medium hover:text-primary transition-colors truncate block">{post.title}</Link>
                <p className="text-xs text-muted-foreground">@{post.author.username} · {post.ratingCount} ratings</p>
              </div>
              <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">Visible</span>
            </div>
          )
        })}
        <p className="text-center text-xs text-muted-foreground pt-4">Full post management available after deployment with a real database.</p>
      </div>
    )
  }
  const { default: AdminPostsClient } = await import('./AdminPostsClient')
  return <AdminPostsClient />
}

export default function AdminPostsPage() {
  return (
    <Suspense fallback={<div className="text-center py-12 text-muted-foreground">Loading...</div>}>
      <AdminPostsInner />
    </Suspense>
  )
}
