import {
  MAX_MARK_DESC_LENGTH,
  MIN_MARK_DESC_LENGTH,
} from '@/entities/mark/lib/MarkDescriptionSchema'
import {
  MAX_MARK_TITLE_LENGTH,
  MIN_MARK_TITLE_LENGTH,
} from '@/entities/mark/lib/MarkTitleSchema'
import {
  MAX_TAG_TITLE_LENGTH,
  MIN_TAG_TITLE_LENGTH,
} from '@/entities/tag/lib/TagTitleSchema'
import {
  MAX_PASSWORD_LENGTH,
  MIN_PASSWORD_LENGTH,
} from '@/shared/lib/schemas/PasswordSchema'
import { MAX_URL_LENGTH } from '@/shared/lib/schemas/UrlSchema'
import {
  MAX_USERNAME_LENGTH,
  MIN_USERNAME_LENGTH,
} from '@/shared/lib/schemas/UsernameSchema'
import { extractNumber, messages } from '@/test/helpers/messages'

describe('translations', () => {
  it.each(messages)(
    'should have path for errors in locale message',
    (locale) => {
      expect(locale.errors.email.invalid).toBeTruthy()

      expect(locale.errors.id).toBeTruthy()

      expect(locale.errors.password.allowed).toBeTruthy()
      expect(locale.errors.password.capital).toBeTruthy()
      expect(locale.errors.password.digit).toBeTruthy()
      expect(locale.errors.password.minLength).toBeTruthy()
      expect(locale.errors.password.maxLength).toBeTruthy()

      expect(locale.errors.url.invalid).toBeTruthy()
      expect(locale.errors.url.maxLength).toBeTruthy()

      expect(locale.errors.username.minLength).toBeTruthy()
      expect(locale.errors.username.maxLength).toBeTruthy()
      expect(locale.errors.username.allowed).toBeTruthy()

      expect(locale.errors.markDescription.minLength).toBeTruthy()
      expect(locale.errors.markDescription.maxLength).toBeTruthy()

      expect(locale.errors.markTitle.minLength).toBeTruthy()
      expect(locale.errors.markTitle.maxLength).toBeTruthy()

      expect(locale.errors.tagTitle.minLength).toBeTruthy()
      expect(locale.errors.tagTitle.maxLength).toBeTruthy()
    },
  )

  it.each(messages)(
    'should have length according to locale message',
    (locale) => {
      expect(extractNumber(locale.errors.password.minLength)).toBe(
        MIN_PASSWORD_LENGTH,
      )
      expect(extractNumber(locale.errors.password.maxLength)).toBe(
        MAX_PASSWORD_LENGTH,
      )

      expect(extractNumber(locale.errors.url.maxLength)).toBe(MAX_URL_LENGTH)

      expect(extractNumber(locale.errors.username.minLength)).toBe(
        MIN_USERNAME_LENGTH,
      )
      expect(extractNumber(locale.errors.username.maxLength)).toBe(
        MAX_USERNAME_LENGTH,
      )

      expect(extractNumber(locale.errors.markDescription.minLength)).toBe(
        MIN_MARK_DESC_LENGTH,
      )
      expect(extractNumber(locale.errors.markDescription.maxLength)).toBe(
        MAX_MARK_DESC_LENGTH,
      )

      expect(extractNumber(locale.errors.markTitle.minLength)).toBe(
        MIN_MARK_TITLE_LENGTH,
      )
      expect(extractNumber(locale.errors.markTitle.maxLength)).toBe(
        MAX_MARK_TITLE_LENGTH,
      )

      expect(extractNumber(locale.errors.tagTitle.minLength)).toBe(
        MIN_TAG_TITLE_LENGTH,
      )
      expect(extractNumber(locale.errors.tagTitle.maxLength)).toBe(
        MAX_TAG_TITLE_LENGTH,
      )
    },
  )
})
