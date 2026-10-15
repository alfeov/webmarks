import { updateTag } from 'next/cache'

import { MESSAGE_CODES } from '@/shared/api/types'
import { verifySession } from '@/shared/lib/session'

import { changeMarkTagsAction } from './changeMarkTagsAction'
import { setUserMarkTags } from './setUserMarkTags'

vi.mock('@/shared/lib/session')
vi.mock('./setUserMarkTags')

const prevState = { isSuccess: false }

const defaultFormData = new FormData()
defaultFormData.set('tagId-1', '1')
defaultFormData.set('tagId-2', '2')
defaultFormData.set('tagId-3', '3')

const userId = 'id-1'
const markId = '1'

describe('changeMarkTagsAction', () => {
  beforeEach(() => {
    vi.mocked(verifySession, { partial: true }).mockResolvedValue({
      userId,
    })
    vi.mocked(setUserMarkTags, { partial: true, deep: true }).mockResolvedValue(
      {
        data: {},
        error: undefined,
      },
    )
  })

  it('should return error when markId is not defined', async () => {
    const result = await changeMarkTagsAction(
      undefined,
      prevState,
      defaultFormData,
    )

    expect(setUserMarkTags).not.toHaveBeenCalled()
    expect(result.isSuccess).toBe(false)
    expect(result.message).toBe(MESSAGE_CODES.INVALID_ID)
  })
  it('should return error when user is not authorized', async () => {
    vi.mocked(verifySession).mockResolvedValueOnce(null)

    const result = await changeMarkTagsAction(
      markId,
      prevState,
      defaultFormData,
    )

    expect(setUserMarkTags).not.toHaveBeenCalled()
    expect(result.isSuccess).toBe(false)
    expect(result.message).toBe(MESSAGE_CODES.UNAUTHORIZED)
  })
  it('should return error when data is not valid', async () => {
    const formData = new FormData()
    // invalid data
    formData.set('tagId-', 'blablabla')
    formData.set('tagId-', '')

    const result = await changeMarkTagsAction(markId, prevState, formData)

    expect(setUserMarkTags).not.toHaveBeenCalled()
    expect(result.isSuccess).toBe(false)
    expect(result.message).toBe(MESSAGE_CODES.INVALID_ID)
  })
  it('should return error when occurred db error', async () => {
    const error = MESSAGE_CODES.INTERNAL_ERROR
    vi.mocked(setUserMarkTags).mockResolvedValueOnce({
      data: undefined,
      error,
    })

    const result = await changeMarkTagsAction(
      markId,
      prevState,
      defaultFormData,
    )

    expect(result.isSuccess).toBe(false)
    expect(result.message).toBe(error)
  })
  it('should return success when all operations completed successfully', async () => {
    const result = await changeMarkTagsAction(
      markId,
      prevState,
      defaultFormData,
    )

    expect(updateTag).toHaveBeenCalledWith(`marks-${userId}`)
    expect(result.isSuccess).toBe(true)
    expect(result.message).toBe(MESSAGE_CODES.CHANGE_MARK_TAGS_SUCCESS)
  })
})
