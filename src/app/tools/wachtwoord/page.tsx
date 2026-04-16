import type { Metadata } from 'next'
import WachtwoordClient from './WachtwoordClient'
export const metadata: Metadata = { title: 'Wachtwoord Generator' }
export default function WachtwoordPage() { return <WachtwoordClient /> }
