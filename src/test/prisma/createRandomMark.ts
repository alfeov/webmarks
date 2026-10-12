import { randomUUID } from 'crypto'

import { prisma } from '@/shared/lib/prisma'
import type { Tag, User } from '@/shared/lib/prisma/generated/client'

export const createRandomMark = async (
  userId: User['id'],
  tagId?: Tag['id'],
) => {
  const randomId = randomUUID()

  return prisma.webMark.create({
    data: {
      url: `https://${randomId}.com`,
      title: `title-${randomId}`,
      description: `desc-${randomId}`,
      userId,
      tags: {
        connect: tagId
          ? {
              id: tagId,
            }
          : undefined,
      },
    },
  })
}
