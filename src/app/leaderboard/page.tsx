import { Avatar } from '@/components/ui/Avatar'
import { gradeFromScore } from '@/lib/utils'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Leaderboard' }

const DEMO = process.env.USE_DEMO_DATA === 'true'
const PERIODS = ['weekly', 'monthly', 'alltime'] as const
type Period = typeof PERIODS[number]
interface Props { searchParams: { period?: Period } }

function getDateFilter(period: Period) {
  const now = new Date()
  if (period === 'weekly')  { const d = new Date(now); d.setDate(d.getDate() - 7); return d }
  if (period === 'monthly') { const d = new Date(now); d.setMonth(d.getMonth() - 1); return d }
  return undefined
}

export default async function LeaderboardPage({ searchParams }: Props) {
  // In demo mode ignore searchParams to allow static export
  const period = (DEMO ? 'alltime' : (searchParams.period ?? 'alltime')) as Period

  let posts: any[] = []
  let topUsers: any[] = []

  if (DEMO) {
    const { DEMO_POSTS, DEMO_USERS } = await import('@/lib/demo-data')
    const since = getDateFilter(period)
    posts = DEMO_POSTS
      .filter(p => p.ratingCount >= 3 && (!since || p.createdAt >= since))
      .sort((a, b) => b.avgRating - a.avgRating)
      .slice(0, 20)
    topUsers = [...DEMO_USERS].sort((a, b) => b.avgRating - a.avgRating)
  } else {
    const { prisma } = await import('@/lib/prisma')
    const since = getDateFilter(period)
    ;[posts, topUsers] = await Promise.all([
      prisma.post.findMany({
        where: { published: true, ratingCount: { gte: 3 }, ...(since ? { createdAt: { gte: since } } : {}) },
        orderBy: [{ avgRating: 'desc' }, { ratingCount: 'desc' }],
        take: 20,
        include: { author: { select: { id: true, username: true, name: true, avatar: true } } },
      }),
      prisma.user.findMany({
        where: { totalRatings: { gte: 3 } },
        orderBy: { avgRating: 'desc' },
        take: 10,
        select: { id: true, username: true, name: true, avatar: true, avgRating: true, totalPosts: true, totalRatings: true },
      }),
    ])
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-10">
      <div>
        <h1 className="text-3xl font-black mb-1">🏆 Leaderboard</h1>
        <p className="text-muted-foreground">The highest-rated setups in the community.</p>
      </div>

      <div className="flex gap-2">
        {PERIODS.map(p => (
          <Link
            key={p}
            href={`/leaderboard?period=${p}`}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize ${
              period === p ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
            }`}
          >
            {p === 'alltime' ? 'All Time' : p.charAt(0).toUpperCase() + p.slice(1)}
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <h2 className="font-semibold text-lg">Top Setups</h2>
          {posts.length === 0 ? (
            <p className="text-muted-foreground py-8 text-center">Not enough ratings yet for this period.</p>
          ) : (
            <div className="space-y-3">
              {posts.map((post: any, i: number) => {
                const { grade, color } = gradeFromScore(post.avgRating)
                return (
                  <Link key={post.id} href={`/post/${post.id}`} className="group flex items-center gap-4 bg-card border border-border rounded-xl p-4 hover:border-primary/40 transition-all">
                    <div className="text-2xl font-black text-muted-foreground/40 w-8 text-center">
                      {i < 3 ? ['🥇','🥈','🥉'][i] : `#${i + 1}`}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold truncate group-hover:text-primary transition-colors">{post.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">by @{post.author.username} · {post.ratingCount} ratings</p>
                    </div>
                    <div className={`text-xl font-black ${color}`}>{grade} <span className="text-sm font-normal">{post.avgRating.toFixed(1)}</span></div>
                  </Link>
                )
              })}
            </div>
          )}
        </div>

        <div>
          <h2 className="font-semibold text-lg mb-4">Top Builders</h2>
          <div className="space-y-3">
            {topUsers.map((user: any, i: number) => {
              const { grade, color } = gradeFromScore(user.avgRating)
              return (
                <Link key={user.id} href={`/u/${user.username}`} className="flex items-center gap-3 bg-card border border-border rounded-xl p-3 hover:border-primary/40 transition-all">
                  <span className="text-sm font-bold text-muted-foreground/60 w-5">#{i+1}</span>
                  <Avatar src={user.avatar} username={user.username} size={36} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">@{user.username}</p>
                    <p className="text-xs text-muted-foreground">{user.totalPosts} posts</p>
                  </div>
                  <span className={`text-sm font-bold ${color}`}>{grade}</span>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
