import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
export const metadata: Metadata = { title: 'Wachtwoord Generator' }
const WachtwoordClient = dynamic(() => import('./WachtwoordClient'), { ssr: false })
export default function WachtwoordPage() { return <WachtwoordClient /> }
