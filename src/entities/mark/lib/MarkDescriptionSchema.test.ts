import { extractNumber, messages } from '@/test/helpers/messages'

import {
  MAX_MARK_DESC_LENGTH,
  MIN_MARK_DESC_LENGTH,
} from './MarkDescriptionSchema'

describe('MarkDescriptionSchema', () => {
  it.each(messages)(
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
  it.each(messages)('should have path in locale message', (locale) => {
    expect(locale.errors.markDescription.min).toBeTruthy()
    expect(locale.errors.markDescription.max).toBeTruthy()
  })
})
