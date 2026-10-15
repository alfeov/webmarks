import { updateTag } from 'next/cache'

import { MESSAGE_CODES } from '@/shared/api/types'
import { verifySession } from '@/shared/lib/session'

import { EDIT_MARK_FORMDATA } from '../lib/constants'
import { editMarkAction } from './editMarkAction'
import { updateUserMark } from './updateUserMark'

vi.mock('@/shared/lib/session')
vi.mock('./updateUserMark')

const prevState = { isSuccess: false }

const defaultFormData = new FormData()
defaultFormData.set(EDIT_MARK_FORMDATA.URL, 'https://some-url.com')
defaultFormData.set(EDIT_MARK_FORMDATA.TITLE, 'title')
defaultFormData.set(EDIT_MARK_FORMDATA.DESCRIPTION, 'some webmark desc')
defaultFormData.set(EDIT_MARK_FORMDATA.LOGO_URL, 'https://some-url.com')

const userId = 'id-1'
const markId = '1'

describe('editMarkAction', () => {
  beforeEach(() => {
    vi.mocked(verifySession, { partial: true }).mockResolvedValue({
      userId,
    })
    vi.mocked(updateUserMark, { partial: true, deep: true }).mockResolvedValue({
      data: {},
      error: undefined,
    })
  })
  it('should return error when user is not authorized', async () => {
    vi.mocked(verifySession).mockResolvedValueOnce(null)

    const result = await editMarkAction(markId, prevState, defaultFormData)

    expect(updateUserMark).not.toHaveBeenCalled()
    expect(result.isSuccess).toBe(false)
    expect(result.errors).toBeUndefined()
    expect(result.message).toBe(MESSAGE_CODES.UNAUTHORIZED)
  })
  it('should return error when data is not valid', async () => {
    const formData = new FormData()

    const result = await editMarkAction(markId, prevState, formData)

    expect(updateUserMark).not.toHaveBeenCalled()
    expect(result.isSuccess).toBe(false)
    expect(result.errors).not.toBeUndefined()
    expect(result.message).toBe(MESSAGE_CODES.VALIDATION_ERROR)
  })
  it('should return error when occurred db error', async () => {
    const error = MESSAGE_CODES.INTERNAL_ERROR
    vi.mocked(updateUserMark).mockResolvedValueOnce({
      data: undefined,
      error,
    })

    const result = await editMarkAction(markId, prevState, defaultFormData)

    expect(result.isSuccess).toBe(false)
    expect(result.errors).toBeUndefined()
    expect(result.message).toBe(error)
  })
  it('should return success when all operations completed successfully', async () => {
    const result = await editMarkAction(markId, prevState, defaultFormData)

    expect(updateTag).toHaveBeenCalledWith(`marks-${userId}`)
    expect(result.isSuccess).toBe(true)
    expect(result.errors).toBeUndefined()
    expect(result.message).toBe(MESSAGE_CODES.MARK_EDIT_SUCCESS)
  })
})
