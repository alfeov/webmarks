import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client'

import { MESSAGE_CODES } from '@/shared/api/types'
import { prisma } from '@/shared/lib/prisma'
import { createRandomTag } from '@/test/factories/createRandomTag'
import { createRandomUser } from '@/test/factories/createRandomUser'
import { spyOnConsoleError } from '@/test/helpers/spyOnConsoleError'

import { updateUserTag } from './updateUserTag'

const spy = vi.spyOn(prisma.tag, 'update')

const defaultUpdateData = {
  title: 'updated-title',
}

describe('updateUserTag', () => {
  let userId: string
  let tagId: string

  beforeEach(async () => {
    userId = (await createRandomUser()).id
    tagId = (await createRandomTag(userId)).id
  })

  it('should update tag and return it', async () => {
    const result = await updateUserTag({
      ...defaultUpdateData,
      id: tagId,
      userId,
    })

    expect(result.data).toMatchObject(defaultUpdateData)
    expect(result.error).toBeUndefined()
    expect(spyOnConsoleError).not.toHaveBeenCalled()
  })
  it('should return "existence" error and log it when user already have another tag with this title', async () => {
    const anotherTag = await createRandomTag(userId)

    const result = await updateUserTag({
      title: anotherTag.title,
      id: tagId,
      userId,
    })

    expect(result.data).toBeUndefined()
    expect(result.error).toBe(MESSAGE_CODES.TAG_EXISTS)
    expect(spyOnConsoleError).toHaveBeenCalledOnce()
  })
  it('should not return error when other user already have tag with this title', async () => {
    const anotherUserId = (await createRandomUser()).id
    const anotherTag = await createRandomTag(anotherUserId)

    const result = await updateUserTag({
      title: anotherTag.title,
      id: tagId,
      userId,
    })

    expect(result.data).toMatchObject({
      title: anotherTag.title,
    })
    expect(result.error).toBeUndefined()
    expect(spyOnConsoleError).not.toHaveBeenCalled()
  })
  it('should return "not found" error and log it when user have not tag with this id', async () => {
    const result = await updateUserTag({
      ...defaultUpdateData,
      id: 'not-found',
      userId,
    })

    expect(result.data).toBeUndefined()
    expect(result.error).toBe(MESSAGE_CODES.TAG_NOT_FOUND)
    expect(spyOnConsoleError).toHaveBeenCalledOnce()
  })
  it('should return internal error and log it when other prisma error has been occurred', async () => {
    const error = new PrismaClientKnownRequestError('...', {
      code: 'P2003',
      clientVersion: '...',
    })
    spy.mockRejectedValueOnce(error)

    const result = await updateUserTag({
      ...defaultUpdateData,
      id: 'some-id',
      userId,
    })

    expect(result.data).toBeUndefined()
    expect(result.error).toBe(MESSAGE_CODES.INTERNAL_ERROR)
    expect(spyOnConsoleError).toHaveBeenCalledWith(error)
  })
  it('should return internal error and log it when unknown error occurred', async () => {
    const error = new Error('unknown error')
    spy.mockRejectedValueOnce(error)

    const result = await updateUserTag({
      ...defaultUpdateData,
      id: 'some-id',
      userId,
    })

    expect(result.data).toBeUndefined()
    expect(result.error).toBe(MESSAGE_CODES.INTERNAL_ERROR)
    expect(spyOnConsoleError).toHaveBeenCalledWith(error)
  })
})
