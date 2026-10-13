import { MESSAGE_CODES } from '@/shared/api/types'
import { verifySession } from '@/shared/lib/session'

import { LOAD_META_FORMDATA } from '../lib/constants'
import { getMetadata } from './getMetadata'
import { loadMetaAction } from './loadMetaAction'

vi.mock('@/shared/lib/session')
vi.mock('./getMetadata')

const formData = new FormData()
formData.set(LOAD_META_FORMDATA.URL, 'https://some-url.com')

describe('loadMetaAction', () => {
  beforeEach(() => {
    const userId = 'id-1'
    vi.mocked(verifySession, { partial: true }).mockResolvedValue({
      userId,
    })
    vi.mocked(getMetadata, { partial: true, deep: true }).mockResolvedValue({
      data: {},
      error: undefined,
    })
  })

  it('should return error when user is not authorized', async () => {
    vi.mocked(verifySession).mockResolvedValueOnce(null)

    const result = await loadMetaAction({ isSuccess: false }, formData)

    expect(getMetadata).not.toHaveBeenCalled()
    expect(result.isSuccess).toBe(false)
    expect(result.errors).toBeUndefined()
    expect(result.message).toBe(MESSAGE_CODES.UNAUTHORIZED)
  })
  it('should return error when data is not valid', async () => {
    const result = await loadMetaAction({ isSuccess: false }, new FormData())

    expect(getMetadata).not.toHaveBeenCalled()
    expect(result.isSuccess).toBe(false)
    expect(result.errors).not.toBeUndefined()
    expect(result.message).toBe(MESSAGE_CODES.VALIDATION_ERROR)
  })
  it('should return error when occurred error in receiving metadata', async () => {
    vi.mocked(getMetadata).mockResolvedValueOnce({
      data: undefined,
      error: 'LOAD_META_ERROR',
    })

    const result = await loadMetaAction({ isSuccess: false }, formData)

    expect(result.isSuccess).toBe(false)
    expect(result.errors).toBeUndefined()
    expect(result.message).toBe(MESSAGE_CODES.LOAD_META_ERROR)
  })
  it('should return success when all operations completed successfully', async () => {
    const result = await loadMetaAction({ isSuccess: false }, formData)

    expect(result.isSuccess).toBe(true)
    expect(result.errors).toBeUndefined()
    expect(result.message).toBe(MESSAGE_CODES.LOAD_META_SUCCESS)
  })
})
