import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

export async function POST(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const existing = await prisma.bookmark.findUnique({
    where: { postId_userId: { postId: params.id, userId: session.user.id } },
  })

  if (existing) {
    await prisma.bookmark.delete({
      where: { postId_userId: { postId: params.id, userId: session.user.id } },
    })
    return NextResponse.json({ bookmarked: false })
  }

  await prisma.bookmark.create({
    data: { userId: session.user.id, postId: params.id },
  })

  return NextResponse.json({ bookmarked: true })
}

// Required for static export
export function generateStaticParams() { return [] }
