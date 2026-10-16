import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/og'],
    },
    sitemap: 'https://www.taxnorth.ca/sitemap.xml',
  }
}