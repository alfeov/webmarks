import { extractNumber, messages } from '@/test/helpers/messages'

import {
  MAX_USERNAME_LENGTH,
  MIN_USERNAME_LENGTH,
  UsernameSchema,
} from './UsernameSchema'

describe('UsernameSchema', () => {
  it.each(messages)(
    'should have length according to locale message',
    (locale) => {
      expect(extractNumber(locale.errors.username.min)).toBe(
        MIN_USERNAME_LENGTH,
      )
      expect(extractNumber(locale.errors.username.max)).toBe(
        MAX_USERNAME_LENGTH,
      )
    },
  )
  it.each(messages)('should have path in locale message', (locale) => {
    expect(locale.errors.username.min).toBeTruthy()
    expect(locale.errors.username.max).toBeTruthy()
    expect(locale.errors.username.allowed).toBeTruthy()
  })
  it.each([
    ['123Hello Name', 'username.allowed', false],
    ['Кириллица', 'username.allowed', false],
    ['123Hello_-', undefined, true],
  ])('input %s should return code %s', (input, code, isSuccess) => {
    const result = UsernameSchema.safeParse(input)
    expect(result.error?.issues?.[0].message).toBe(code)
    expect(result.success).toBe(isSuccess)
  })
})
