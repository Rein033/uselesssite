import { SubmitForm } from './SubmitForm'
import Link from 'next/link'

export const metadata = { title: 'Submit Setup' }

const DEMO = process.env.USE_DEMO_DATA === 'true'

export default async function SubmitPage() {
  if (!DEMO) {
    const { redirect } = await import('next/navigation')
    const { auth } = await import('@/lib/auth')
    const session = await auth()
    if (!session) redirect('/login?callbackUrl=/submit')
  }

  if (DEMO) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8 text-center">
        <div className="text-5xl mb-4">🔒</div>
        <h1 className="text-2xl font-bold mb-2">Create an account to post</h1>
        <p className="text-muted-foreground mb-6">This is a demo. Deploy your own instance to start posting setups.</p>
        <Link href="/register" className="inline-flex items-center justify-center px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
          Create Account
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-1">Post Your Setup</h1>
        <p className="text-muted-foreground">Share your rig with the community and get graded.</p>
      </div>
      <SubmitForm />
    </div>
  )
}
