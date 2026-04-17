import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
export const metadata: Metadata = { title: 'SAP Import Generator' }
const SapClient = dynamic(() => import('./SapClient'), { ssr: false })
export default function SapPage() { return <SapClient /> }
