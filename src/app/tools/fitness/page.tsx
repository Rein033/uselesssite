import type { Metadata } from 'next'
import FitnessClient from './FitnessClient'

export const metadata: Metadata = { title: 'Sport & Spier Schema Generator | UselessSite' }

export default function FitnessPage() {
  return <FitnessClient />
}
