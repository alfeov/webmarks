import { MESSAGE_CODES } from '@/shared/api/types'
import { createSession } from '@/shared/lib/session'

import { SIGNIN_FORMDATA } from '../lib/constants'
import { signinAction } from './signinAction'
import { verifyUser } from './verifyUser'

vi.mock('@/shared/lib/session')
vi.mock('./verifyUser')

const prevState = { isSuccess: false }

const defaultFormData = new FormData()
defaultFormData.set(SIGNIN_FORMDATA.EMAIL, 'some@mail.com')
defaultFormData.set(SIGNIN_FORMDATA.PASSWORD, 'Password1')

const userId = 'id-1'
const username = 'username'
const avatarUrl = 'https://some-url.com/avatar.png'

describe('signinAction', () => {
  beforeEach(() => {
    vi.mocked(verifyUser, { partial: true, deep: true }).mockResolvedValue({
      data: { id: userId, username, avatarUrl },
    })
  })
  it('should return error when data is not valid', async () => {
    const formData = new FormData()

    const result = await signinAction(prevState, formData)

    expect(verifyUser).not.toHaveBeenCalled()
    expect(createSession).not.toHaveBeenCalled()
    expect(result.isSuccess).toBe(false)
    expect(result.errors).not.toBeUndefined()
    expect(result.message).toBe(MESSAGE_CODES.VALIDATION_ERROR)
  })
  it('should return error when user is not verified', async () => {
    const error = MESSAGE_CODES.USER_INCORRECT_PASSWORD
    vi.mocked(verifyUser).mockResolvedValueOnce({
      data: undefined,
      error,
    })

    const result = await signinAction(prevState, defaultFormData)

    expect(createSession).not.toHaveBeenCalled()
    expect(result.isSuccess).toBe(false)
    expect(result.errors).toBeUndefined()
    expect(result.message).toBe(error)
  })
  it('should create session when user is verified', async () => {
    const result = await signinAction(prevState, defaultFormData)

    expect(createSession).toHaveBeenCalledOnce()
    expect(createSession).toHaveBeenCalledWith({
      userId,
      username,
      avatarUrl,
    })
    expect(result.isSuccess).toBe(true)
    expect(result.errors).toBeUndefined()
    expect(result.message).toBe(MESSAGE_CODES.SIGNIN_SUCCESS)
  })
})
