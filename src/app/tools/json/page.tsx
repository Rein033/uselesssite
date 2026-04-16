import type { Metadata } from 'next'
import JsonClient from './JsonClient'
export const metadata: Metadata = { title: 'JSON Formatter' }
export default function JsonPage() { return <JsonClient /> }
