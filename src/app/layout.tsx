import type { Metadata } from 'next'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Providers } from '@/components/Providers'
import { Toaster } from '@/components/ui/Toaster'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://uselesssite.nl'

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: { default: 'UselessSite — Rate & Share Your Setup', template: '%s | UselessSite' },
  description: 'Community platform for IT setups, gaming rigs and developer workspaces. Post your build, get graded by the community.',
  keywords: ['gaming setup', 'battlestation', 'desk setup', 'PC build', 'developer workspace'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: APP_URL,
    title: 'UselessSite — Rate & Share Your Setup',
    description: 'Post your rig. Get graded by the community.',
    siteName: 'UselessSite',
    images: [{ url: '/og.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UselessSite',
    description: 'Post your rig. Get graded by the community.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <footer className="border-t border-border py-8 mt-16">
              <div className="max-w-6xl mx-auto px-4 text-center text-sm text-muted-foreground">
                © {new Date().getFullYear()} UselessSite. Built by the community, for the community.
              </div>
            </footer>
          </div>
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
