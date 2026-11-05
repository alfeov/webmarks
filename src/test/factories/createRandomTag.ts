import { randomUUID } from 'crypto'

import { prisma } from '@/shared/lib/prisma'
import type { User } from '@/shared/lib/prisma/generated/client'
import type { TagCreateInput } from '@/shared/lib/prisma/generated/models'

export const createRandomTag = async (
  userId: User['id'],
  restData?: Partial<Omit<TagCreateInput, 'user'>>,
) =>
  prisma.tag.create({
    data: {
      title: `title-${randomUUID()}`,
      userId,
      ...restData,
    },
  })
