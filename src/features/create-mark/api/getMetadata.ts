import 'server-only'

import { scrape } from 'web-meta-scraper'

import { MAX_MARK_DESC } from '@/entities/mark/lib/MarkDescriptionSchema'

export async function getMetadata(url: string) {
  try {
    const { metadata } = await scrape(url, {
      postProcess: {
        maxDescriptionLength: MAX_MARK_DESC - 3, // 3 chars is '...'
      },
    })

    return metadata
  } catch (error) {
    console.error(error)
    return null
  }
}
