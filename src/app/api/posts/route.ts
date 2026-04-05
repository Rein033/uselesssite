import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { z } from 'zod'

const CreatePostSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(10).max(5000),
  images: z.array(z.string().url()).max(6).default([]),
  tags: z.array(z.string()).max(5).default([]),
  buildCost: z.number().positive().nullable().optional(),
  cpu: z.string().max(100).optional(),
  gpu: z.string().max(100).optional(),
  ram: z.string().max(100).optional(),
  storage: z.string().max(100).optional(),
  peripherals: z.string().max(200).optional(),
  deskChair: z.string().max(200).optional(),
})

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const sort = searchParams.get('sort') ?? 'trending'
  const tag = searchParams.get('tag')
  const page = Math.max(1, parseInt(searchParams.get('page') ?? '1'))
  const limit = 12

  const where: any = { published: true }
  if (tag) where.tags = { has: tag }

  let orderBy: any[]
  if (sort === 'new') orderBy = [{ createdAt: 'desc' }]
  else if (sort === 'top') orderBy = [{ avgRating: 'desc' }, { ratingCount: 'desc' }]
  else if (sort === 'discussed') orderBy = [{ commentCount: 'desc' }, { createdAt: 'desc' }]
  else {
    // trending: weighted score
    orderBy = [{ ratingCount: 'desc' }, { avgRating: 'desc' }, { createdAt: 'desc' }]
  }

  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where,
      orderBy,
      skip: (page - 1) * limit,
      take: limit,
      include: {
        author: { select: { id: true, username: true, name: true, avatar: true } },
      },
    }),
    prisma.post.count({ where }),
  ])

  return NextResponse.json({ posts, total, page, pages: Math.ceil(total / limit) })
}

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (session.user.role === 'BANNED') return NextResponse.json({ error: 'Your account is banned' }, { status: 403 })

  const body = await req.json()
  const parsed = CreatePostSchema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 })

  const data = parsed.data
  const post = await prisma.post.create({
    data: {
      title: data.title,
      description: data.description,
      images: data.images,
      tags: data.tags,
      buildCost: data.buildCost ?? null,
      cpu: data.cpu ?? null,
      gpu: data.gpu ?? null,
      ram: data.ram ?? null,
      storage: data.storage ?? null,
      peripherals: data.peripherals ?? null,
      deskChair: data.deskChair ?? null,
      authorId: session.user.id,
      published: true,
    },
  })

  await prisma.user.update({
    where: { id: session.user.id },
    data: { totalPosts: { increment: 1 } },
  })

  return NextResponse.json(post, { status: 201 })
}
