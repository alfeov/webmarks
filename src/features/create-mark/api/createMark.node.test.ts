import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client'

import { MESSAGE_CODES } from '@/shared/api/types'
import { prisma } from '@/shared/lib/prisma'
import { createRandomTag } from '@/test/prisma/createRandomTag'
import { createRandomUser } from '@/test/prisma/createRandomUser'
import { spyOnConsoleError } from '@/test/vitest.setup'

import { createMark } from './createMark'

const spy = vi.spyOn(prisma.webMark, 'create')

const defaultMarkData: Omit<
  Parameters<typeof createMark>[0],
  'userId' | 'tagId'
> = {
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
  it('should not connect to tag when passed null as tag id', async () => {
    const result = await createMark({
      ...defaultMarkData,
      tagId: null,
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
  it('should return "existence" error and console it when user already have mark with this url', async () => {
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
  it('should return internal error and console it when other prisma error have been occurred', async () => {
    spy.mockRejectedValueOnce(
      new PrismaClientKnownRequestError('...', {
        code: 'P2003',
        clientVersion: '...',
      }),
    )

    const result = await createMark({
      ...defaultMarkData,
      url: 'https://same-url.com',
      tagId,
      userId,
    })

    expect(result.data).toBeUndefined()
    expect(result.error).toBe(MESSAGE_CODES.INTERNAL_ERROR)
    expect(spyOnConsoleError).toHaveBeenCalledOnce()
  })
  it('should return internal error and console it when occurred', async () => {
    spy.mockRejectedValueOnce(new Error('unknown error'))

    const result = await createMark({
      ...defaultMarkData,
      url: 'https://same-url.com',
      tagId,
      userId,
    })

    expect(result.data).toBeUndefined()
    expect(result.error).toBe(MESSAGE_CODES.INTERNAL_ERROR)
    expect(spyOnConsoleError).toHaveBeenCalledOnce()
  })
})
