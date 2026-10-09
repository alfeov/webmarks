import { prisma } from '@/shared/lib/prisma'
import { createRandomTag } from '@/test/prisma/createRandomTag'
import { createRandomUser } from '@/test/prisma/createRandomUser'

import { getUserMarks } from './getUserMarks'

vi.mock('next/cache')

describe('getUserMarks', () => {
  let userId: string
  let tagId: string

  beforeEach(async () => {
    // creating current user with marks
    userId = (await createRandomUser()).id
    tagId = (await createRandomTag(userId)).id
    await prisma.$transaction([
      prisma.webMark.create({
        data: {
          title: 'title filter_word', // < filter word in title
          description: 'desc',
          url: 'url',
          userId,
          tags: {
            // < with tag
            connect: {
              id: tagId,
            },
          },
          createdAt: new Date(1000),
        },
      }),
      prisma.webMark.create({
        data: {
          title: 'another title',
          description: 'another desc filter_word', // < filter word in desc
          url: 'another url',
          userId,
          tags: {
            // < with tag
            connect: {
              id: tagId,
            },
          },
          pinned: true,
          createdAt: new Date(0), // < the oldest one is pinned
        },
      }),
      prisma.webMark.create({
        data: {
          title: 'without tag',
          description: 'without tag',
          url: 'https://example.com/filter_word', // < filter word in url
          userId,
          createdAt: new Date(2000),
        }, // < without tag
      }),
    ])
    // creating another user with marks
    const anotherUserId = (await createRandomUser()).id
    await prisma.webMark.create({
      data: {
        title: 'unrelated',
        description: 'unrelated',
        url: 'https://example.com',
        userId: anotherUserId,
      },
    })
  })

  it('should return user marks', async () => {
    const result = await getUserMarks({ userId })

    expect(result).toHaveLength(3)
  })
  it('should filter by title, url or description insensitively if specified', async () => {
    const result = await getUserMarks({ userId, query: 'FILTER_WORD' })

    expect(result).toHaveLength(3)
  })
  it('should filter by query and tagId if they specified', async () => {
    const result = await getUserMarks({ userId, query: 'FILTER_WORD', tagId })

    expect(result).toHaveLength(2)
  })
  it('should filter by tagId if specified', async () => {
    const result = await getUserMarks({ userId, tagId })

    expect(result).toHaveLength(2)
  })
  it('should return marks with included tags', async () => {
    const result = await getUserMarks({ userId })

    expect(result[0].tags).toBeInstanceOf(Array)
  })
  it('should sort pinned marks first (from pinned to not), then by createdAt descending (from new to old)', async () => {
    const [pinned, createdEarlier, createdLater] = await getUserMarks({
      userId,
    })

    expect(pinned.pinned).toBe(true)
    expect(createdEarlier.pinned).toBe(false)
    expect(createdLater.pinned).toBe(false)

    expect(
      createdEarlier.createdAt > createdLater.createdAt &&
        createdLater.createdAt > pinned.createdAt,
    ).toBe(true)
  })
})
