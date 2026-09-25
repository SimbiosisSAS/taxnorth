import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Inter } from 'next/font/google'
import './globals.css'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { LanguageProvider } from '@/context/LanguageContext'
import Script from 'next/script'

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-plus-jakarta',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'TaxNorth.ca — Taxes that finally click.',
  description: 'Your free AI guide to Canadian taxes — in any language, for every newcomer. Understand what you owe, what you\'re owed, and when to file.',
  keywords: 'Canadian taxes, newcomers Canada, tax guide, impuestos Canada, CRA, file taxes Canada',
  verification: {
  google: 'JueBOwVpYLPvtc4l6Srl1tGr490cn6jiLRVSNNRLxT8',
  other: {
    'msvalidate.01': 'D1C1BE7C521A8B10763BB6027E7B401A',
    'fo-verify': 'b13a8735-f039-405e-8138-b18195cde0ac',
    'impact-site-verification': 'f3998595-7f42-427f-9598-337001370053',
  },
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
    <html lang="en" className={`${plusJakarta.variable} ${inter.variable}`}>
      <body className="font-sans antialiased bg-warm-white">
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-Y6WE0DJXJL"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-Y6WE0DJXJL');
          `}
        </Script>
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1050338547351249');
            fbq('track', 'PageView');
          `}
        </Script>
        <LanguageProvider>
          {children}
        </LanguageProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}