import { PasswordSchema } from './PasswordSchema'

describe('PasswordSchema', () => {
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
