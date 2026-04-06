import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

export async function POST(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth()
  if (!session) return NextResponse.redirect(new URL('/login', _req.url))

  if (session.user.id === params.id) {
    return NextResponse.json({ error: 'Cannot follow yourself' }, { status: 400 })
  }

  const target = await prisma.user.findUnique({ where: { id: params.id } })
  if (!target) return NextResponse.json({ error: 'User not found' }, { status: 404 })

  const existing = await prisma.follow.findUnique({
    where: { followerId_followingId: { followerId: session.user.id, followingId: params.id } },
  })

  if (existing) {
    await prisma.follow.delete({
      where: { followerId_followingId: { followerId: session.user.id, followingId: params.id } },
    })
    return NextResponse.redirect(new URL(`/u/${target.username}`, _req.url))
  }

  await prisma.follow.create({
    data: { followerId: session.user.id, followingId: params.id },
  })

  return NextResponse.redirect(new URL(`/u/${target.username}`, _req.url))
}

// Required for static export
export function generateStaticParams() { return [] }
