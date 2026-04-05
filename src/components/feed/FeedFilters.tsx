'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { cn } from '@/lib/utils'
import { TAGS } from '@/lib/utils'
import type { FeedSort } from '@/types'

const SORTS: { value: FeedSort; label: string; icon: string }[] = [
  { value: 'trending', label: 'Trending', icon: '🔥' },
  { value: 'new',      label: 'New',      icon: '✨' },
  { value: 'top',      label: 'Top Rated', icon: '⭐' },
  { value: 'discussed', label: 'Most Discussed', icon: '💬' },
]

export function FeedFilters() {
  const router = useRouter()
  const params = useSearchParams()
  const sort = (params.get('sort') ?? 'trending') as FeedSort
  const tag  = params.get('tag') ?? ''

  function update(key: string, value: string) {
    const next = new URLSearchParams(params.toString())
    if (value) next.set(key, value)
    else next.delete(key)
    router.push('/?' + next.toString())
  }

  return (
    <div className="space-y-4">
      {/* Sort */}
      <div className="flex gap-1 flex-wrap">
        {SORTS.map(s => (
          <button
            key={s.value}
            onClick={() => update('sort', s.value)}
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-all',
              sort === s.value
                ? 'bg-primary text-primary-foreground font-medium shadow-md shadow-primary/20'
                : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
            )}
          >
            <span>{s.icon}</span>
            {s.label}
          </button>
        ))}
      </div>

      {/* Tags */}
      <div className="flex gap-1.5 flex-wrap">
        <button
          onClick={() => update('tag', '')}
          className={cn(
            'px-2.5 py-1 rounded-full text-xs transition-all border',
            !tag
              ? 'bg-secondary border-border text-foreground font-medium'
              : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
          )}
        >
          All
        </button>
        {TAGS.map(t => (
          <button
            key={t}
            onClick={() => update('tag', tag === t ? '' : t)}
            className={cn(
              'px-2.5 py-1 rounded-full text-xs transition-all border',
              tag === t
                ? 'bg-primary/20 border-primary/40 text-primary font-medium'
                : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
            )}
          >
            #{t}
          </button>
        ))}
      </div>
    </div>
  )
}
