import bcrypt from 'bcrypt'

import { MESSAGE_CODES } from '@/shared/api/types'
import { saltOrRounds } from '@/shared/lib/session/constants'
import { createRandomUser } from '@/test/factories/createRandomUser'

import { verifyUser } from './verifyUser'

const password = 'Password1'

describe('verifyUser', () => {
  let userId: string
  let userEmail: string

  beforeEach(async () => {
    const hashedPassword = await bcrypt.hash(password, saltOrRounds)
    const user = await createRandomUser({ password: hashedPassword })
    userId = user.id
    userEmail = user.email
  })

  it('should return user data when credentials are correct', async () => {
    const result = await verifyUser({ email: userEmail, password })

    expect(result.data).toMatchObject({ id: userId })
    expect(result.error).toBeUndefined()
    expect(result.data).not.toHaveProperty(['password', 'email'])
  })
  it('should return error when password is incorrect', async () => {
    const result = await verifyUser({
      email: userEmail,
      password: 'WrongPassword1',
    })

    expect(result.data).toBeUndefined()
    expect(result.error).toBe(MESSAGE_CODES.USER_INCORRECT_PASSWORD)
  })
  it('should return error when user with this email does not exist', async () => {
    const result = await verifyUser({
      email: 'not-found@some-mail.com',
      password,
    })

    expect(result.data).toBeUndefined()
    expect(result.error).toBe(MESSAGE_CODES.USER_NOT_FOUND)
  })
})
