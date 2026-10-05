import type { MetadataRoute } from 'next'

const baseUrl = String(process.env.NEXT_PUBLIC_SITE_URL)

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
      alternates: {
        languages: {
          ru: baseUrl + 'ru',
          en: baseUrl + 'en',
        },
      },
    },
  ]
}
