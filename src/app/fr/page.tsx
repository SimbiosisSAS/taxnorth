import type { Metadata } from 'next'
import HomepageTemplate from '@/components/HomepageTemplate'
import { homepageFr } from '@/lib/homepageTranslations'

export const metadata: Metadata = {
  title: 'Aide fiscale gratuite pour les nouveaux arrivants au Canada | TaxNorth',
  description: 'Faites vos impôts au Canada en toute confiance. Assistant IA fiscal gratuit et multilingue pour les nouveaux arrivants et étudiants internationaux.',
  alternates: {
    canonical: 'https://www.taxnorth.ca/fr',
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

export default function FrHomePage() {
  return <HomepageTemplate t={homepageFr} locale="fr" />
}