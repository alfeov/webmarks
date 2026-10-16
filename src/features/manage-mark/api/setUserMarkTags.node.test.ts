import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client'

import { MESSAGE_CODES } from '@/shared/api/types'
import { prisma } from '@/shared/lib/prisma'
import { createRandomMark } from '@/test/factories/createRandomMark'
import { createRandomTag } from '@/test/factories/createRandomTag'
import { createRandomUser } from '@/test/factories/createRandomUser'
import { spyOnConsoleError } from '@/test/vitest.setup'

import { setUserMarkTags } from './setUserMarkTags'

const spy = vi.spyOn(prisma.webMark, 'update')

describe('deleteUserMark', () => {
  let userId: string
  let tagIds: string[]
  let markId: string

  beforeEach(async () => {
    userId = (await createRandomUser()).id
    tagIds = [
      (await createRandomTag(userId)).id,
      (await createRandomTag(userId)).id,
    ]
    markId = (await createRandomMark(userId)).id
  })

  it('should return "not found" error if user have not tags with this ids', async () => {
    const result = await setUserMarkTags({
      id: 'some',
      userId,
      tagIds: ['not-found', 'another-not-found'],
    })

    expect(result.data).toBeUndefined()
    expect(result.error).toBe(MESSAGE_CODES.TAG_NOT_FOUND)
    expect(spyOnConsoleError).not.toHaveBeenCalled()
  })
  it('should set mark tags', async () => {
    const result = await setUserMarkTags({
      id: markId,
      tagIds,
      userId,
    })

    expect(result.data?.tags).toEqual([
      expect.objectContaining({ id: tagIds[0] }),
      expect.objectContaining({ id: tagIds[1] }),
    ])
    expect(result.error).toBeUndefined()
    expect(spyOnConsoleError).not.toHaveBeenCalled()
  })
  it('should return "not found" error and log it if user have not mark with this id', async () => {
    const result = await setUserMarkTags({
      id: 'not-found',
      tagIds,
      userId,
    })

    expect(result.data).toBeUndefined()
    expect(result.error).toBe(MESSAGE_CODES.MARK_NOT_FOUND)
    expect(spyOnConsoleError).toHaveBeenCalledOnce()
  })
  it('should return internal error and log it when other prisma error has been occurred', async () => {
    const error = new PrismaClientKnownRequestError('...', {
      code: 'P2002',
      clientVersion: '...',
    })
    spy.mockRejectedValueOnce(error)

    const result = await setUserMarkTags({
      id: 'not-found',
      tagIds,
      userId,
    })

    expect(result.data).toBeUndefined()
    expect(result.error).toBe(MESSAGE_CODES.INTERNAL_ERROR)
    expect(spyOnConsoleError).toHaveBeenCalledOnce()
  })
  it('should return internal error and log it when unknown error occurred', async () => {
    const error = new Error('unknown error')
    spy.mockRejectedValueOnce(error)

    const result = await setUserMarkTags({
      id: 'not-found',
      tagIds,
      userId,
    })

    expect(result.data).toBeUndefined()
    expect(result.error).toBe(MESSAGE_CODES.INTERNAL_ERROR)
    expect(spyOnConsoleError).toHaveBeenCalledOnce()
  })
})
