import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

export async function PATCH(req: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { name, bio, avatar } = await req.json()

  const updated = await prisma.user.update({
    where: { id: session.user.id },
    data: {
      ...(name !== undefined && { name: name.trim() || null }),
      ...(bio !== undefined && { bio: bio.trim() || null }),
      ...(avatar !== undefined && { avatar: avatar || null }),
    },
    select: { id: true, username: true, name: true, bio: true, avatar: true },
  })

  return NextResponse.json(updated)
}
