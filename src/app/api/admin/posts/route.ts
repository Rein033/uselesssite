import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

export async function GET(req: NextRequest) {
  const session = await auth()
  if (!session || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { searchParams } = new URL(req.url)
  const page = Math.max(1, parseInt(searchParams.get('page') ?? '1'))
  const search = searchParams.get('search') ?? ''
  const limit = 20

  const where: any = search ? { title: { contains: search, mode: 'insensitive' } } : {}

  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
      include: { author: { select: { id: true, username: true } } },
    }),
    prisma.post.count({ where }),
  ])

  return NextResponse.json({ posts, total, page, pages: Math.ceil(total / limit) })
}

export async function PATCH(req: NextRequest) {
  const session = await auth()
  if (!session || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { postId, ...fields } = await req.json()
  if (!postId) return NextResponse.json({ error: 'postId required' }, { status: 400 })

  const allowed = ['published', 'featured', 'pinned']
  const update: any = {}
  for (const key of allowed) {
    if (fields[key] !== undefined) update[key] = fields[key]
  }

  const post = await prisma.post.update({
    where: { id: postId },
    data: update,
    select: { id: true, title: true, published: true, featured: true, pinned: true },
  })

  await prisma.adminLog.create({
    data: {
      adminId: session.user.id,
      action: `Updated post "${post.title}": ${JSON.stringify(update)}`,
    },
  })

  return NextResponse.json(post)
}

export async function DELETE(req: NextRequest) {
  const session = await auth()
  if (!session || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { postId } = await req.json()
  if (!postId) return NextResponse.json({ error: 'postId required' }, { status: 400 })

  const post = await prisma.post.findUnique({ where: { id: postId }, select: { title: true, authorId: true } })
  if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  await prisma.post.delete({ where: { id: postId } })
  await prisma.user.update({
    where: { id: post.authorId },
    data: { totalPosts: { decrement: 1 } },
  })

  await prisma.adminLog.create({
    data: { adminId: session.user.id, action: `Deleted post "${post.title}"` },
  })

  return NextResponse.json({ ok: true })
}
