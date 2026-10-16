import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client'

import { MESSAGE_CODES } from '@/shared/api/types'
import { prisma } from '@/shared/lib/prisma'
import { createRandomMark } from '@/test/factories/createRandomMark'
import { createRandomUser } from '@/test/factories/createRandomUser'
import { spyOnConsoleError } from '@/test/vitest.setup'

import { updateUserMark } from './updateUserMark'

const spy = vi.spyOn(prisma.webMark, 'update')

const defaultUpdateData = {
  title: 'updated-title',
  description: 'updated-description',
  url: 'https://updated-url.com',
  logoUrl: 'https://updated-url.com/logo.png',
}

describe('updateUserMark', () => {
  let userId: string
  let markId: string

  beforeEach(async () => {
    userId = (await createRandomUser()).id
    markId = (await createRandomMark(userId)).id
  })

  it('should update mark and return it', async () => {
    const result = await updateUserMark({
      ...defaultUpdateData,
      id: markId,
      userId,
    })

    expect(result.data).toMatchObject(defaultUpdateData)
    expect(result.error).toBeUndefined()
    expect(spyOnConsoleError).not.toHaveBeenCalled()
  })
  it('should set logoUrl to null when it passed as null', async () => {
    const result = await updateUserMark({
      ...defaultUpdateData,
      logoUrl: null,
      id: markId,
      userId,
    })

    expect(result.data?.logoUrl).toBeNull()
    expect(result.error).toBeUndefined()
    expect(spyOnConsoleError).not.toHaveBeenCalled()
  })
  it('should return "existence" error and log it when user already have another mark with this url', async () => {
    const anotherMark = await createRandomMark(userId)

    const result = await updateUserMark({
      ...defaultUpdateData,
      url: anotherMark.url,
      id: markId,
      userId,
    })

    expect(result.data).toBeUndefined()
    expect(result.error).toBe(MESSAGE_CODES.MARK_EXISTS)
    expect(spyOnConsoleError).toHaveBeenCalledOnce()
  })
  it('should not return error when other user already have mark with this url', async () => {
    const anotherUserId = (await createRandomUser()).id
    const anotherMark = await createRandomMark(anotherUserId)

    await updateUserMark({
      ...defaultUpdateData,
      url: 'https://same-url.com',
      id: anotherMark.id,
      userId: anotherUserId,
    })

    const result = await updateUserMark({
      ...defaultUpdateData,
      url: 'https://same-url.com',
      id: markId,
      userId,
    })

    expect(result.data).toMatchObject({ url: 'https://same-url.com' })
    expect(result.error).toBeUndefined()
    expect(spyOnConsoleError).not.toHaveBeenCalled()
  })
  it('should return "not found" error and log it when user have not mark with this id', async () => {
    const result = await updateUserMark({
      ...defaultUpdateData,
      id: 'not-found',
      userId,
    })

    expect(result.data).toBeUndefined()
    expect(result.error).toBe(MESSAGE_CODES.MARK_NOT_FOUND)
    expect(spyOnConsoleError).toHaveBeenCalledOnce()
  })
  it('should return internal error and log it when other prisma error has been occurred', async () => {
    const error = new PrismaClientKnownRequestError('...', {
      code: 'P2003',
      clientVersion: '...',
    })
    spy.mockRejectedValueOnce(error)

    const result = await updateUserMark({
      ...defaultUpdateData,
      id: 'some id',
      userId,
    })

    expect(result.data).toBeUndefined()
    expect(result.error).toBe(MESSAGE_CODES.INTERNAL_ERROR)
    expect(spyOnConsoleError).toHaveBeenCalledWith(error)
  })
  it('should return internal error and log it when unknown error occurred', async () => {
    const error = new Error('unknown error')
    spy.mockRejectedValueOnce(error)

    const result = await updateUserMark({
      ...defaultUpdateData,
      id: 'some id',
      userId,
    })

    expect(result.data).toBeUndefined()
    expect(result.error).toBe(MESSAGE_CODES.INTERNAL_ERROR)
    expect(spyOnConsoleError).toHaveBeenCalledWith(error)
  })
})
