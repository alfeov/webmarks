import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client'

import { MESSAGE_CODES } from '@/shared/api/types'
import { prisma } from '@/shared/lib/prisma'
import { createRandomTag } from '@/test/factories/createRandomTag'
import { createRandomUser } from '@/test/factories/createRandomUser'
import { spyOnConsoleError } from '@/test/vitest.setup'

import { deleteUserTag } from './deleteUserTag'

const spy = vi.spyOn(prisma.tag, 'delete')

const findUserTag = (id: string, userId: string) =>
  prisma.tag.findUnique({ where: { id, userId } })

describe('deleteUserTag', () => {
  let userId: string
  let tagId: string

  beforeEach(async () => {
    userId = (await createRandomUser()).id
    tagId = (await createRandomTag(userId)).id
  })

  it('should delete tag', async () => {
    const result = await deleteUserTag({
      id: tagId,
      userId,
    })

    expect(result.error).toBeUndefined()
    expect(spyOnConsoleError).not.toHaveBeenCalled()
    expect(await findUserTag(tagId, userId)).toBeNull()
  })
  it('should return "not found" error and log it when user have not tag with this id', async () => {
    const result = await deleteUserTag({
      id: 'not-found',
      userId,
    })

    expect(result.error).toBe(MESSAGE_CODES.TAG_NOT_FOUND)
    expect(spyOnConsoleError).toHaveBeenCalledOnce()
    expect(await findUserTag(tagId, userId)).not.toBeNull()
  })
  it('should return error when other user has this tag and current not', async () => {
    const anotherUserId = (await createRandomUser()).id
    const anotherTagId = (await createRandomTag(anotherUserId)).id

    const result = await deleteUserTag({
      id: anotherTagId,
      userId,
    })

    expect(result.error).toBe(MESSAGE_CODES.TAG_NOT_FOUND)
    expect(spyOnConsoleError).toHaveBeenCalledOnce()
    expect(await findUserTag(anotherTagId, anotherUserId)).not.toBeNull()
  })
  it('should return internal error and log it when other prisma error has been occurred', async () => {
    const error = new PrismaClientKnownRequestError('...', {
      code: 'P2002',
      clientVersion: '...',
    })
    spy.mockRejectedValueOnce(error)

    const result = await deleteUserTag({
      id: 'some id',
      userId,
    })

    expect(result.error).toBe(MESSAGE_CODES.INTERNAL_ERROR)
    expect(spyOnConsoleError).toHaveBeenCalledWith(error)
    expect(await findUserTag(tagId, userId)).not.toBeNull()
  })
  it('should return internal error and log it when unknown error occurred', async () => {
    const error = new Error('unknown error')
    spy.mockRejectedValueOnce(error)

    const result = await deleteUserTag({
      id: 'some id',
      userId,
    })

    expect(result.error).toBe(MESSAGE_CODES.INTERNAL_ERROR)
    expect(spyOnConsoleError).toHaveBeenCalledWith(error)
    expect(await findUserTag(tagId, userId)).not.toBeNull()
  })
})
