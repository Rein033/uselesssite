import Link from 'next/link'
import { NavClient } from './NavClient'

const DEMO = process.env.USE_DEMO_DATA === 'true'

export async function Navbar() {
  let session = null
  if (!DEMO) {
    const { auth } = await import('@/lib/auth')
    session = await auth()
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 glass">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-lg shrink-0">
          <span className="text-2xl">📌</span>
          <span className="bg-gradient-to-r from-primary to-violet-400 bg-clip-text text-transparent">
            UselessSite
          </span>
        </Link>

        {/* Center nav */}
        <nav className="hidden md:flex items-center gap-1 text-sm">
          <Link href="/" className="px-3 py-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
            Portfolio
          </Link>
          <Link href="/feed" className="px-3 py-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
            Feed
          </Link>
          <Link href="/leaderboard" className="px-3 py-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
            Leaderboard
          </Link>
          <Link href="/scrum" className="px-3 py-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
            Scrum
          </Link>
        </nav>

        {/* Right */}
        <NavClient session={session} />
      </div>
    </header>
  )
}
