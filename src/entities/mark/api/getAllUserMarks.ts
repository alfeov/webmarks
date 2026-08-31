import 'server-only'

import { cacheLife, cacheTag } from 'next/cache'

import { prisma } from '@/shared/lib/prisma'
import { WebMark } from '@/shared/lib/prisma/generated/client'

interface GetAllUserMarksParams {
  userId?: WebMark['userId']
}

export async function getAllUserMarks({ userId }: GetAllUserMarksParams) {
  'use cache'

  cacheTag(`marks-${userId}`)
  cacheLife('days')

  if (!userId) return { marks: [], message: 'To view marks you must be auth' }

  const marks = await prisma.webMark.findMany({
    where: {
      userId,
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
    return { marks: [], message: 'There are no WebMarks yet' }

  return { marks, message: null }
}
