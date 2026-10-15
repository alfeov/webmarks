import { updateTag } from 'next/cache'

import { MESSAGE_CODES } from '@/shared/api/types'
import { verifySession } from '@/shared/lib/session'

import type { CreateMark } from '../model/types'
import { createMark } from './createMark'
import { createMarkAction } from './createMarkAction'

vi.mock('@/shared/lib/session')
vi.mock('./createMark')

const prevState = { isSuccess: false }

const defaultData: CreateMark = {
  url: 'https://some-url.com',
  title: 'title',
  description: 'some webmark desc',
  logoUrl: 'https://some-url.com',
}

const userId = 'id-1'

describe('createMarkAction', () => {
  beforeEach(() => {
    vi.mocked(verifySession, { partial: true }).mockResolvedValue({
      userId,
    })
    vi.mocked(createMark, { partial: true, deep: true }).mockResolvedValue({
      data: {},
      error: undefined,
    })
  })

  it('should return error when user is not authorized', async () => {
    vi.mocked(verifySession).mockResolvedValueOnce(null)

    const result = await createMarkAction(undefined, prevState, defaultData)

    expect(createMark).not.toHaveBeenCalled()
    expect(result.isSuccess).toBe(false)
    expect(result.errors).toBeUndefined()
    expect(result.message).toBe(MESSAGE_CODES.UNAUTHORIZED)
  })
  it('should return error when data is not valid', async () => {
    const result = await createMarkAction(undefined, prevState, {
      title: '',
      description: '',
      logoUrl: '',
      url: '',
    })

    expect(createMark).not.toHaveBeenCalled()
    expect(result.isSuccess).toBe(false)
    expect(result.errors).not.toBeUndefined()
    expect(result.message).toBe(MESSAGE_CODES.VALIDATION_ERROR)
  })
  it('should return error when occurred db error', async () => {
    const error = MESSAGE_CODES.INTERNAL_ERROR
    vi.mocked(createMark).mockResolvedValueOnce({
      data: undefined,
      error,
    })

    const result = await createMarkAction(undefined, prevState, defaultData)

    expect(result.isSuccess).toBe(false)
    expect(result.errors).toBeUndefined()
    expect(result.message).toBe(error)
  })
  it('should return success when all operations completed successfully', async () => {
    const result = await createMarkAction(undefined, prevState, defaultData)

    expect(updateTag).toHaveBeenCalledWith(`marks-${userId}`)
    expect(result.isSuccess).toBe(true)
    expect(result.errors).toBeUndefined()
    expect(result.message).toBe(MESSAGE_CODES.MARK_CREATE_SUCCESS)
  })
})
