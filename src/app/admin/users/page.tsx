'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { timeAgo } from '@/lib/utils'
import Link from 'next/link'

type User = {
  id: string
  username: string
  email: string
  name: string | null
  role: string
  createdAt: string
  totalPosts: number
  avgRating: number
}

const ROLES = ['USER', 'ADMIN', 'BANNED']

export default function AdminUsersPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const page = parseInt(searchParams.get('page') ?? '1')
  const search = searchParams.get('search') ?? ''

  const [data, setData] = useState<{ users: User[]; total: number; pages: number } | null>(null)
  const [loading, setLoading] = useState(true)
  const [searchInput, setSearchInput] = useState(search)
  const [updating, setUpdating] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    fetch(`/api/admin/users?page=${page}&search=${encodeURIComponent(search)}`)
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false) })
  }, [page, search])

  function navigate(params: Record<string, string>) {
    const sp = new URLSearchParams({ page: '1', search, ...params })
    router.push(`/admin/users?${sp}`)
  }

  async function changeRole(userId: string, role: string) {
    setUpdating(userId)
    await fetch('/api/admin/users', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, role }),
    })
    setUpdating(null)
    router.refresh()
    setData(d => d ? {
      ...d,
      users: d.users.map(u => u.id === userId ? { ...u, role } : u),
    } : d)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <form onSubmit={e => { e.preventDefault(); navigate({ search: searchInput }) }} className="flex gap-2 flex-1 max-w-sm">
          <input
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
            placeholder="Search users..."
            className="flex-1 bg-secondary border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring placeholder:text-muted-foreground"
          />
          <button type="submit" className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
            Search
          </button>
        </form>
        {data && <span className="text-sm text-muted-foreground">{data.total} users</span>}
      </div>

      {loading ? (
        <div className="text-center py-12 text-muted-foreground">Loading...</div>
      ) : (
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="border-b border-border">
              <tr className="text-left">
                <th className="px-4 py-3 text-muted-foreground font-medium">User</th>
                <th className="px-4 py-3 text-muted-foreground font-medium hidden sm:table-cell">Posts</th>
                <th className="px-4 py-3 text-muted-foreground font-medium hidden md:table-cell">Avg Rating</th>
                <th className="px-4 py-3 text-muted-foreground font-medium hidden lg:table-cell">Joined</th>
                <th className="px-4 py-3 text-muted-foreground font-medium">Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {data?.users.map(user => (
                <tr key={user.id} className="hover:bg-secondary/30 transition-colors">
                  <td className="px-4 py-3">
                    <Link href={`/u/${user.username}`} className="font-medium hover:text-primary transition-colors">
                      @{user.username}
                    </Link>
                    <p className="text-xs text-muted-foreground truncate max-w-[200px]">{user.email}</p>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell text-muted-foreground">{user.totalPosts}</td>
                  <td className="px-4 py-3 hidden md:table-cell text-muted-foreground">
                    {user.avgRating > 0 ? user.avgRating.toFixed(1) : '—'}
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell text-muted-foreground text-xs">
                    {timeAgo(new Date(user.createdAt))}
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={user.role}
                      onChange={e => changeRole(user.id, e.target.value)}
                      disabled={updating === user.id}
                      className="bg-secondary border border-border rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-ring disabled:opacity-50"
                    >
                      {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
