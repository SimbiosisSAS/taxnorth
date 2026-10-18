import ChatClient from './ChatClient'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free AI Tax Assistant for Newcomers to Canada | TaxNorth',
  description: 'Ask any Canadian tax question in your language. Instant answers about T4 slips, GST/HST credits, filing deadlines and more. Free AI guide for newcomers.',
  alternates: {
    canonical: 'https://www.taxnorth.ca/chat',
    languages: {
      'en': 'https://www.taxnorth.ca',
      'fr': 'https://www.taxnorth.ca/fr',
      'es': 'https://www.taxnorth.ca/es',
      'zh': 'https://www.taxnorth.ca/zh',
      'ar': 'https://www.taxnorth.ca/ar',
      'pa': 'https://www.taxnorth.ca/pa',
      'ro': 'https://www.taxnorth.ca/ro',
      'uk': 'https://www.taxnorth.ca/uk',
      'ja': 'https://www.taxnorth.ca/ja',
      'ko': 'https://www.taxnorth.ca/ko',
      'fa': 'https://www.taxnorth.ca/fa',
      'tr': 'https://www.taxnorth.ca/tr',
    },
  },
}

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "TaxNorth AI Tax Assistant",
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Web",
  "url": "https://www.taxnorth.ca/chat",
  "description": "Free multilingual AI tax assistant for newcomers to Canada. Ask questions in any language about T4 slips, GST/HST credits, filing deadlines, and more.",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "CAD"
  },
  "inLanguage": ["en", "fr", "es", "zh", "ar", "pa", "ro", "uk", "ja", "ko", "fa", "tr"],
  "publisher": {
    "@type": "Organization",
    "name": "TaxNorth",
    "url": "https://www.taxnorth.ca"
  }
}

export default function ChatPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <h1 className="sr-only">Free Canadian Tax Help — TaxNorth AI Guide</h1>
      <ChatClient />
    </>
  )
}