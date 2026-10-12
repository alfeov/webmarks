import { prisma } from '@/shared/lib/prisma'
import { createRandomTag } from '@/test/prisma/createRandomTag'
import { createRandomUser } from '@/test/prisma/createRandomUser'

import { getUserTag } from './getUserTag'

vi.mock('next/cache')

describe('getUserTag', () => {
  let userId: string
  let tagId: string

  beforeEach(async () => {
    userId = (await createRandomUser()).id
    tagId = (await createRandomTag(userId)).id
  })

  it('should return tag when it belongs to the user', async () => {
    const result = await getUserTag({ id: tagId, userId })

    expect(result).toMatchObject({ id: tagId, userId })
  })

  it('should return null when tag belongs to another user', async () => {
    const otherUser = await createRandomUser()
    const foreignTag = await prisma.tag.create({
      data: { title: 'Personal', userId: otherUser.id },
    })

    const result = await getUserTag({ id: foreignTag.id, userId })

    expect(result).toBeNull()
  })

  it('should return null when tag does not exist', async () => {
    const result = await getUserTag({ id: 'non-existent-id', userId })

    expect(result).toBeNull()
  })
})
