import 'server-only'

import { cacheLife, cacheTag } from 'next/cache'

import { MESSAGE_CODES } from '@/shared/api/types'
import { prisma } from '@/shared/lib/prisma'
import type { Tag } from '@/shared/lib/prisma/generated/client'

interface GetAllUserTagsParams {
  userId?: Tag['userId']
}

export async function getAllUserTags({ userId }: GetAllUserTagsParams) {
  'use cache'

  cacheTag(`tags-${userId}`)
  cacheLife('days')

  if (!userId) return { tags: [], message: MESSAGE_CODES.UNAUTHORIZED }

  const tags = await prisma.tag.findMany({
    where: {
      userId,
    },
    orderBy: {
      title: 'asc',
    },
  })

  if (tags.length === 0)
    return { tags: [], message: MESSAGE_CODES.TAGS_NOT_FOUND }

  return { tags, message: null }
}
