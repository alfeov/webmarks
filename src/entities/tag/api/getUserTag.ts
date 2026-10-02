import 'server-only'

import { prisma } from '@/shared/lib/prisma'
import { Tag } from '@/shared/lib/prisma/generated/client'

type GetUserTagParams = {
  id: Tag['id']
  userId?: Tag['userId']
}

export async function getUserTag({ id, userId }: GetUserTagParams) {
  'use cache'

  if (!userId)
    return {
      error: 'UNAUTHORIZED',
      tag: null,
    }

  const tag = await prisma.tag.findUnique({
    where: {
      id,
      userId,
    },
  })

  if (!tag)
    return {
      error: 'NOT_FOUND',
      tag: null,
    }

  return {
    error: null,
    tag,
  }
}
