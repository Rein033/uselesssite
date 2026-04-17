'use client'

import { SessionProvider } from 'next-auth/react'

export function Providers({ children }: { children: React.ReactNode }) {
  // In demo/static mode pass a pre-resolved null session so SessionProvider
  // never fetches /api/auth/session (which doesn't exist in the static build).
  // This prevents unhandled fetch errors that block React hydration.
  const demoSession = process.env.NEXT_PUBLIC_IS_DEMO === 'true'
    ? null
    : undefined

  return (
    <SessionProvider
      session={demoSession as any}
      refetchInterval={0}
      refetchOnWindowFocus={false}
    >
      {children}
    </SessionProvider>
  )
}
