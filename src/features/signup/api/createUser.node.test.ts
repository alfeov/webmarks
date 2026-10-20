import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client'
import bcrypt from 'bcrypt'

import { MESSAGE_CODES } from '@/shared/api/types'
import { prisma } from '@/shared/lib/prisma'
import { spyOnConsoleError } from '@/test/helpers/spyOnConsoleError'

import { createUser } from './createUser'

const spyOnPrismaCreate = vi.spyOn(prisma.user, 'create')
const spyOnBcrypt = vi.spyOn(bcrypt, 'hash')

const defaultUserData = {
  email: 'user@gmail.com',
  password: 'Password1',
  username: 'Username',
}

describe('createUser', () => {
  it('should create user and return safe data', async () => {
    const result = await createUser(defaultUserData)

    expect(result.data).toMatchObject({
      username: defaultUserData.username,
    })
    expect(result.data).not.toHaveProperty(['password', 'email'])
    expect(result.error).toBeUndefined()
    expect(spyOnConsoleError).not.toHaveBeenCalled()
  })
  it('should hashed password', async () => {
    await createUser(defaultUserData)

    expect(spyOnBcrypt).toHaveBeenCalledOnce()
  })
  it('should return "existence" error and log it when user with this email already exists', async () => {
    await createUser(defaultUserData)

    const result = await createUser(defaultUserData)

    expect(result.data).toBeUndefined()
    expect(result.error).toBe(MESSAGE_CODES.USER_EXISTS)
    expect(spyOnConsoleError).toHaveBeenCalledOnce()
  })
  it('should return internal error and log it when other prisma error has been occurred', async () => {
    const error = new PrismaClientKnownRequestError('...', {
      code: 'P2003',
      clientVersion: '...',
    })
    spyOnPrismaCreate.mockRejectedValueOnce(error)

    const result = await createUser(defaultUserData)

    expect(result.data).toBeUndefined()
    expect(result.error).toBe(MESSAGE_CODES.INTERNAL_ERROR)
    expect(spyOnConsoleError).toHaveBeenCalledWith(error)
  })
  it('should return internal error and log it when unknown error occurred', async () => {
    const error = new Error('unknown error')
    spyOnPrismaCreate.mockRejectedValueOnce(error)

    const result = await createUser(defaultUserData)

    expect(result.data).toBeUndefined()
    expect(result.error).toBe(MESSAGE_CODES.INTERNAL_ERROR)
    expect(spyOnConsoleError).toHaveBeenCalledWith(error)
  })
})
