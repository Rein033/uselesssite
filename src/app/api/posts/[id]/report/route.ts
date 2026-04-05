import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const post = await prisma.post.findUnique({ where: { id: params.id } })
  if (!post) return NextResponse.json({ error: 'Post not found' }, { status: 404 })

  const { reason, type } = await req.json()
  if (!type) return NextResponse.json({ error: 'Report type is required' }, { status: 400 })

  const existing = await prisma.report.findFirst({
    where: { postId: params.id, reporterId: session.user.id, status: 'PENDING' },
  })
  if (existing) return NextResponse.json({ error: 'Already reported' }, { status: 409 })

  const report = await prisma.report.create({
    data: {
      postId: params.id,
      reporterId: session.user.id,
      type,
      reason: reason ?? null,
    },
  })

  return NextResponse.json(report, { status: 201 })
}
