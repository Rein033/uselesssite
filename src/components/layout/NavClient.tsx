'use client'

import Link from 'next/link'
import { signOut } from 'next-auth/react'
import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Avatar } from '@/components/ui/Avatar'
import type { Session } from 'next-auth'

export function NavClient({ session }: { session: Session | null }) {
  const [open, setOpen] = useState(false)

  if (!session) {
    return (
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/login">Log in</Link>
        </Button>
        <Button size="sm" asChild>
          <Link href="/register">Join</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-3">
      <Button size="sm" asChild>
        <Link href="/submit">+ Post Setup</Link>
      </Button>

      <div className="relative">
        <button onClick={() => setOpen(!open)} className="rounded-full ring-2 ring-transparent hover:ring-primary/50 transition-all">
          <Avatar src={session.user.image} username={session.user.username} size={32} />
        </button>

        {open && (
          <>
            <div className="fixed inset-0" onClick={() => setOpen(false)} />
            <div className="absolute right-0 mt-2 w-48 glass rounded-xl shadow-xl border border-border overflow-hidden z-50 animate-fade-in">
              <div className="px-4 py-3 border-b border-border">
                <p className="text-sm font-medium">{session.user.name}</p>
                <p className="text-xs text-muted-foreground">@{session.user.username}</p>
              </div>
              <div className="py-1">
                <Link href={`/u/${session.user.username}`} onClick={() => setOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-secondary transition-colors">
                  👤 Profile
                </Link>
                <Link href="/bookmarks" onClick={() => setOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-secondary transition-colors">
                  🔖 Bookmarks
                </Link>
                {session.user.role === 'ADMIN' && (
                  <Link href="/admin" onClick={() => setOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-primary hover:bg-secondary transition-colors">
                    ⚡ Admin
                  </Link>
                )}
                <button
                  onClick={() => signOut()}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-destructive hover:bg-secondary transition-colors"
                >
                  🚪 Sign out
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
