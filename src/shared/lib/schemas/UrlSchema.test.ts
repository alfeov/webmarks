import { extractNumber, locales } from '@/test/locales'

import { MAX_URL_LENGTH } from './UrlSchema'

describe('UrlSchema', () => {
  it.each(locales)(
    'should have length according to locale message',
    (locale) => {
      expect(extractNumber(locale.errors.url.max)).toBe(MAX_URL_LENGTH)
    },
  )
  it.each(locales)('should have message path in locale', (locale) => {
    expect(locale.errors.url.invalid).toBeTruthy()
    expect(locale.errors.url.max).toBeTruthy()
  })
})
