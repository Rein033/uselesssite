import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (session.user.role === 'BANNED') return NextResponse.json({ error: 'Account banned' }, { status: 403 })

  const post = await prisma.post.findUnique({ where: { id: params.id, published: true } })
  if (!post) return NextResponse.json({ error: 'Post not found' }, { status: 404 })
  if (post.authorId === session.user.id) return NextResponse.json({ error: 'Cannot rate your own setup' }, { status: 400 })

  const { score } = await req.json()
  if (typeof score !== 'number' || score < 1 || score > 10) {
    return NextResponse.json({ error: 'Score must be 1–10' }, { status: 400 })
  }

  const existing = await prisma.rating.findUnique({
    where: { postId_userId: { postId: params.id, userId: session.user.id } },
  })

  if (existing) {
    await prisma.rating.update({
      where: { postId_userId: { postId: params.id, userId: session.user.id } },
      data: { score },
    })
  } else {
    await prisma.rating.create({
      data: { postId: params.id, userId: session.user.id, score },
    })
  }

  // Recalculate cached stats
  const agg = await prisma.rating.aggregate({
    where: { postId: params.id },
    _avg: { score: true },
    _count: { score: true },
  })

  const avgRating = agg._avg.score ?? 0
  const ratingCount = agg._count.score

  await prisma.post.update({
    where: { id: params.id },
    data: { avgRating, ratingCount },
  })

  // Update author's cached stats
  const authorAgg = await prisma.rating.aggregate({
    where: { post: { authorId: post.authorId } },
    _avg: { score: true },
    _count: { score: true },
  })
  await prisma.user.update({
    where: { id: post.authorId },
    data: {
      avgRating: authorAgg._avg.score ?? 0,
      totalRatings: authorAgg._count.score,
    },
  })

  return NextResponse.json({ avgRating, ratingCount, userScore: score })
}
