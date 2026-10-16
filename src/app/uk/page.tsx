import type { Metadata } from 'next'
import HomepageTemplate from '@/components/HomepageTemplate'
import { homepageUk } from '@/lib/homepageTranslations'

export const metadata: Metadata = {
  title: 'Безкоштовна податкова допомога для новоприбулих до Канади | TaxNorth',
  description: 'Подавайте податкову декларацію в Канаді впевнено. Безкоштовний багатомовний ШІ-асистент для новоприбулих та іноземних студентів.',
  alternates: {
    canonical: 'https://www.taxnorth.ca/uk',
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

export default function UkHomePage() {
  return <HomepageTemplate t={homepageUk} locale="uk" />
}