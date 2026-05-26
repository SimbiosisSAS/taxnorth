import type { Metadata } from 'next'
import './globals.css'
import { Analytics } from '@vercel/analytics/next'
import { LanguageProvider } from '@/context/LanguageContext'
import { SpeedInsights } from '@vercel/speed-insights/next'

export const metadata: Metadata = {
  title: 'TaxNorth.ca — Taxes that finally click.',
  description: 'Your free AI guide to Canadian taxes — in any language, for every newcomer. Understand what you owe, what you\'re owed, and when to file.',
  keywords: 'Canadian taxes, newcomers Canada, tax guide, impuestos Canada, CRA, file taxes Canada',
  verification: {
    google: 'JueBOwVpYLPvtc4l6Srl1tGr490cn6jiLRVSNNRLxT8',
  },
  metadataBase: new URL('https://www.taxnorth.ca'),
  openGraph: {
    type: 'website',
    url: 'https://www.taxnorth.ca',
    title: 'TaxNorth.ca — Taxes that finally click.',
    description: 'Your free AI guide to Canadian taxes — in any language, for every newcomer.',
    siteName: 'TaxNorth.ca',
    images: [{ url: '/og?v=2', width: 1200, height: 630, alt: 'TaxNorth.ca — Taxes that finally click.' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TaxNorth.ca — Taxes that finally click.',
    description: 'Your free AI guide to Canadian taxes — in any language, for every newcomer.',
    images: ['/og?v=2'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          {children}
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  )
}