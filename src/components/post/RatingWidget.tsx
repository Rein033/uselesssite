'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { gradeFromScore, formatScore } from '@/lib/utils'
import { useToast } from '@/components/ui/Toaster'

interface RatingWidgetProps {
  postId: string
  avgRating: number
  ratingCount: number
  userRating?: number | null
}

export function RatingWidget({ postId, avgRating, ratingCount, userRating }: RatingWidgetProps) {
  const { data: session } = useSession()
  const { toast } = useToast()
  const router = useRouter()
  const [hovered, setHovered] = useState(0)
  const [submitted, setSubmitted] = useState<number | null>(userRating ?? null)
  const [loading, setLoading] = useState(false)

  const displayScore = submitted ?? avgRating
  const { grade, color } = gradeFromScore(displayScore)

  async function rate(score: number) {
    if (!session) { router.push('/login'); return }
    setLoading(true)
    try {
      const res = await fetch(`/api/posts/${postId}/rate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ score }),
      })
      if (!res.ok) throw new Error()
      setSubmitted(score)
      toast(`Rated ${score}/10!`)
      router.refresh()
    } catch {
      toast('Failed to submit rating', 'error')
    } finally {
      setLoading(false)
    }
  }

  const activeScore = hovered || submitted || 0

  return (
    <div className="bg-card border border-border rounded-xl p-5 space-y-4">
      {/* Current score */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-muted-foreground mb-1">Community Rating</p>
          <div className="flex items-baseline gap-2">
            <span className={`text-4xl font-black ${color}`}>{grade}</span>
            <span className="text-2xl font-bold text-foreground">{formatScore(avgRating)}</span>
            <span className="text-sm text-muted-foreground">/ 10</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">{ratingCount} rating{ratingCount !== 1 ? 's' : ''}</p>
        </div>

        {submitted && (
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Your rating</p>
            <p className="text-xl font-bold text-primary">{submitted}/10</p>
          </div>
        )}
      </div>

      {/* Score selector */}
      {!submitted && (
        <div>
          <p className="text-xs text-muted-foreground mb-2">
            {session ? 'Rate this setup:' : 'Log in to rate'}
          </p>
          <div className="flex gap-1 flex-wrap">
            {Array.from({ length: 10 }, (_, i) => i + 1).map(n => {
              const { grade: g, color: c } = gradeFromScore(n)
              return (
                <button
                  key={n}
                  disabled={loading || !session}
                  onMouseEnter={() => setHovered(n)}
                  onMouseLeave={() => setHovered(0)}
                  onClick={() => rate(n)}
                  className={`
                    w-9 h-9 rounded-lg text-sm font-bold transition-all border
                    ${activeScore >= n
                      ? `${c} bg-secondary border-current scale-110`
                      : 'text-muted-foreground border-border hover:border-current hover:scale-105'
                    }
                    disabled:opacity-40 disabled:cursor-not-allowed
                  `}
                >
                  {n}
                </button>
              )
            })}
          </div>
          {activeScore > 0 && (
            <p className={`text-xs mt-2 font-medium ${gradeFromScore(activeScore).color}`}>
              Grade {gradeFromScore(activeScore).grade} — {activeScore}/10
            </p>
          )}
        </div>
      )}
    </div>
  )
}
