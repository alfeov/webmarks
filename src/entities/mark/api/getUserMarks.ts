import 'server-only'

import { cacheLife, cacheTag } from 'next/cache'

import { prisma } from '@/shared/lib/prisma'
import type { Tag, WebMark } from '@/shared/lib/prisma/generated/client'

interface GetUserMarksParams {
  query?: string
  userId: WebMark['userId']
  tagId?: Tag['id']
}

// ! if you update tag data you possible need to revalidate marks
// ! this request return tags included in marks
// ! without revalidation might lead to ui incoherence

export async function getUserMarks({
  query,
  tagId,
  userId,
}: GetUserMarksParams) {
  'use cache'

  cacheTag(`marks-${userId}`)
  cacheLife('days')

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

  return marks
}
