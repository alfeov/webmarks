import { cacheLife, cacheTag } from 'next/cache'

import { prisma } from '@/shared/lib/prisma'
import { Tag, WebMark } from '@/shared/lib/prisma/generated/client'

interface GetMarksByTagParams {
  userId?: WebMark['userId']
  tagId: Tag['id']
}

export async function getMarksByTag({ userId, tagId }: GetMarksByTagParams) {
  'use cache'

  cacheTag(`marks-${userId}`)
  cacheLife('days')

  if (!userId) return { marks: [], message: 'To view marks you must be auth' }

  const marks = await prisma.webMark.findMany({
    where: {
      userId,
      tags: {
        some: {
          id: tagId,
        },
      },
    },
    orderBy: [
      {
        pinned: 'desc',
      },
      {
        createdAt: 'desc',
      },
    ],
    include: {
      tags: true,
    },
  })

  if (marks.length === 0)
    return { marks: [], message: 'There are no WebMarks with this Tag yet' }

  return { marks, message: null }
}
