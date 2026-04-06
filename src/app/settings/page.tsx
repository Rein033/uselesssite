import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Settings' }

const DEMO = process.env.USE_DEMO_DATA === 'true'

export default async function SettingsPage() {
  if (DEMO) {
    return (
      <div className="max-w-xl mx-auto px-4 py-8 text-center">
        <div className="text-5xl mb-4">⚙️</div>
        <h1 className="text-2xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground mb-6">Sign in to manage your profile and account settings.</p>
        <Link href="/login" className="inline-flex items-center justify-center px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
          Sign In
        </Link>
      </div>
    )
  }

  const { redirect } = await import('next/navigation')
  const { auth } = await import('@/lib/auth')
  const { prisma } = await import('@/lib/prisma')
  const { SettingsForm } = await import('./SettingsForm')

  const session = await auth()
  if (!session) return redirect('/login?callbackUrl=/settings')

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { id: true, username: true, name: true, email: true, bio: true, avatar: true },
  })

  if (!user) return redirect('/')

  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-1">Settings</h1>
        <p className="text-muted-foreground text-sm">Manage your profile and account</p>
      </div>
      <SettingsForm user={user!} />
    </div>
  )
}
