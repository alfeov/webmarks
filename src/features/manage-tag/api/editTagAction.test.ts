import { updateTag } from 'next/cache'

import { MESSAGE_CODES } from '@/shared/api/types'
import { verifySession } from '@/shared/lib/session'

import { EDIT_TAG_FORMDATA } from '../lib/constants'
import { editTagAction } from './editTagAction'
import { updateUserTag } from './updateUserTag'

vi.mock('@/shared/lib/session')
vi.mock('./updateUserTag')

const prevState = { isSuccess: false }

const defaultFormData = new FormData()
defaultFormData.set(EDIT_TAG_FORMDATA.TITLE, 'title')

const userId = 'id-1'
const tagId = '1'

describe('editTagAction', () => {
  beforeEach(() => {
    vi.mocked(verifySession, { partial: true }).mockResolvedValue({
      userId,
    })
    vi.mocked(updateUserTag, { partial: true, deep: true }).mockResolvedValue({
      data: {},
      error: undefined,
    })
  })
  it('should return error when user is not authorized', async () => {
    vi.mocked(verifySession).mockResolvedValueOnce(null)

    const result = await editTagAction(tagId, prevState, defaultFormData)

    expect(updateUserTag).not.toHaveBeenCalled()
    expect(result.isSuccess).toBe(false)
    expect(result.errors).toBeUndefined()
    expect(result.message).toBe(MESSAGE_CODES.UNAUTHORIZED)
  })
  it('should return error when data is not valid', async () => {
    const formData = new FormData()

    const result = await editTagAction(tagId, prevState, formData)

    expect(updateTag).not.toHaveBeenCalled()
    expect(updateUserTag).not.toHaveBeenCalled()
    expect(result.isSuccess).toBe(false)
    expect(result.errors).not.toBeUndefined()
    expect(result.message).toBe(MESSAGE_CODES.VALIDATION_ERROR)
  })
  it('should return error when occurred db error', async () => {
    const error = MESSAGE_CODES.INTERNAL_ERROR
    vi.mocked(updateUserTag).mockResolvedValueOnce({
      data: undefined,
      error,
    })

    const result = await editTagAction(tagId, prevState, defaultFormData)

    expect(updateTag).not.toHaveBeenCalled()
    expect(result.isSuccess).toBe(false)
    expect(result.errors).toBeUndefined()
    expect(result.message).toBe(error)
  })
  it('should revalidate tags and marks caches when all operations completed successfully', async () => {
    const result = await editTagAction(tagId, prevState, defaultFormData)

    expect(updateTag).toHaveBeenCalledTimes(2)
    expect(updateTag).toHaveBeenNthCalledWith(1, `tags-${userId}`)
    expect(updateTag).toHaveBeenNthCalledWith(2, `marks-${userId}`)
    expect(result.isSuccess).toBe(true)
    expect(result.errors).toBeUndefined()
    expect(result.message).toBe(MESSAGE_CODES.TAG_EDIT_SUCCESS)
  })
})
