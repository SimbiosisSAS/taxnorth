import type { Metadata } from 'next'
import HomepageTemplate from '@/components/HomepageTemplate'
import { homepageFa } from '@/lib/homepageTranslations'

export const metadata: Metadata = {
  title: 'راهنمای رایگان مالیاتی برای تازه‌واردان به کانادا | TaxNorth',
  description: 'با اطمینان در کانادا مالیات بپردازید. دستیار هوش مصنوعی رایگان و چندزبانه برای تازه‌واردان و دانشجویان بین‌المللی.',
  alternates: {
    canonical: 'https://www.taxnorth.ca/fa',
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

export default function FaHomePage() {
  return <HomepageTemplate t={homepageFa} locale="fa" />
}