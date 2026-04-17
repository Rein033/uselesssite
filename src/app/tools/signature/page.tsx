import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
export const metadata: Metadata = { title: 'E-mail Handtekening Generator' }
const SignatureClient = dynamic(() => import('./SignatureClient'), { ssr: false })
export default function SignaturePage() { return <SignatureClient /> }
