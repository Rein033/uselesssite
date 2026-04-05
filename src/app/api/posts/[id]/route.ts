import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const post = await prisma.post.findUnique({
    where: { id: params.id, published: true },
    include: { author: { select: { id: true, username: true, name: true, avatar: true } } },
  })
  if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(post)
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const post = await prisma.post.findUnique({ where: { id: params.id } })
  if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const isOwner = post.authorId === session.user.id
  const isAdmin = session.user.role === 'ADMIN'
  if (!isOwner && !isAdmin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const body = await req.json()
  const updated = await prisma.post.update({
    where: { id: params.id },
    data: {
      ...(body.title && { title: body.title }),
      ...(body.description && { description: body.description }),
      ...(body.images !== undefined && { images: body.images }),
      ...(body.tags !== undefined && { tags: body.tags }),
      ...(body.buildCost !== undefined && { buildCost: body.buildCost }),
      ...(body.cpu !== undefined && { cpu: body.cpu }),
      ...(body.gpu !== undefined && { gpu: body.gpu }),
      ...(body.ram !== undefined && { ram: body.ram }),
      ...(body.storage !== undefined && { storage: body.storage }),
      ...(body.peripherals !== undefined && { peripherals: body.peripherals }),
      ...(body.deskChair !== undefined && { deskChair: body.deskChair }),
      // Admin-only fields
      ...(isAdmin && body.featured !== undefined && { featured: body.featured }),
      ...(isAdmin && body.pinned !== undefined && { pinned: body.pinned }),
      ...(isAdmin && body.published !== undefined && { published: body.published }),
    },
  })
  return NextResponse.json(updated)
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const post = await prisma.post.findUnique({ where: { id: params.id } })
  if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const isOwner = post.authorId === session.user.id
  const isAdmin = session.user.role === 'ADMIN'
  if (!isOwner && !isAdmin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  await prisma.post.delete({ where: { id: params.id } })
  await prisma.user.update({
    where: { id: post.authorId },
    data: { totalPosts: { decrement: 1 } },
  })

  return NextResponse.json({ ok: true })
}
