import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { timeAgo, gradeFromScore } from '@/lib/utils'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Admin Dashboard' }

export default async function AdminDashboard() {
  const [totalUsers, totalPosts, totalRatings, totalComments, pendingReports, recentPosts, recentUsers, recentLogs] = await Promise.all([
    prisma.user.count(),
    prisma.post.count(),
    prisma.rating.count(),
    prisma.comment.count({ where: { deleted: false } }),
    prisma.report.count({ where: { status: 'PENDING' } }),
    prisma.post.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
      include: { author: { select: { username: true } } },
    }),
    prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
      select: { id: true, username: true, email: true, createdAt: true, role: true },
    }),
    prisma.adminLog.findMany({
      orderBy: { createdAt: 'desc' },
      take: 10,
      include: { admin: { select: { username: true } } },
    }),
  ])

  const stats = [
    { label: 'Total Users', value: totalUsers, icon: '👥' },
    { label: 'Total Posts', value: totalPosts, icon: '🖥️' },
    { label: 'Total Ratings', value: totalRatings, icon: '⭐' },
    { label: 'Comments', value: totalComments, icon: '💬' },
    { label: 'Pending Reports', value: pendingReports, icon: '🚩', alert: pendingReports > 0 },
  ]

  return (
    <div className="space-y-8">
      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {stats.map(s => (
          <div key={s.label} className={`bg-card border rounded-xl p-4 ${s.alert ? 'border-destructive/50' : 'border-border'}`}>
            <div className="text-2xl mb-1">{s.icon}</div>
            <div className={`text-2xl font-black ${s.alert ? 'text-destructive' : ''}`}>{s.value.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Posts */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Recent Posts</h2>
            <Link href="/admin/posts" className="text-xs text-muted-foreground hover:text-foreground">View all →</Link>
          </div>
          <div className="space-y-2">
            {recentPosts.map(post => {
              const { grade, color } = gradeFromScore(post.avgRating)
              return (
                <div key={post.id} className="bg-card border border-border rounded-lg p-3 flex items-center gap-3">
                  <span className={`text-sm font-bold w-6 text-center ${color}`}>{grade}</span>
                  <div className="flex-1 min-w-0">
                    <Link href={`/post/${post.id}`} className="text-sm font-medium truncate block hover:text-primary transition-colors">
                      {post.title}
                    </Link>
                    <p className="text-xs text-muted-foreground">@{post.author.username} · {timeAgo(post.createdAt)}</p>
                  </div>
                  {!post.published && <span className="text-xs bg-secondary px-1.5 py-0.5 rounded text-muted-foreground">Hidden</span>}
                  {post.featured && <span className="text-xs text-yellow-500">⭐</span>}
                </div>
              )
            })}
          </div>
        </div>

        {/* Recent Users */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Recent Users</h2>
            <Link href="/admin/users" className="text-xs text-muted-foreground hover:text-foreground">View all →</Link>
          </div>
          <div className="space-y-2">
            {recentUsers.map(user => (
              <div key={user.id} className="bg-card border border-border rounded-lg p-3 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xs font-bold">
                  {user.username[0].toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <Link href={`/u/${user.username}`} className="text-sm font-medium hover:text-primary transition-colors">
                    @{user.username}
                  </Link>
                  <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                </div>
                <span className={`text-xs px-1.5 py-0.5 rounded ${
                  user.role === 'ADMIN' ? 'bg-primary/20 text-primary' :
                  user.role === 'BANNED' ? 'bg-destructive/20 text-destructive' :
                  'bg-secondary text-muted-foreground'
                }`}>
                  {user.role}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Audit Log */}
      {recentLogs.length > 0 && (
        <div>
          <h2 className="font-semibold mb-4">Recent Admin Actions</h2>
          <div className="bg-card border border-border rounded-xl divide-y divide-border">
            {recentLogs.map(log => (
              <div key={log.id} className="px-4 py-3 flex items-center gap-3 text-sm">
                <span className="text-muted-foreground text-xs w-28 shrink-0">{timeAgo(log.createdAt)}</span>
                <span className="text-primary text-xs font-medium">@{log.admin.username}</span>
                <span className="text-muted-foreground truncate">{log.action}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
