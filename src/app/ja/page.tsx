import type { Metadata } from 'next'
import HomepageTemplate from '@/components/HomepageTemplate'
import { homepageJa } from '@/lib/homepageTranslations'

export const metadata: Metadata = {
  title: 'カナダ新生活者のための無料タックスリターンサポート | TaxNorth',
  description: 'カナダでの確定申告を安心して。新規滞在者と留学生のための無料多言語AIアシスタント。',
  alternates: {
    canonical: 'https://www.taxnorth.ca/ja',
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

export default function JaHomePage() {
  return <HomepageTemplate t={homepageJa} locale="ja" />
}