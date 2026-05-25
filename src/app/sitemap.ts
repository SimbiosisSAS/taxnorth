import { MetadataRoute } from 'next'
import { resources } from '@/lib/resources'

export default function sitemap(): MetadataRoute.Sitemap {
  const resourcePages = resources.map((r) => ({
    url: `https://www.taxnorth.ca/resources/${r.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [
    {
      url: 'https://www.taxnorth.ca',
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: 'https://www.taxnorth.ca/chat',
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: 'https://www.taxnorth.ca/resources',
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: 'https://www.taxnorth.ca/professionals',
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: 'https://www.taxnorth.ca/connect',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: 'https://www.taxnorth.ca/partners',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    ...resourcePages,
  ]
}