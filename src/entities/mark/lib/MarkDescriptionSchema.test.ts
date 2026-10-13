import { extractNumber, locales } from '@/test/locales'

import {
  MAX_MARK_DESC_LENGTH,
  MIN_MARK_DESC_LENGTH,
} from './MarkDescriptionSchema'

describe('MarkDescriptionSchema', () => {
  it.each(locales)(
    'should have length according to locale message',
    (locale) => {
      expect(extractNumber(locale.errors.markDescription.min)).toBe(
        MIN_MARK_DESC_LENGTH,
      )
      expect(extractNumber(locale.errors.markDescription.max)).toBe(
        MAX_MARK_DESC_LENGTH,
      )
    },
  )
  it.each(locales)('should have message path in locale', (locale) => {
    expect(locale.errors.markDescription.min).toBeTruthy()
    expect(locale.errors.markDescription.max).toBeTruthy()
  })
})
