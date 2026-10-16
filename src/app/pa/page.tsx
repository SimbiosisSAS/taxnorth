import type { Metadata } from 'next'
import HomepageTemplate from '@/components/HomepageTemplate'
import { homepagePa } from '@/lib/homepageTranslations'

export const metadata: Metadata = {
  title: 'ਕੈਨੇਡਾ ਆਉਣ ਵਾਲੇ ਨਵੇਂ ਲੋਕਾਂ ਲਈ ਮੁਫ਼ਤ ਟੈਕਸ ਮਦਦ | TaxNorth',
  description: 'ਕੈਨੇਡਾ ਵਿੱਚ ਆਪਣੇ ਟੈਕਸ ਭਰੋ। ਨਵੇਂ ਆਉਣ ਵਾਲਿਆਂ ਅਤੇ ਅੰਤਰਰਾਸ਼ਟਰੀ ਵਿਦਿਆਰਥੀਆਂ ਲਈ ਮੁਫ਼ਤ ਬਹੁ-ਭਾਸ਼ਾਈ AI ਟੈਕਸ ਅਸਿਸਟੈਂਟ।',
  alternates: {
    canonical: 'https://www.taxnorth.ca/pa',
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

export default function PaHomePage() {
  return <HomepageTemplate t={homepagePa} locale="pa" />
}