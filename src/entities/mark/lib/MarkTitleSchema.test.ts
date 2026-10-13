import { extractNumber, locales } from '@/test/locales'

import { MAX_MARK_TITLE_LENGTH, MIN_MARK_TITLE_LENGTH } from './MarkTitleSchema'

describe('MarkTitleSchema', () => {
  it.each(locales)(
    'should have length according to locale message',
    (locale) => {
      expect(extractNumber(locale.errors.markTitle.min)).toBe(
        MIN_MARK_TITLE_LENGTH,
      )
      expect(extractNumber(locale.errors.markTitle.max)).toBe(
        MAX_MARK_TITLE_LENGTH,
      )
    },
  )
  it.each(locales)('should have message path in locale', (locale) => {
    expect(locale.errors.markTitle.min).toBeTruthy()
    expect(locale.errors.markTitle.max).toBeTruthy()
  })
})
