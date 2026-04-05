import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function POST(req: NextRequest) {
  const { username, email, password } = await req.json()

  if (!username || !email || !password) {
    return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
  }
  if (!/^[a-z0-9_]+$/.test(username)) {
    return NextResponse.json({ error: 'Invalid username format' }, { status: 400 })
  }
  if (username.length < 3 || username.length > 30) {
    return NextResponse.json({ error: 'Username must be 3–30 characters' }, { status: 400 })
  }
  if (password.length < 8) {
    return NextResponse.json({ error: 'Password must be at least 8 characters' }, { status: 400 })
  }

  const existing = await prisma.user.findFirst({
    where: { OR: [{ email }, { username }] },
  })
  if (existing) {
    if (existing.email === email) return NextResponse.json({ error: 'Email already registered' }, { status: 409 })
    return NextResponse.json({ error: 'Username already taken' }, { status: 409 })
  }

  const hashedPassword = await bcrypt.hash(password, 12)
  const user = await prisma.user.create({
    data: { username, email, password: hashedPassword },
    select: { id: true, username: true, email: true },
  })

  return NextResponse.json(user, { status: 201 })
}
