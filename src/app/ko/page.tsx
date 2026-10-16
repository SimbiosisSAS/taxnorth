import type { Metadata } from 'next'
import HomepageTemplate from '@/components/HomepageTemplate'
import { homepageKo } from '@/lib/homepageTranslations'

export const metadata: Metadata = {
  title: '캐나다 정착의 첫걸음, 쉽고 정확한 무료 세금 가이드 | TaxNorth',
  description: '캐나다에서 자신 있게 세금 신고하세요. 신규 이민자와 유학생을 위한 무료 다국어 AI 세금 어시스턴트.',
  alternates: {
    canonical: 'https://www.taxnorth.ca/ko',
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

export default function KoHomePage() {
  return <HomepageTemplate t={homepageKo} locale="ko" />
}