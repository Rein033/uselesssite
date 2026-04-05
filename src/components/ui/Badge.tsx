import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'secondary' | 'outline' | 'grade'
  grade?: string
  className?: string
}

const gradeColors: Record<string, string> = {
  S: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
  A: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  B: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
  C: 'bg-violet-500/15 text-violet-400 border-violet-500/30',
  D: 'bg-red-500/15 text-red-400 border-red-500/30',
}

export function Badge({ children, variant = 'default', grade, className }: BadgeProps) {
  const base = 'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium border transition-colors'
  const variants = {
    default:   'bg-primary/15 text-primary border-primary/30',
    secondary: 'bg-secondary text-secondary-foreground border-border',
    outline:   'bg-transparent text-muted-foreground border-border',
    grade:     grade ? gradeColors[grade] ?? gradeColors.C : gradeColors.C,
  }
  return (
    <span className={cn(base, variants[variant], className)}>
      {children}
    </span>
  )
}
