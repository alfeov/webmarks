import { updateTag } from 'next/cache'

import { MESSAGE_CODES } from '@/shared/api/types'
import { verifySession } from '@/shared/lib/session'

import { EDIT_AVATAR_FORMDATA } from '../lib/constants'
import { editAvatarAction } from './editAvatarAction'
import { updateUserAvatar } from './updateUserAvatar'

vi.mock('@/shared/lib/session')
vi.mock('./updateUserAvatar')

const prevState = { isSuccess: false }

const defaultFormData = new FormData()
defaultFormData.set(EDIT_AVATAR_FORMDATA.AVATAR_URL, 'https://some-url.com')

const userId = 'id-1'

describe('editAvatarAction', () => {
  beforeEach(() => {
    vi.mocked(verifySession, { partial: true }).mockResolvedValue({
      userId,
    })
    vi.mocked(updateUserAvatar, {
      partial: true,
      deep: true,
    }).mockResolvedValue({
      data: {},
      error: undefined,
    })
  })

  it('should return error when user is not authorized', async () => {
    vi.mocked(verifySession).mockResolvedValueOnce(null)

    const result = await editAvatarAction(prevState, defaultFormData)

    expect(updateUserAvatar).not.toHaveBeenCalled()
    expect(result.isSuccess).toBe(false)
    expect(result.errors).toBeUndefined()
    expect(result.message).toBe(MESSAGE_CODES.UNAUTHORIZED)
  })
  it('should return error when data is not valid', async () => {
    const result = await editAvatarAction(prevState, new FormData())

    expect(updateUserAvatar).not.toHaveBeenCalled()
    expect(result.isSuccess).toBe(false)
    expect(result.errors).not.toBeUndefined()
    expect(result.message).toBe(MESSAGE_CODES.VALIDATION_ERROR)
  })
  it('should not return error when logoUrl is empty string', async () => {
    const formData = new FormData()
    formData.set(EDIT_AVATAR_FORMDATA.AVATAR_URL, '')
    const result = await editAvatarAction(prevState, formData)

    expect(updateUserAvatar).toHaveBeenCalledWith({
      avatarUrl: null,
      id: userId,
    })
    expect(result.isSuccess).toBe(true)
    expect(result.errors).toBeUndefined()
    expect(result.message).toBe(MESSAGE_CODES.AVATAR_EDIT_SUCCESS)
  })
  it('should return error when occurred db error', async () => {
    const error = MESSAGE_CODES.INTERNAL_ERROR
    vi.mocked(updateUserAvatar).mockResolvedValueOnce({
      data: undefined,
      error,
    })

    const result = await editAvatarAction(prevState, defaultFormData)

    expect(result.isSuccess).toBe(false)
    expect(result.errors).toBeUndefined()
    expect(result.message).toBe(error)
  })
  it('should return success when all operations completed successfully', async () => {
    const result = await editAvatarAction(prevState, defaultFormData)

    expect(updateTag).toHaveBeenCalledWith(`user-${userId}`)
    expect(result.isSuccess).toBe(true)
    expect(result.errors).toBeUndefined()
    expect(result.message).toBe(MESSAGE_CODES.AVATAR_EDIT_SUCCESS)
  })
})
