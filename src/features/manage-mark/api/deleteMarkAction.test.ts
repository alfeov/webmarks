import { updateTag } from 'next/cache'

import { MESSAGE_CODES } from '@/shared/api/types'
import { verifySession } from '@/shared/lib/session'

import { deleteMarkAction } from './deleteMarkAction'
import { deleteUserMark } from './deleteUserMark'

vi.mock('@/shared/lib/session')
vi.mock('./deleteUserMark')

const userId = 'id-1'
const markId = '1'

describe('deleteMarkAction', () => {
  beforeEach(() => {
    vi.mocked(verifySession, { partial: true }).mockResolvedValue({
      userId,
    })
    vi.mocked(deleteUserMark, { partial: true, deep: true }).mockResolvedValue(
      {},
    )
  })

  it('should return error when user is not authorized', async () => {
    vi.mocked(verifySession).mockResolvedValueOnce(null)

    const result = await deleteMarkAction(markId)

    expect(deleteUserMark).not.toHaveBeenCalled()
    expect(result.isSuccess).toBe(false)
    expect(result.message).toBe(MESSAGE_CODES.UNAUTHORIZED)
  })
  it('should return error when occurred db error', async () => {
    const error = MESSAGE_CODES.INTERNAL_ERROR
    vi.mocked(deleteUserMark).mockResolvedValueOnce({
      error,
    })

    const result = await deleteMarkAction(markId)

    expect(result.isSuccess).toBe(false)
    expect(result.message).toBe(error)
  })
  it('should return success when all operations completed successfully', async () => {
    const result = await deleteMarkAction(markId)

    expect(updateTag).toHaveBeenCalledWith(`marks-${userId}`)
    expect(result.isSuccess).toBe(true)
    expect(result.message).toBe(MESSAGE_CODES.MARK_DELETE_SUCCESS)
  })
})
