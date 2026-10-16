import { extractNumber, messages } from '@/test/utils/messages'

import { MAX_TAG_TITLE_LENGTH, MIN_TAG_TITLE_LENGTH } from './TagTitleSchema'

describe('TagTitleSchema', () => {
  it.each(messages)(
    'should have length according to locale message',
    (locale) => {
      expect(extractNumber(locale.errors.tagTitle.min)).toBe(
        MIN_TAG_TITLE_LENGTH,
      )
      expect(extractNumber(locale.errors.tagTitle.max)).toBe(
        MAX_TAG_TITLE_LENGTH,
      )
    },
  )
  it.each(messages)('should have path in locale message', (locale) => {
    expect(locale.errors.tagTitle.min).toBeTruthy()
    expect(locale.errors.tagTitle.max).toBeTruthy()
  })
})
