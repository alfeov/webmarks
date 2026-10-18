import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client'

import { MESSAGE_CODES } from '@/shared/api/types'
import { prisma } from '@/shared/lib/prisma'
import { createRandomTag } from '@/test/factories/createRandomTag'
import { createRandomUser } from '@/test/factories/createRandomUser'
import { spyOnConsoleError } from '@/test/helpers/spyOnConsoleError'

import { createMark } from './createMark'

const spy = vi.spyOn(prisma.webMark, 'create')

const defaultMarkData = {
  url: 'https://some-url.com',
  title: 'mark-title',
  description: 'mark-desc',
  logoUrl: 'https://some-url.com',
}

describe('createMark', () => {
  let userId: string
  let tagId: string

  beforeEach(async () => {
    // creating current user with marks
    userId = (await createRandomUser()).id
    tagId = (await createRandomTag(userId)).id
  })

  it('should create mark and return it', async () => {
    const result = await createMark({
      ...defaultMarkData,
      tagId,
      userId,
    })

    expect(result.data).toMatchObject(defaultMarkData)
    expect(result.error).toBeUndefined()
  })
  it('should connect to tag when tag id is passed', async () => {
    const result = await createMark({
      ...defaultMarkData,
      tagId,
      userId,
    })

    expect(result.data?.tags[0].id).toBe(tagId)
  })
  it('should not connect to tag when tagId not passed', async () => {
    const result = await createMark({
      ...defaultMarkData,
      tagId: undefined,
      userId,
    })

    expect(result.data?.tags).toEqual([])
  })
  it('should not set logoUrl when it passed as null', async () => {
    const result = await createMark({
      ...defaultMarkData,
      logoUrl: null,
      tagId,
      userId,
    })

    expect(result.data?.logoUrl).toBeNull()
  })
  it('should return "existence" error and log it when user already have mark with this url', async () => {
    await createMark({
      ...defaultMarkData,
      url: 'https://same-url.com',
      tagId,
      userId,
    })

    const result = await createMark({
      ...defaultMarkData,
      url: 'https://same-url.com',
      tagId,
      userId,
    })

    expect(result.data).toBeUndefined()
    expect(result.error).toBe(MESSAGE_CODES.MARK_EXISTS)
    expect(spyOnConsoleError).toHaveBeenCalledOnce()
  })
  it('should not return error when other user already have mark with this url', async () => {
    const anotherUserId = (await createRandomUser()).id
    await createMark({
      ...defaultMarkData,
      tagId,
      userId: anotherUserId,
    })

    const result = await createMark({
      ...defaultMarkData,
      tagId,
      userId,
    })

    expect(result.data).toMatchObject(defaultMarkData)
    expect(result.error).toBeUndefined()
  })
  it('should return internal error and log it when other prisma error has been occurred', async () => {
    const error = new PrismaClientKnownRequestError('...', {
      code: 'P2003',
      clientVersion: '...',
    })
    spy.mockRejectedValueOnce(error)

    const result = await createMark({
      ...defaultMarkData,
      url: 'https://same-url.com',
      tagId,
      userId,
    })

    expect(result.data).toBeUndefined()
    expect(result.error).toBe(MESSAGE_CODES.INTERNAL_ERROR)
    expect(spyOnConsoleError).toHaveBeenCalledWith(error)
  })
  it('should return internal error and log it when unknown error occurred', async () => {
    const error = new Error('unknown error')
    spy.mockRejectedValueOnce(error)

    const result = await createMark({
      ...defaultMarkData,
      url: 'https://same-url.com',
      tagId,
      userId,
    })

    expect(result.data).toBeUndefined()
    expect(result.error).toBe(MESSAGE_CODES.INTERNAL_ERROR)
    expect(spyOnConsoleError).toHaveBeenCalledWith(error)
  })
})
