import type { Metadata } from 'next'
import SapClient from './SapClient'
export const metadata: Metadata = { title: 'SAP Import Generator' }
export default function SapPage() { return <SapClient /> }
