import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (session.user.role === 'BANNED') return NextResponse.json({ error: 'Account banned' }, { status: 403 })

  const post = await prisma.post.findUnique({ where: { id: params.id, published: true } })
  if (!post) return NextResponse.json({ error: 'Post not found' }, { status: 404 })

  const { content, parentId } = await req.json()
  if (!content || typeof content !== 'string' || content.trim().length === 0) {
    return NextResponse.json({ error: 'Comment content is required' }, { status: 400 })
  }
  if (content.length > 2000) {
    return NextResponse.json({ error: 'Comment too long (max 2000 chars)' }, { status: 400 })
  }

  if (parentId) {
    const parent = await prisma.comment.findUnique({ where: { id: parentId } })
    if (!parent) return NextResponse.json({ error: 'Parent comment not found' }, { status: 404 })
  }

  const comment = await prisma.comment.create({
    data: {
      content: content.trim(),
      postId: params.id,
      authorId: session.user.id,
      parentId: parentId ?? null,
    },
    include: {
      author: { select: { id: true, username: true, name: true, avatar: true } },
    },
  })

  await prisma.post.update({
    where: { id: params.id },
    data: { commentCount: { increment: 1 } },
  })

  return NextResponse.json(comment, { status: 201 })
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { commentId } = await req.json()
  const comment = await prisma.comment.findUnique({ where: { id: commentId } })
  if (!comment) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const isOwner = comment.authorId === session.user.id
  const isAdmin = session.user.role === 'ADMIN'
  if (!isOwner && !isAdmin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  await prisma.comment.update({
    where: { id: commentId },
    data: { deleted: true, content: '[deleted]' },
  })

  return NextResponse.json({ ok: true })
}

// Required for static export
export function generateStaticParams() { return [] }
