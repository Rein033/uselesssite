import { Suspense } from 'react'

const DEMO = process.env.USE_DEMO_DATA === 'true'

async function AdminUsersInner() {
  if (DEMO) {
    const { DEMO_USERS } = await import('@/lib/demo-data')
    return (
      <div className="space-y-2">
        {DEMO_USERS.map(user => (
          <div key={user.id} className="bg-card border border-border rounded-xl p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center font-bold">
              {user.username[0].toUpperCase()}
            </div>
            <div className="flex-1">
              <p className="font-medium">@{user.username}</p>
              <p className="text-sm text-muted-foreground">{user.totalPosts} posts · {user.avgRating.toFixed(1)} avg</p>
            </div>
            <span className="text-xs bg-secondary px-2 py-1 rounded text-muted-foreground">USER</span>
          </div>
        ))}
        <p className="text-center text-xs text-muted-foreground pt-4">Full user management available after deployment with a real database.</p>
      </div>
    )
  }
  const { default: AdminUsersClient } = await import('./AdminUsersClient')
  return <AdminUsersClient />
}

export default function AdminUsersPage() {
  return (
    <Suspense fallback={<div className="text-center py-12 text-muted-foreground">Loading...</div>}>
      <AdminUsersInner />
    </Suspense>
  )
}
