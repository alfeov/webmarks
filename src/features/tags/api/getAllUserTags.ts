import 'server-only'

import { cacheLife, cacheTag } from 'next/cache'

import { prisma } from '@/shared/lib/prisma'
import { Tag } from '@/shared/lib/prisma/generated/client'

interface GetAllUserTagsParams {
  userId?: Tag['userId']
}

export async function getAllUserTags({ userId }: GetAllUserTagsParams) {
  'use cache'

  cacheTag(`tags-${userId}`)
  cacheLife('days')

  if (!userId) return { tags: [], message: 'To view tags you must be auth' }

  const tags = await prisma.tag.findMany({
    where: {
      userId,
    },
    orderBy: {
      title: 'asc',
    },
  })

  if (tags.length === 0) return { tags: [], message: 'There are no Tags yet' }

  return { tags, message: null }
}
