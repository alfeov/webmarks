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
import { MESSAGE_CODES } from '@/shared/api/constants'
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
    (message) => {
      expect(message.errors.email.invalid).toBeTruthy()

      expect(message.errors.id).toBeTruthy()

      expect(message.errors.password.allowed).toBeTruthy()
      expect(message.errors.password.capital).toBeTruthy()
      expect(message.errors.password.digit).toBeTruthy()
      expect(message.errors.password.minLength).toBeTruthy()
      expect(message.errors.password.maxLength).toBeTruthy()

      expect(message.errors.url.invalid).toBeTruthy()
      expect(message.errors.url.maxLength).toBeTruthy()

      expect(message.errors.username.minLength).toBeTruthy()
      expect(message.errors.username.maxLength).toBeTruthy()
      expect(message.errors.username.allowed).toBeTruthy()

      expect(message.errors.markDescription.minLength).toBeTruthy()
      expect(message.errors.markDescription.maxLength).toBeTruthy()

      expect(message.errors.markTitle.minLength).toBeTruthy()
      expect(message.errors.markTitle.maxLength).toBeTruthy()

      expect(message.errors.tagTitle.minLength).toBeTruthy()
      expect(message.errors.tagTitle.maxLength).toBeTruthy()
    },
  )

  it.each(messages)(
    'should have path for codes in locale message',
    (message) => {
      for (const MESSAGE_CODE of Object.values(MESSAGE_CODES)) {
        expect(message.codes[MESSAGE_CODE]).toBeTruthy()
      }
    },
  )

  it.each(messages)(
    'should have length according to locale message',
    (message) => {
      expect(extractNumber(message.errors.password.minLength)).toBe(
        MIN_PASSWORD_LENGTH,
      )
      expect(extractNumber(message.errors.password.maxLength)).toBe(
        MAX_PASSWORD_LENGTH,
      )

      expect(extractNumber(message.errors.url.maxLength)).toBe(MAX_URL_LENGTH)

      expect(extractNumber(message.errors.username.minLength)).toBe(
        MIN_USERNAME_LENGTH,
      )
      expect(extractNumber(message.errors.username.maxLength)).toBe(
        MAX_USERNAME_LENGTH,
      )

      expect(extractNumber(message.errors.markDescription.minLength)).toBe(
        MIN_MARK_DESC_LENGTH,
      )
      expect(extractNumber(message.errors.markDescription.maxLength)).toBe(
        MAX_MARK_DESC_LENGTH,
      )

      expect(extractNumber(message.errors.markTitle.minLength)).toBe(
        MIN_MARK_TITLE_LENGTH,
      )
      expect(extractNumber(message.errors.markTitle.maxLength)).toBe(
        MAX_MARK_TITLE_LENGTH,
      )

      expect(extractNumber(message.errors.tagTitle.minLength)).toBe(
        MIN_TAG_TITLE_LENGTH,
      )
      expect(extractNumber(message.errors.tagTitle.maxLength)).toBe(
        MAX_TAG_TITLE_LENGTH,
      )
    },
  )
})
