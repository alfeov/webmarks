import { randomUUID } from 'crypto'

import { prisma } from '@/shared/lib/prisma'
import type { Tag, User } from '@/shared/lib/prisma/generated/client'
import type { WebMarkCreateInput } from '@/shared/lib/prisma/generated/models'

export const createRandomMark = async (
  userId: User['id'],
  tagId?: Tag['id'],
  restData?: Omit<
    WebMarkCreateInput,
    'url' | 'title' | 'description' | 'userId' | 'tags' | 'user'
  >,
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
      ...restData,
    },
  })
}
