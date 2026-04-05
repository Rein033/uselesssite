import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { formatDistanceToNow } from 'date-fns'
import { nl } from 'date-fns/locale'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function timeAgo(date: Date | string) {
  return formatDistanceToNow(new Date(date), { addSuffix: true })
}

export function gradeFromScore(score: number): { grade: string; color: string } {
  if (score >= 9)   return { grade: 'S', color: 'text-grade-s' }
  if (score >= 7.5) return { grade: 'A', color: 'text-grade-a' }
  if (score >= 6)   return { grade: 'B', color: 'text-grade-b' }
  if (score >= 4.5) return { grade: 'C', color: 'text-grade-c' }
  return               { grade: 'D', color: 'text-grade-d' }
}

export function formatScore(score: number): string {
  return score.toFixed(1)
}

export function slugify(str: string): string {
  return str.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
}

export function truncate(str: string, length = 120): string {
  return str.length > length ? str.slice(0, length) + '…' : str
}

export const TAGS = [
  'gaming', 'minimal', 'RGB', 'office', 'dev',
  'workstation', 'budget', 'high-end', 'standing-desk',
  'ultrawide', 'custom-loop', 'NAS', 'homelab', 'streaming',
] as const

export type Tag = typeof TAGS[number]
