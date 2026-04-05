'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { timeAgo } from '@/lib/utils'
import Link from 'next/link'

type Report = {
  id: string
  type: string
  reason: string | null
  status: string
  createdAt: string
  reporter: { id: string; username: string }
  post: { id: string; title: string; author: { username: string } } | null
}

const STATUS_TABS = ['PENDING', 'RESOLVED', 'DISMISSED']

export default function AdminReportsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const status = searchParams.get('status') ?? 'PENDING'
  const page = parseInt(searchParams.get('page') ?? '1')

  const [data, setData] = useState<{ reports: Report[]; total: number; pages: number } | null>(null)
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    fetch(`/api/admin/reports?status=${status}&page=${page}`)
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false) })
  }, [status, page])

  function navigate(params: Record<string, string>) {
    const sp = new URLSearchParams({ status, page: '1', ...params })
    router.push(`/admin/reports?${sp}`)
  }

  async function updateStatus(reportId: string, newStatus: string) {
    setUpdating(reportId)
    await fetch('/api/admin/reports', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reportId, status: newStatus }),
    })
    setData(d => d ? { ...d, reports: d.reports.filter(r => r.id !== reportId), total: d.total - 1 } : d)
    setUpdating(null)
  }

  return (
    <div className="space-y-6">
      {/* Status tabs */}
      <div className="flex gap-1">
        {STATUS_TABS.map(s => (
          <button
            key={s}
            onClick={() => navigate({ status: s })}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              status === s ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
            }`}
          >
            {s.charAt(0) + s.slice(1).toLowerCase()}
          </button>
        ))}
        {data && <span className="ml-auto text-sm text-muted-foreground self-center">{data.total} reports</span>}
      </div>

      {loading ? (
        <div className="text-center py-12 text-muted-foreground">Loading...</div>
      ) : data?.reports.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">No {status.toLowerCase()} reports.</div>
      ) : (
        <div className="space-y-3">
          {data?.reports.map(report => (
            <div key={report.id} className="bg-card border border-border rounded-xl p-4 space-y-3">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold bg-secondary px-2 py-0.5 rounded">{report.type}</span>
                    <span className="text-xs text-muted-foreground">{timeAgo(new Date(report.createdAt))}</span>
                  </div>
                  <p className="text-sm">
                    <span className="text-muted-foreground">Reported by </span>
                    <Link href={`/u/${report.reporter.username}`} className="text-primary hover:underline">
                      @{report.reporter.username}
                    </Link>
                  </p>
                  {report.post && (
                    <p className="text-sm mt-0.5">
                      <span className="text-muted-foreground">Post: </span>
                      <Link href={`/post/${report.post.id}`} className="hover:text-primary transition-colors">
                        {report.post.title}
                      </Link>
                      <span className="text-muted-foreground"> by @{report.post.author.username}</span>
                    </p>
                  )}
                  {report.reason && (
                    <p className="text-sm text-muted-foreground mt-1 bg-secondary/50 rounded-lg px-3 py-2 mt-2">
                      "{report.reason}"
                    </p>
                  )}
                </div>

                {status === 'PENDING' && (
                  <div className="flex gap-2 flex-shrink-0">
                    <button
                      onClick={() => updateStatus(report.id, 'RESOLVED')}
                      disabled={updating === report.id}
                      className="text-xs px-3 py-1.5 rounded-lg bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-colors disabled:opacity-50"
                    >
                      Resolve
                    </button>
                    <button
                      onClick={() => updateStatus(report.id, 'DISMISSED')}
                      disabled={updating === report.id}
                      className="text-xs px-3 py-1.5 rounded-lg bg-secondary text-muted-foreground hover:bg-secondary/80 transition-colors disabled:opacity-50"
                    >
                      Dismiss
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {data && data.pages > 1 && (
        <div className="flex gap-2 justify-center">
          {Array.from({ length: data.pages }, (_, i) => i + 1).map(p => (
            <button
              key={p}
              onClick={() => navigate({ page: String(p) })}
              className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
                p === page ? 'bg-primary text-primary-foreground' : 'bg-secondary hover:bg-secondary/80 text-muted-foreground'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
