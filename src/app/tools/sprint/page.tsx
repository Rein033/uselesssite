import type { Metadata } from 'next'
import SprintClient from './SprintClient'
export const metadata: Metadata = { title: 'Sprint Planner' }
export default function SprintPage() { return <SprintClient /> }
