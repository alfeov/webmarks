import { updateTag } from 'next/cache'

import { MESSAGE_CODES } from '@/shared/api/types'
import { verifySession } from '@/shared/lib/session'

import { CREATE_TAG_FORMDATA } from '../lib/constants'
import { createTag } from './createTag'
import { createTagAction } from './createTagAction'

vi.mock('@/shared/lib/session')
vi.mock('./createTag')

const prevState = { isSuccess: false }

const defaultFormData = new FormData()
defaultFormData.set(CREATE_TAG_FORMDATA.TITLE, 'Vercel')

const userId = 'id-1'

describe('createTagAction', () => {
  beforeEach(() => {
    vi.mocked(verifySession, { partial: true }).mockResolvedValue({
      userId,
    })
    vi.mocked(createTag, { partial: true, deep: true }).mockResolvedValue({
      data: {},
      error: undefined,
    })
  })

  it('should return error when user is not authorized', async () => {
    vi.mocked(verifySession).mockResolvedValueOnce(null)

    const result = await createTagAction(prevState, defaultFormData)

    expect(createTag).not.toHaveBeenCalled()
    expect(updateTag).not.toHaveBeenCalled()
    expect(result.isSuccess).toBe(false)
    expect(result.errors).toBeUndefined()
    expect(result.message).toBe(MESSAGE_CODES.UNAUTHORIZED)
  })
  it('should return error when data is not valid', async () => {
    const result = await createTagAction(prevState, new FormData())

    expect(createTag).not.toHaveBeenCalled()
    expect(updateTag).not.toHaveBeenCalled()
    expect(result.isSuccess).toBe(false)
    expect(result.errors).not.toBeUndefined()
    expect(result.message).toBe(MESSAGE_CODES.VALIDATION_ERROR)
  })
  it('should return error when occurred db error', async () => {
    const error = MESSAGE_CODES.INTERNAL_ERROR
    vi.mocked(createTag).mockResolvedValueOnce({
      data: undefined,
      error,
    })

    const result = await createTagAction(prevState, defaultFormData)

    expect(updateTag).not.toHaveBeenCalled()
    expect(result.isSuccess).toBe(false)
    expect(result.errors).toBeUndefined()
    expect(result.message).toBe(error)
  })
  it('should return success when all operations completed successfully', async () => {
    const result = await createTagAction(prevState, defaultFormData)

    expect(updateTag).toHaveBeenCalledWith(`tags-${userId}`)
    expect(result.isSuccess).toBe(true)
    expect(result.errors).toBeUndefined()
    expect(result.message).toBe(MESSAGE_CODES.TAG_CREATE_SUCCESS)
  })
})
