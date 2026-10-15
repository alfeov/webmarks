import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client'

import { MESSAGE_CODES } from '@/shared/api/types'
import { prisma } from '@/shared/lib/prisma'
import { createRandomMark } from '@/test/prisma/createRandomMark'
import { createRandomUser } from '@/test/prisma/createRandomUser'
import { spyOnConsoleError } from '@/test/vitest.setup'

import { toggleUserMarkPinned } from './toggleUserMarkPinned'

const spy = vi.spyOn(prisma.webMark, 'update')

describe('toggleUserMarkPinned', () => {
  let userId: string
  let markId: string

  beforeEach(async () => {
    userId = (await createRandomUser()).id
    markId = (
      await createRandomMark(userId, undefined, {
        pinned: false,
      })
    ).id
  })

  it('should pin mark when it is unpinned', async () => {
    const result = await toggleUserMarkPinned({
      id: markId,
      pinned: false,
      userId,
    })

    expect(result.error).toBeUndefined()
    expect(result.data?.pinned).toBe(true)
    expect(spyOnConsoleError).not.toHaveBeenCalled()
  })
  it('should unpin mark when it is pinned', async () => {
    const mark = await createRandomMark(userId, undefined, {
      pinned: true,
    })

    const result = await toggleUserMarkPinned({
      id: mark.id,
      pinned: true,
      userId,
    })

    expect(result.error).toBeUndefined()
    expect(result.data?.pinned).toBe(false)
    expect(spyOnConsoleError).not.toHaveBeenCalled()
  })
  it('should return "not found" error and log it when user have not mark with this id', async () => {
    const result = await toggleUserMarkPinned({
      id: 'not-found',
      pinned: false,
      userId,
    })

    expect(result.data).toBeUndefined()
    expect(result.error).toBe(MESSAGE_CODES.MARK_NOT_FOUND)
    expect(spyOnConsoleError).toHaveBeenCalledOnce()
  })
  it('should return "not found" error and log it when other user has this mark and current not', async () => {
    const anotherUserId = (await createRandomUser()).id
    const mark = await createRandomMark(anotherUserId)

    const result = await toggleUserMarkPinned({
      id: mark.id,
      pinned: false,
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

    const result = await toggleUserMarkPinned({
      id: 'some',
      pinned: false,
      userId,
    })

    expect(result.data).toBeUndefined()
    expect(result.error).toBe(MESSAGE_CODES.INTERNAL_ERROR)
    expect(spyOnConsoleError).toHaveBeenCalledWith(error)
  })
  it('should return internal error and log it when unknown error occurred', async () => {
    const error = new Error('unknown error')
    spy.mockRejectedValueOnce(error)

    const result = await toggleUserMarkPinned({
      id: 'some id',
      pinned: false,
      userId,
    })

    expect(result.data).toBeUndefined()
    expect(result.error).toBe(MESSAGE_CODES.INTERNAL_ERROR)
    expect(spyOnConsoleError).toHaveBeenCalledWith(error)
  })
})
