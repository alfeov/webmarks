import 'server-only'

import { scrape } from 'web-meta-scraper'

import { MAX_MARK_DESC_LENGTH } from '@/entities/mark/lib/MarkDescriptionSchema'
import { MESSAGE_CODES } from '@/shared/api/types'

export async function getMetadata(url: string) {
  try {
    const { metadata } = await scrape(url, {
      postProcess: {
        maxDescriptionLength: MAX_MARK_DESC_LENGTH - 3, // 3 chars is '...'
      },
    })

    // check at least one field existence
    const { url: receivedUrl, title, description, favicon } = metadata
    if (!receivedUrl && !title && !description && !favicon)
      throw new Error('Metadata not complete')

    return {
      data: {
        url: receivedUrl,
        title,
        description,
        logoUrl: favicon,
      },
    }
  } catch (error) {
    console.error(error)
    return {
      error: MESSAGE_CODES.LOAD_META_ERROR,
    }
  }
}
