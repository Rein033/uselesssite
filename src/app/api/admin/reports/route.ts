import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

export async function GET(req: NextRequest) {
  const session = await auth()
  if (!session || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { searchParams } = new URL(req.url)
  const status = searchParams.get('status') ?? 'PENDING'
  const page = Math.max(1, parseInt(searchParams.get('page') ?? '1'))
  const limit = 20

  const [reports, total] = await Promise.all([
    prisma.report.findMany({
      where: { status: status as any },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
      include: {
        reporter: { select: { id: true, username: true } },
        post: { select: { id: true, title: true, author: { select: { username: true } } } },
      },
    }),
    prisma.report.count({ where: { status: status as any } }),
  ])

  return NextResponse.json({ reports, total, page, pages: Math.ceil(total / limit) })
}

export async function PATCH(req: NextRequest) {
  const session = await auth()
  if (!session || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { reportId, status } = await req.json()
  if (!reportId || !status) return NextResponse.json({ error: 'reportId and status required' }, { status: 400 })
  if (!['PENDING', 'RESOLVED', 'DISMISSED'].includes(status)) {
    return NextResponse.json({ error: 'Invalid status' }, { status: 400 })
  }

  const report = await prisma.report.update({
    where: { id: reportId },
    data: { status },
  })

  return NextResponse.json(report)
}
