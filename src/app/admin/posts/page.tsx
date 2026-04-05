'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { timeAgo, gradeFromScore } from '@/lib/utils'
import Link from 'next/link'

type Post = {
  id: string
  title: string
  published: boolean
  featured: boolean
  pinned: boolean
  avgRating: number
  ratingCount: number
  createdAt: string
  author: { username: string }
}

export default function AdminPostsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const page = parseInt(searchParams.get('page') ?? '1')
  const search = searchParams.get('search') ?? ''

  const [data, setData] = useState<{ posts: Post[]; total: number; pages: number } | null>(null)
  const [loading, setLoading] = useState(true)
  const [searchInput, setSearchInput] = useState(search)
  const [updating, setUpdating] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    fetch(`/api/admin/posts?page=${page}&search=${encodeURIComponent(search)}`)
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false) })
  }, [page, search])

  function navigate(params: Record<string, string>) {
    const sp = new URLSearchParams({ page: '1', search, ...params })
    router.push(`/admin/posts?${sp}`)
  }

  async function toggle(postId: string, field: string, value: boolean) {
    setUpdating(postId)
    await fetch('/api/admin/posts', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ postId, [field]: value }),
    })
    setUpdating(null)
    setData(d => d ? {
      ...d,
      posts: d.posts.map(p => p.id === postId ? { ...p, [field]: value } : p),
    } : d)
  }

  async function deletePost(postId: string, title: string) {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return
    setUpdating(postId)
    await fetch('/api/admin/posts', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ postId }),
    })
    setData(d => d ? { ...d, posts: d.posts.filter(p => p.id !== postId), total: d.total - 1 } : d)
    setUpdating(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <form onSubmit={e => { e.preventDefault(); navigate({ search: searchInput }) }} className="flex gap-2 flex-1 max-w-sm">
          <input
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
            placeholder="Search posts..."
            className="flex-1 bg-secondary border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring placeholder:text-muted-foreground"
          />
          <button type="submit" className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
            Search
          </button>
        </form>
        {data && <span className="text-sm text-muted-foreground">{data.total} posts</span>}
      </div>

      {loading ? (
        <div className="text-center py-12 text-muted-foreground">Loading...</div>
      ) : (
        <div className="space-y-2">
          {data?.posts.map(post => {
            const { grade, color } = gradeFromScore(post.avgRating)
            return (
              <div key={post.id} className="bg-card border border-border rounded-xl p-4 flex items-center gap-4">
                <span className={`text-lg font-black w-8 text-center ${color}`}>{grade}</span>
                <div className="flex-1 min-w-0">
                  <Link href={`/post/${post.id}`} className="font-medium hover:text-primary transition-colors truncate block">
                    {post.title}
                  </Link>
                  <p className="text-xs text-muted-foreground">
                    @{post.author.username} · {timeAgo(new Date(post.createdAt))} · {post.ratingCount} ratings
                  </p>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => toggle(post.id, 'published', !post.published)}
                    disabled={updating === post.id}
                    className={`text-xs px-2 py-1 rounded transition-colors ${
                      post.published
                        ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                        : 'bg-secondary text-muted-foreground hover:bg-secondary/80'
                    }`}
                  >
                    {post.published ? 'Visible' : 'Hidden'}
                  </button>
                  <button
                    onClick={() => toggle(post.id, 'featured', !post.featured)}
                    disabled={updating === post.id}
                    className={`text-xs px-2 py-1 rounded transition-colors ${
                      post.featured
                        ? 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30'
                        : 'bg-secondary text-muted-foreground hover:bg-secondary/80'
                    }`}
                  >
                    {post.featured ? '⭐ Featured' : 'Feature'}
                  </button>
                  <button
                    onClick={() => toggle(post.id, 'pinned', !post.pinned)}
                    disabled={updating === post.id}
                    className={`text-xs px-2 py-1 rounded transition-colors ${
                      post.pinned
                        ? 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30'
                        : 'bg-secondary text-muted-foreground hover:bg-secondary/80'
                    }`}
                  >
                    {post.pinned ? '📌 Pinned' : 'Pin'}
                  </button>
                  <button
                    onClick={() => deletePost(post.id, post.title)}
                    disabled={updating === post.id}
                    className="text-xs px-2 py-1 rounded bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Pagination */}
      {data && data.pages > 1 && (
        <div className="flex gap-2 justify-center">
          {Array.from({ length: data.pages }, (_, i) => i + 1).map(p => (
            <button
              key={p}
              onClick={() => navigate({ page: String(p) })}
              className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
                p === page ? 'bg-primary text-primary-foreground' : 'bg-secondary hover:bg-secondary/80 text-muted-foreground'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
