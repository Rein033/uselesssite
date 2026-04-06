import { Suspense } from 'react'

const DEMO = process.env.USE_DEMO_DATA === 'true'

async function AdminReportsInner() {
  if (DEMO) {
    return (
      <div className="text-center py-16 text-muted-foreground">
        <div className="text-4xl mb-4">🚩</div>
        <p className="font-medium mb-1">No reports</p>
        <p className="text-sm">Report management is available after deployment with a real database.</p>
      </div>
    )
  }
  const { default: AdminReportsClient } = await import('./AdminReportsClient')
  return <AdminReportsClient />
}

export default function AdminReportsPage() {
  return (
    <Suspense fallback={<div className="text-center py-12 text-muted-foreground">Loading...</div>}>
      <AdminReportsInner />
    </Suspense>
  )
}
