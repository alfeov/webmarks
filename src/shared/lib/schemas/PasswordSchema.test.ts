import { extractNumber, locales } from '@/test/locales'

import {
  MAX_PASSWORD_LENGTH,
  MIN_PASSWORD_LENGTH,
  PasswordSchema,
} from './PasswordSchema'

describe('PasswordSchema', () => {
  it.each(locales)(
    'should have length according to locale message',
    (locale) => {
      expect(extractNumber(locale.errors.password.min)).toBe(
        MIN_PASSWORD_LENGTH,
      )
      expect(extractNumber(locale.errors.password.max)).toBe(
        MAX_PASSWORD_LENGTH,
      )
    },
  )
  it.each(locales)('should have message path in locale', (locale) => {
    expect(locale.errors.password.allowed).toBeTruthy()
    expect(locale.errors.password.capital).toBeTruthy()
    expect(locale.errors.password.digit).toBeTruthy()
    expect(locale.errors.password.min).toBeTruthy()
    expect(locale.errors.password.max).toBeTruthy()
  })
  it.each([
    ['кириллица123', 'password.allowed', false],
    ['hello 123', 'password.allowed', false],
    ['hello123', 'password.capital', false],
    ['Helloman', 'password.digit', false],
    ['Hello123', undefined, true],
  ])('input %s should return code %s', (input, code, isSuccess) => {
    const result = PasswordSchema.safeParse(input)
    expect(result.error?.issues?.[0].message).toBe(code)
    expect(result.success).toBe(isSuccess)
  })
})
