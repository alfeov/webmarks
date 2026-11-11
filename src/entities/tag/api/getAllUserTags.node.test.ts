import { prisma } from '@/shared/lib/prisma'
import { createRandomUser } from '@/test/factories/createRandomUser'

import { getAllUserTags } from './getAllUserTags'

describe('getAllUserTags', () => {
  let userId: string

  beforeEach(async () => {
    userId = (await createRandomUser()).id
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
    const [first, second, third] = await getAllUserTags({ userId: userId })

    expect(first.title).toBe(firstTitle)
    expect(second.title).toBe(secondTitle)
    expect(third.title).toBe(thirdTitle)
  })
})
