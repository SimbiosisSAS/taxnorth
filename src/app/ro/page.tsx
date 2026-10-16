import type { Metadata } from 'next'
import HomepageTemplate from '@/components/HomepageTemplate'
import { homepageRo } from '@/lib/homepageTranslations'

export const metadata: Metadata = {
  title: 'Asistență fiscală gratuită pentru noii veniți în Canada | TaxNorth',
  description: 'Depune-ți declarația fiscală în Canada cu încredere. Asistent AI fiscal gratuit și multilingv pentru noii veniți și studenții internaționali.',
  alternates: {
    canonical: 'https://www.taxnorth.ca/ro',
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

export default function RoHomePage() {
  return <HomepageTemplate t={homepageRo} locale="ro" />
}