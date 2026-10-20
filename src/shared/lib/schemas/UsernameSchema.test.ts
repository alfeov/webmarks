import { UsernameSchema } from './UsernameSchema'

describe('UsernameSchema', () => {
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
