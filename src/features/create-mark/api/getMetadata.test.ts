import { scrape } from 'web-meta-scraper'

import { MAX_MARK_DESC_LENGTH } from '@/entities/mark/lib/MarkDescriptionSchema'
import { MESSAGE_CODES } from '@/shared/api/types'
import { spyOnConsoleError } from '@/test/vitest.setup'

import { getMetadata } from './getMetadata'

vi.mock('web-meta-scraper')

const url = 'https://some-url.com'

describe('getMetadata', async () => {
  it('should return metadata on success', async () => {
    const metadata = {
      url,
      title: 'Title',
      description: 'Description for url',
      favicon: 'https://favicon.png',
    }
    vi.mocked(scrape, { partial: true }).mockResolvedValue({
      metadata,
    })

    const result = await getMetadata(url)

    expect(result.data).toMatchObject({
      url: metadata.url,
      title: metadata.title,
      description: metadata.description,
      logoUrl: metadata.favicon,
    })
    expect(result.error).toBeUndefined()
  })
  it('should call function with length argument that is 3 less that accept zod', async () => {
    await getMetadata(url)

    expect(scrape).toHaveBeenCalledWith(url, {
      postProcess: {
        maxDescriptionLength: MAX_MARK_DESC_LENGTH - 3,
      },
    })
  })
  it.each([
    { url: '' }, // '' or undefined can returned
    { title: undefined },
    { description: '' },
    { favicon: undefined },
  ])(
    'should return error and log it when one of fields is absent: field-data: %s',
    async (field) => {
      vi.mocked(scrape, { partial: true }).mockResolvedValue({
        metadata: {
          ...field,
        },
      })

      const result = await getMetadata(url)

      expect(spyOnConsoleError).toHaveBeenCalled()
      expect(result.data).toBeUndefined()
      expect(result.error).toBe(MESSAGE_CODES.LOAD_META_ERROR)
    },
  )
  it('should return error and log it on error', async () => {
    const error = new Error('some error message')
    vi.mocked(scrape).mockRejectedValue(error)

    const result = await getMetadata(url)

    expect(spyOnConsoleError).toHaveBeenCalledWith(error)
    expect(result.data).toBeUndefined()
    expect(result.error).toBe(MESSAGE_CODES.LOAD_META_ERROR)
  })
})
