import 'server-only'

import { cacheLife, cacheTag } from 'next/cache'

import { prisma } from '@/shared/lib/prisma'
import { Tag, WebMark } from '@/shared/lib/prisma/generated/client'

import { WebMarkWithTags } from '../model/types'

interface GetUserMarksParams {
  query?: string
  userId?: WebMark['userId']
  tagId?: Tag['id']
}

type ErrorType = 'UNAUTHORIZED' | 'NOT_FOUND' | null

export async function getUserMarks({
  query,
  tagId,
  userId,
}: GetUserMarksParams): Promise<{
  marks: WebMarkWithTags[]
  error: ErrorType
}> {
  'use cache'

  cacheTag(`marks-${userId}`)
  cacheLife('days')

  if (!userId) return { marks: [], error: 'UNAUTHORIZED' }

  const marks = await prisma.webMark.findMany({
    where: {
      userId,
      tags: tagId
        ? {
            some: {
              id: tagId,
            },
          }
        : undefined,
      OR: query
        ? [
            { title: { contains: query, mode: 'insensitive' } },
            { description: { contains: query, mode: 'insensitive' } },
            { url: { contains: query, mode: 'insensitive' } },
          ]
        : undefined,
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

  if (marks.length === 0) return { marks: [], error: 'NOT_FOUND' }

  return { marks, error: null }
}
