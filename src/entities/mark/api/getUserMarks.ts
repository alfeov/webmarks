import 'server-only'

import { cacheLife, cacheTag } from 'next/cache'

import { prisma } from '@/shared/lib/prisma'
import { Tag, WebMark } from '@/shared/lib/prisma/generated/client'

interface GetUserMarksParams {
  query?: string
  userId?: WebMark['userId']
  tagId?: Tag['id']
}

export async function getUserMarks({
  query,
  tagId,
  userId,
}: GetUserMarksParams) {
  'use cache'

  cacheTag(`marks-${userId}`)
  cacheLife('days')

  if (!userId) return { marks: [], message: 'To view marks you must be auth' }

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

  if (marks.length === 0) {
    const message = query
      ? 'There are no WebMarks for your query'
      : 'There are no WebMarks yet'
    return {
      marks: [],
      message,
    }
  }

  return { marks, message: null }
}
