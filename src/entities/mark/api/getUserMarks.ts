import 'server-only'

import { cacheLife, cacheTag } from 'next/cache'
import { notFound } from 'next/navigation'

import { MESSAGE_CODES } from '@/shared/api/types'
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

  if (!userId) return { marks: [], error: MESSAGE_CODES.UNAUTHORIZED }

  if (tagId) {
    const tag = await prisma.tag.findUnique({
      where: {
        id: tagId,
        userId,
      },
    })
    if (!tag) return notFound()
  }

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

  if (marks.length === 0)
    return {
      marks: [],
      error: MESSAGE_CODES.MARKS_NOT_FOUND,
    }

  return { marks }
}
