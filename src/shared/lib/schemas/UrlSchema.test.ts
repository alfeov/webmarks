import { extractNumber, messages } from '@/test/helpers/messages'

import { MAX_URL_LENGTH } from './UrlSchema'

describe('UrlSchema', () => {
  it.each(messages)(
    'should have length according to locale message',
    (locale) => {
      expect(extractNumber(locale.errors.url.max)).toBe(MAX_URL_LENGTH)
    },
  )
  it.each(messages)('should have path in locale message', (locale) => {
    expect(locale.errors.url.invalid).toBeTruthy()
    expect(locale.errors.url.max).toBeTruthy()
  })
})
