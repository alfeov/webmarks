import { MESSAGE_CODES } from '@/shared/api/types'
import { createSession } from '@/shared/lib/session'

import { SIGNUP_FORM } from '../lib/constants'
import { createUser } from './createUser'
import { signupAction } from './signupAction'

vi.mock('@/shared/lib/session')
vi.mock('./createUser')

const prevState = { isSuccess: false }

const defaultFormData = new FormData()
defaultFormData.set(SIGNUP_FORM.USERNAME, 'username')
defaultFormData.set(SIGNUP_FORM.EMAIL, 'some@mail.com')
defaultFormData.set(SIGNUP_FORM.PASSWORD, 'Password1')
defaultFormData.set(SIGNUP_FORM.CONFIRM_PASSWORD, 'Password1')

const userId = 'id-1'
const avatarUrl = 'https://some-url.com/avatar.png'

describe('signupAction', () => {
  beforeEach(() => {
    vi.mocked(createUser, { partial: true, deep: true }).mockResolvedValue({
      data: { id: userId, username: 'username', avatarUrl },
    })
  })
  it('should return error when data is not valid', async () => {
    const formData = new FormData()

    const result = await signupAction(prevState, formData)

    expect(createUser).not.toHaveBeenCalled()
    expect(createSession).not.toHaveBeenCalled()
    expect(result.isSuccess).toBe(false)
    expect(result.errors).not.toBeUndefined()
    expect(result.message).toBe(MESSAGE_CODES.VALIDATION_ERROR)
  })
  it('should return error when user has not been created', async () => {
    const error = MESSAGE_CODES.USER_EXISTS
    vi.mocked(createUser).mockResolvedValueOnce({
      data: undefined,
      error,
    })

    const result = await signupAction(prevState, defaultFormData)

    expect(createSession).not.toHaveBeenCalled()
    expect(result.isSuccess).toBe(false)
    expect(result.errors).toBeUndefined()
    expect(result.message).toBe(error)
  })
  it('should create session when user has been created', async () => {
    const result = await signupAction(prevState, defaultFormData)

    expect(createUser).toHaveBeenCalledOnce()
    expect(createSession).toHaveBeenCalledOnce()
    expect(result.isSuccess).toBe(true)
    expect(result.errors).toBeUndefined()
    expect(result.message).toBe(MESSAGE_CODES.SIGNUP_SUCCESS)
  })
})
