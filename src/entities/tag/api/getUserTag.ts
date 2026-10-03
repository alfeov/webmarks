import 'server-only'

import { cacheLife, cacheTag } from 'next/cache'

import { prisma } from '@/shared/lib/prisma'
import { Tag } from '@/shared/lib/prisma/generated/client'

type GetUserTagParams = {
  id: Tag['id']
  userId: Tag['userId']
}

export async function getUserTag({ id, userId }: GetUserTagParams) {
  'use cache'

  cacheTag(`tags-${userId}`)
  cacheLife('days')

  const tag = await prisma.tag.findUnique({
    where: {
      id,
      userId,
    },
  })

  return tag
}
