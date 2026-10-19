import 'server-only'

import { cacheLife, cacheTag } from 'next/cache'

import { prisma } from '@/shared/lib/prisma'
import type { Tag } from '@/shared/lib/prisma/generated/client'

interface GetAllUserTagsParams {
  userId: Tag['userId']
}

export async function getAllUserTags({ userId }: GetAllUserTagsParams) {
  'use cache'

  cacheTag(`tags-${userId}`)
  cacheLife('days')

  const tags = await prisma.tag.findMany({
    where: {
      userId,
    },
    orderBy: {
      title: 'asc',
    },
  })

  return tags
}
