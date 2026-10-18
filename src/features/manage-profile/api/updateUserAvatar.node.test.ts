import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client'

import { MESSAGE_CODES } from '@/shared/api/types'
import { prisma } from '@/shared/lib/prisma'
import { createRandomUser } from '@/test/factories/createRandomUser'
import { spyOnConsoleError } from '@/test/helpers/spyOnConsoleError'

import { updateUserAvatar } from './updateUserAvatar'

const spy = vi.spyOn(prisma.user, 'update')

const defaultData = {
  avatarUrl: 'https://some-url.com',
}

describe('updateUserAvatar', () => {
  let userId: string

  beforeEach(async () => {
    userId = (await createRandomUser()).id
  })

  it('should update user avatar and return it', async () => {
    const result = await updateUserAvatar({
      ...defaultData,
      id: userId,
    })

    expect(result.data).toMatchObject(defaultData)
    expect(result.error).toBeUndefined()
    expect(spyOnConsoleError).not.toHaveBeenCalled()
  })
  it('should set avatarUrl to null when it passed as null', async () => {
    const result = await updateUserAvatar({
      avatarUrl: null,
      id: userId,
    })

    expect(result.data?.avatarUrl).toBeNull()
    expect(result.error).toBeUndefined()
    expect(spyOnConsoleError).not.toHaveBeenCalled()
  })
  it('should return "not found" error and log it when user with this id does not exist', async () => {
    const result = await updateUserAvatar({
      ...defaultData,
      id: 'not-found',
    })

    expect(result.data).toBeUndefined()
    expect(result.error).toBe(MESSAGE_CODES.USER_NOT_FOUND)
    expect(spyOnConsoleError).toHaveBeenCalledOnce()
  })
  it('should return internal error and log it when other prisma error has been occurred', async () => {
    const error = new PrismaClientKnownRequestError('...', {
      code: 'P2002',
      clientVersion: '...',
    })
    spy.mockRejectedValueOnce(error)

    const result = await updateUserAvatar({
      ...defaultData,
      id: userId,
    })

    expect(result.data).toBeUndefined()
    expect(result.error).toBe(MESSAGE_CODES.INTERNAL_ERROR)
    expect(spyOnConsoleError).toHaveBeenCalledWith(error)
  })
  it('should return internal error and log it when unknown error occurred', async () => {
    const error = new Error('unknown error')
    spy.mockRejectedValueOnce(error)

    const result = await updateUserAvatar({
      ...defaultData,
      id: userId,
    })

    expect(result.data).toBeUndefined()
    expect(result.error).toBe(MESSAGE_CODES.INTERNAL_ERROR)
    expect(spyOnConsoleError).toHaveBeenCalledWith(error)
  })
})
