import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
export const metadata: Metadata = { title: 'JSON Formatter' }
const JsonClient = dynamic(() => import('./JsonClient'), { ssr: false })
export default function JsonPage() { return <JsonClient /> }
