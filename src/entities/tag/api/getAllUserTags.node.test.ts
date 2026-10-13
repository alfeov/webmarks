import { MESSAGE_CODES } from '@/shared/api/types'
import { prisma } from '@/shared/lib/prisma'
import { createRandomUser } from '@/test/prisma/createRandomUser'

import { getAllUserTags } from './getAllUserTags'

describe('getAllUserTags', () => {
  let userId: string

  beforeEach(async () => {
    userId = (await createRandomUser()).id
  })
  it('should return empty tags array and message when userId is not passed', async () => {
    const result = await getAllUserTags({})

    expect(result.tags).toEqual([])
    expect(result.message).toEqual(MESSAGE_CODES.UNAUTHORIZED)
  })
  it('should return empty tags array and message if tags not found', async () => {
    const result = await getAllUserTags({ userId: userId })

    expect(result.tags).toEqual([])
    expect(result.message).toEqual(MESSAGE_CODES.TAGS_NOT_FOUND)
  })
  it('should return tags in ascending order if they exist', async () => {
    const firstTitle = 'ABC'
    const secondTitle = 'BCD'
    const thirdTitle = 'CDE'

    await prisma.tag.createMany({
      data: [
        { title: thirdTitle, userId },
        { title: firstTitle, userId },
        { title: secondTitle, userId },
      ],
    })
    const {
      message,
      tags: [first, second, third],
    } = await getAllUserTags({ userId: userId })

    expect(first.title).toBe(firstTitle)
    expect(second.title).toBe(secondTitle)
    expect(third.title).toBe(thirdTitle)
    expect(message).toBeUndefined()
  })
  it('should not return tags belonging to other users', async () => {
    const otherUser = await createRandomUser()
    await prisma.tag.createMany({
      data: [
        { title: 'user tag', userId },
        { title: 'unrelated', userId: otherUser.id },
      ],
    })

    const { tags } = await getAllUserTags({ userId })

    expect(tags).toHaveLength(1)
    expect(tags[0].title).toBe('user tag')
  })
})
