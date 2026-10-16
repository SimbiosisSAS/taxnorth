import type { Metadata } from 'next'
import HomepageTemplate from '@/components/HomepageTemplate'
import { homepageEs } from '@/lib/homepageTranslations'

export const metadata: Metadata = {
  title: 'Ayuda gratuita con tus impuestos para recién llegados a Canadá | TaxNorth',
  description: 'Declara tus impuestos en Canadá con confianza. Asistente de IA fiscal gratuito y multilingüe para recién llegados y estudiantes internacionales.',
  alternates: {
    canonical: 'https://www.taxnorth.ca/es',
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

export default function EsHomePage() {
  return <HomepageTemplate t={homepageEs} locale="es" />
}