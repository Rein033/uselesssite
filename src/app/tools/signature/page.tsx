import type { Metadata } from 'next'
import SignatureClient from './SignatureClient'
export const metadata: Metadata = { title: 'E-mail Handtekening Generator' }
export default function SignaturePage() { return <SignatureClient /> }
