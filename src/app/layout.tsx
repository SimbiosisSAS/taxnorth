import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'TaxNorth.ca — Taxes that finally click.',
  description: 'Your free AI guide to Canadian taxes — in any language, for every newcomer. Understand what you owe, what you\'re owed, and when to file.',
  keywords: 'Canadian taxes, newcomers Canada, tax guide, impuestos Canada, CRA, file taxes Canada',
  metadataBase: new URL('https://www.taxnorth.ca'),
  openGraph: {
    type: 'website',
    url: 'https://www.taxnorth.ca',
    title: 'TaxNorth.ca — Taxes that finally click.',
    description: 'Your free AI guide to Canadian taxes — in any language, for every newcomer.',
    siteName: 'TaxNorth.ca',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'TaxNorth.ca — Taxes that finally click.',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TaxNorth.ca — Taxes that finally click.',
    description: 'Your free AI guide to Canadian taxes — in any language, for every newcomer.',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}