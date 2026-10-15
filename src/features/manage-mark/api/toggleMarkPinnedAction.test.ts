import { updateTag } from 'next/cache'

import { MESSAGE_CODES } from '@/shared/api/types'
import { verifySession } from '@/shared/lib/session'

import { toggleMarkPinnedAction } from './toggleMarkPinnedAction'
import { toggleUserMarkPinned } from './toggleUserMarkPinned'

vi.mock('@/shared/lib/session')
vi.mock('./toggleUserMarkPinned')

const userId = 'id-1'

const defaultData = {
  id: '1',
  pinned: false,
}

describe('toggleMarkPinnedAction', () => {
  beforeEach(() => {
    vi.mocked(verifySession, { partial: true }).mockResolvedValue({
      userId,
    })
    vi.mocked(toggleUserMarkPinned, {
      partial: true,
      deep: true,
    }).mockResolvedValue({
      data: {},
    })
  })

  it('should return error when user is not authorized', async () => {
    vi.mocked(verifySession).mockResolvedValueOnce(null)

    const result = await toggleMarkPinnedAction(defaultData)

    expect(toggleUserMarkPinned).not.toHaveBeenCalled()
    expect(result.isSuccess).toBe(false)
    expect(result.message).toBe(MESSAGE_CODES.UNAUTHORIZED)
  })
  it('should return error when occurred db error', async () => {
    const error = MESSAGE_CODES.INTERNAL_ERROR
    vi.mocked(toggleUserMarkPinned).mockResolvedValueOnce({
      error,
    })

    const result = await toggleMarkPinnedAction(defaultData)

    expect(result.isSuccess).toBe(false)
    expect(result.message).toBe(error)
  })
  it('should return success when all operations completed successfully', async () => {
    const result = await toggleMarkPinnedAction(defaultData)

    expect(updateTag).toHaveBeenCalledWith(`marks-${userId}`)
    expect(result.isSuccess).toBe(true)
    expect(result.message).toBe(MESSAGE_CODES.TOGGLE_MARK_PIN_SUCCESS)
  })
})
