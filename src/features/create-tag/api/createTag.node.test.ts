import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client'

import { MESSAGE_CODES } from '@/shared/api/types'
import { prisma } from '@/shared/lib/prisma'
import { createRandomUser } from '@/test/factories/createRandomUser'
import { spyOnConsoleError } from '@/test/vitest.setup'

import { createTag } from './createTag'

const spy = vi.spyOn(prisma.tag, 'create')

const defaultTagData = {
  title: 'Vercel',
}

describe('createTag', () => {
  let userId: string

  beforeEach(async () => {
    userId = (await createRandomUser()).id
  })

  it('should create tag and return it', async () => {
    const result = await createTag({
      ...defaultTagData,
      userId,
    })

    expect(result.data).toMatchObject(defaultTagData)
    expect(result.error).toBeUndefined()
    expect(spyOnConsoleError).not.toHaveBeenCalled()
  })
  it('should return "existence" error and log it when user already have tag with this title', async () => {
    await createTag({
      title: 'Same',
      userId,
    })

    const result = await createTag({
      title: 'Same',
      userId,
    })

    expect(result.data).toBeUndefined()
    expect(result.error).toBe(MESSAGE_CODES.TAG_EXISTS)
    expect(spyOnConsoleError).toHaveBeenCalledOnce()
  })
  it('should not return error when other user already have tag with this title', async () => {
    const anotherUserId = (await createRandomUser()).id
    await createTag({
      ...defaultTagData,
      userId: anotherUserId,
    })

    const result = await createTag({
      ...defaultTagData,
      userId,
    })

    expect(result.data).toMatchObject(defaultTagData)
    expect(result.error).toBeUndefined()
    expect(spyOnConsoleError).not.toHaveBeenCalled()
  })
  it('should return internal error and log it when other prisma error has been occurred', async () => {
    const error = new PrismaClientKnownRequestError('...', {
      code: 'P2003',
      clientVersion: '...',
    })
    spy.mockRejectedValueOnce(error)

    const result = await createTag({
      ...defaultTagData,
      userId,
    })

    expect(result.data).toBeUndefined()
    expect(result.error).toBe(MESSAGE_CODES.INTERNAL_ERROR)
    expect(spyOnConsoleError).toHaveBeenCalledWith(error)
  })
  it('should return internal error and log it when unknown error occurred', async () => {
    const error = new Error('unknown error')
    spy.mockRejectedValueOnce(error)

    const result = await createTag({
      ...defaultTagData,
      userId,
    })

    expect(result.data).toBeUndefined()
    expect(result.error).toBe(MESSAGE_CODES.INTERNAL_ERROR)
    expect(spyOnConsoleError).toHaveBeenCalledWith(error)
  })
})
