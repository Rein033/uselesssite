import { Suspense } from 'react'
import AdminUsersClient from './AdminUsersClient'

export default function AdminUsersPage() {
  return <Suspense fallback={<div className="text-center py-12 text-muted-foreground">Loading...</div>}><AdminUsersClient /></Suspense>
}
