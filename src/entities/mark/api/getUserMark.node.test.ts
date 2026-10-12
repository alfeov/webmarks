import { createRandomMark } from '@/test/prisma/createRandomMark'
import { createRandomUser } from '@/test/prisma/createRandomUser'

import { getUserMark } from './getUserMark'

describe('getUserMark', () => {
  let userId: string
  let markId: string

  beforeEach(async () => {
    userId = (await createRandomUser()).id
    markId = (await createRandomMark(userId)).id
  })

  it('should return mark when it belongs to the user', async () => {
    const result = await getUserMark({ id: markId, userId })

    expect(result).toMatchObject({ id: markId, userId })
  })

  it('should return null when mark belongs to another user', async () => {
    const otherUser = await createRandomUser()
    const foreignMark = await createRandomMark(otherUser.id)

    const result = await getUserMark({ id: foreignMark.id, userId })

    expect(result).toBeNull()
  })

  it('should return null when mark does not exist', async () => {
    const result = await getUserMark({ id: 'non-existent-id', userId })

    expect(result).toBeNull()
  })
})
