import { randomUUID } from 'crypto'

import { prisma } from '@/shared/lib/prisma'
import type { User } from '@/shared/lib/prisma/generated/client'

export const createRandomTag = async (userId: User['id']) =>
  prisma.tag.create({
    data: {
      title: `tag-${randomUUID()}`,
      userId,
    },
  })
