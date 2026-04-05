import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

export async function GET() {
  const session = await auth()
  if (!session || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const [totalUsers, totalPosts, totalRatings, totalComments, pendingReports, recentPosts, recentUsers] = await Promise.all([
    prisma.user.count(),
    prisma.post.count({ where: { published: true } }),
    prisma.rating.count(),
    prisma.comment.count({ where: { deleted: false } }),
    prisma.report.count({ where: { status: 'PENDING' } }),
    prisma.post.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
      take: 5,
      select: { id: true, title: true, createdAt: true, avgRating: true, ratingCount: true, author: { select: { username: true } } },
    }),
    prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
      select: { id: true, username: true, email: true, createdAt: true, role: true },
    }),
  ])

  return NextResponse.json({
    totalUsers, totalPosts, totalRatings, totalComments, pendingReports,
    recentPosts, recentUsers,
  })
}
