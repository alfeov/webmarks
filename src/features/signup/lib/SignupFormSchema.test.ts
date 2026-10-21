import { messages } from '@/test/helpers/messages'

import { SIGNUP_FORM } from './constants'
import { SignupFormSchema } from './SignupFormSchema'

const input = {
  [SIGNUP_FORM.USERNAME]: 'Username',
  [SIGNUP_FORM.EMAIL]: 'user@gmail.com',
  [SIGNUP_FORM.PASSWORD]: 'Password1',
  [SIGNUP_FORM.CONFIRM_PASSWORD]: 'Password1',
}

describe('SignupFormSchema', () => {
  it.each(messages)('should have path in locale message', (locale) => {
    expect(locale.errors.password.notMatch).toBeTruthy()
  })
  it('should return error if password and confirm password not match', () => {
    const result = SignupFormSchema.safeParse({
      ...input,
      [SIGNUP_FORM.CONFIRM_PASSWORD]: 'not-match',
    })
    expect(result.error?.issues?.[0].message).toBe('password.notMatch')
    expect(result.success).toBe(false)
  })
  it('should return success if password and confirm password match', () => {
    const result = SignupFormSchema.safeParse(input)
    expect(result.error?.issues?.[0].message).toBeUndefined()
    expect(result.success).toBe(true)
  })
})
