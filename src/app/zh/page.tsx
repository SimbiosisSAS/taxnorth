import type { Metadata } from 'next'
import HomepageTemplate from '@/components/HomepageTemplate'
import { homepageZh } from '@/lib/homepageTranslations'

export const metadata: Metadata = {
  title: '专为初到加拿大的你提供免费税务帮助 | TaxNorth',
  description: '在加拿大自信地报税。为新移民和留学生提供的免费多语言AI税务助手。',
  alternates: {
    canonical: 'https://www.taxnorth.ca/zh',
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

export default function ZhHomePage() {
  return <HomepageTemplate t={homepageZh} locale="zh" />
}