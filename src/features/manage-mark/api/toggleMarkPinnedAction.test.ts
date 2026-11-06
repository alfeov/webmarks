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

  it('should not call fn when user is not authorized', async () => {
    vi.mocked(verifySession).mockResolvedValueOnce(null)
    await toggleMarkPinnedAction(defaultData)

    expect(updateTag).not.toHaveBeenCalled()
    expect(toggleUserMarkPinned).not.toHaveBeenCalled()
  })
  it('should not update on db error', async () => {
    const error = MESSAGE_CODES.INTERNAL_ERROR
    vi.mocked(toggleUserMarkPinned).mockResolvedValueOnce({
      error,
    })

    await toggleMarkPinnedAction(defaultData)

    expect(updateTag).not.toHaveBeenCalled()
  })
  it('should call updateTag when all operations completed successfully', async () => {
    await toggleMarkPinnedAction(defaultData)

    expect(updateTag).toHaveBeenCalledWith(`marks-${userId}`)
  })
})
