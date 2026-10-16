import type { Metadata } from 'next'
import HomepageTemplate from '@/components/HomepageTemplate'
import { homepageAr } from '@/lib/homepageTranslations'

export const metadata: Metadata = {
  title: 'مساعدة ضريبية مجانية للقادمين الجدد إلى كندا | TaxNorth',
  description: 'قدّم إقرارك الضريبي في كندا بثقة. مساعد ذكاء اصطناعي مجاني ومتعدد اللغات للوافدين الجدد والطلاب الدوليين.',
  alternates: {
    canonical: 'https://www.taxnorth.ca/ar',
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

export default function ArHomePage() {
  return <HomepageTemplate t={homepageAr} locale="ar" />
}