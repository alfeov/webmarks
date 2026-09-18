import 'server-only'

import { scrape, ScraperError } from 'web-meta-scraper'

import { MAX_MARK_DESC } from '@/entities/mark/lib/MarkDescriptionSchema'

export async function getMetadata(url: string) {
  try {
    const { metadata } = await scrape(url, {
      postProcess: {
        maxDescriptionLength: MAX_MARK_DESC - 3, // 3 chars is '...'
      },
    })

    return {
      metadata,
      error: null,
    }
  } catch (error) {
    console.error(error)
    if (error instanceof ScraperError) {
      return {
        metadata: null,
        error: error.message,
      }
    }
    return {
      metadata: null,
      error: 'Unknown internal error',
    }
  }
}
