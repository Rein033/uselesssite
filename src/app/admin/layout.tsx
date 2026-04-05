import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import Link from 'next/link'

const NAV = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/posts', label: 'Posts' },
  { href: '/admin/users', label: 'Users' },
  { href: '/admin/reports', label: 'Reports' },
]

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  if (!session || session.user.role !== 'ADMIN') redirect('/')

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center text-primary font-bold text-sm">A</div>
        <h1 className="text-xl font-bold">Admin Panel</h1>
        <span className="text-xs bg-destructive/20 text-destructive border border-destructive/30 px-2 py-0.5 rounded-full">Internal</span>
      </div>

      <div className="flex gap-1 mb-8 border-b border-border pb-1">
        {NAV.map(item => (
          <Link
            key={item.href}
            href={item.href}
            className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors"
          >
            {item.label}
          </Link>
        ))}
      </div>

      {children}
    </div>
  )
}
