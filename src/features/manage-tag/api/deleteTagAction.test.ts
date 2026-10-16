import { updateTag } from 'next/cache'

import { MESSAGE_CODES } from '@/shared/api/types'
import { verifySession } from '@/shared/lib/session'

import { deleteTagAction } from './deleteTagAction'
import { deleteUserTag } from './deleteUserTag'

const { redirect } = vi.hoisted(() => ({
  redirect: vi.fn(),
}))

vi.mock('@/shared/lib/session')
vi.mock('./deleteUserTag')
vi.mock('@/shared/i18n/navigation', () => ({
  redirect,
}))

const userId = 'id-1'
const tagId = '1'
const locale = 'en'

describe('deleteTagAction', () => {
  beforeEach(() => {
    vi.mocked(verifySession, { partial: true }).mockResolvedValue({
      userId,
    })
    vi.mocked(deleteUserTag, { partial: true, deep: true }).mockResolvedValue(
      {},
    )
  })

  it('should return error when user is not authorized', async () => {
    vi.mocked(verifySession).mockResolvedValueOnce(null)

    const result = await deleteTagAction(tagId, false, locale)

    expect(updateTag).not.toHaveBeenCalled()
    expect(deleteUserTag).not.toHaveBeenCalled()
    expect(result.isSuccess).toBe(false)
    expect(result.message).toBe(MESSAGE_CODES.UNAUTHORIZED)
  })
  it('should return error when occurred db error', async () => {
    const error = MESSAGE_CODES.TAG_NOT_FOUND
    vi.mocked(deleteUserTag).mockResolvedValueOnce({
      error,
    })

    const result = await deleteTagAction(tagId, false, locale)

    expect(updateTag).not.toHaveBeenCalled()
    expect(result.isSuccess).toBe(false)
    expect(result.message).toBe(error)
  })
  it('should revalidate tags and marks caches when all operations completed successfully', async () => {
    const result = await deleteTagAction(tagId, false, locale)

    expect(updateTag).toHaveBeenCalledTimes(2)
    expect(updateTag).toHaveBeenNthCalledWith(1, `tags-${userId}`)
    expect(updateTag).toHaveBeenNthCalledWith(2, `marks-${userId}`)
    expect(result.isSuccess).toBe(true)
    expect(result.message).toBe(MESSAGE_CODES.TAG_DELETE_SUCCESS)
  })
  it('should redirect to the home page when tag is deleted from the tag page', async () => {
    await deleteTagAction(tagId, true, locale)

    expect(redirect).toHaveBeenCalledWith({
      href: '/',
      locale,
    })
  })
  it('should not redirect when tag is not deleted from the tag page', async () => {
    await deleteTagAction(tagId, false, locale)

    expect(redirect).not.toHaveBeenCalled()
  })
})
