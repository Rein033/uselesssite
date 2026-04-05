import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { SubmitForm } from './SubmitForm'

export const metadata = { title: 'Submit Setup' }

export default async function SubmitPage() {
  const session = await auth()
  if (!session) redirect('/login?callbackUrl=/submit')

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
