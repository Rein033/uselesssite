import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
export const metadata: Metadata = { title: 'Sprint Planner' }
const SprintClient = dynamic(() => import('./SprintClient'), { ssr: false })
export default function SprintPage() { return <SprintClient /> }
