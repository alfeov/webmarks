import 'server-only'

import { scrape, ScraperError } from 'web-meta-scraper'

export async function getMetadata(url: string) {
  try {
    const { metadata } = await scrape(url)

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
