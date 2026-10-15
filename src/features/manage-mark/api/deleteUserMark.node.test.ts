import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client'

import { MESSAGE_CODES } from '@/shared/api/types'
import { prisma } from '@/shared/lib/prisma'
import { createRandomMark } from '@/test/prisma/createRandomMark'
import { createRandomUser } from '@/test/prisma/createRandomUser'
import { spyOnConsoleError } from '@/test/vitest.setup'

import { deleteUserMark } from './deleteUserMark'

const spy = vi.spyOn(prisma.webMark, 'delete')

describe('deleteUserMark', () => {
  let userId: string

  beforeEach(async () => {
    userId = (await createRandomUser()).id
  })

  it('should delete mark', async () => {
    const mark = await createRandomMark(userId)

    const result = await deleteUserMark({
      id: mark.id,
      userId,
    })

    expect(result.error).toBeUndefined()
    expect(spyOnConsoleError).not.toHaveBeenCalled()
  })
  it('should return "not found" error and log it when user have not mark with this id', async () => {
    const result = await deleteUserMark({
      id: 'not-found',
      userId,
    })

    expect(result.error).toBe(MESSAGE_CODES.MARK_NOT_FOUND)
    expect(spyOnConsoleError).toHaveBeenCalledOnce()
  })
  it('should return error when other user has this mark and current not', async () => {
    const anotherUserId = (await createRandomUser()).id
    const mark = await createRandomMark(anotherUserId)

    const result = await deleteUserMark({
      id: mark.id,
      userId,
    })

    expect(result.error).toBe(MESSAGE_CODES.MARK_NOT_FOUND)
    expect(spyOnConsoleError).toHaveBeenCalledOnce()
  })
  it('should return internal error and log it when other prisma error has been occurred', async () => {
    const error = new PrismaClientKnownRequestError('...', {
      code: 'P2002',
      clientVersion: '...',
    })
    spy.mockRejectedValueOnce(error)

    const result = await deleteUserMark({
      id: 'some id',
      userId,
    })

    expect(result.error).toBe(MESSAGE_CODES.INTERNAL_ERROR)
    expect(spyOnConsoleError).toHaveBeenCalledWith(error)
  })
  it('should return internal error and log it when unknown error occurred', async () => {
    const error = new Error('unknown error')
    spy.mockRejectedValueOnce(error)

    const result = await deleteUserMark({
      id: 'some id',
      userId,
    })

    expect(result.error).toBe(MESSAGE_CODES.INTERNAL_ERROR)
    expect(spyOnConsoleError).toHaveBeenCalledWith(error)
  })
})
