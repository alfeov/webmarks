import 'server-only'

import { MESSAGE_CODES } from '@/shared/api/types'
import { prisma } from '@/shared/lib/prisma'
import { Prisma, Tag, WebMark } from '@/shared/lib/prisma/generated/client'

type SetUserMarkTagsParams = Pick<WebMark, 'id' | 'userId'> & {
  tagIds: Tag['id'][]
}

export async function setUserMarkTags({
  id,
  userId,
  tagIds,
}: SetUserMarkTagsParams) {
  try {
    const userTags = await prisma.tag.findMany({
      where: {
        id: {
          in: tagIds,
        },
        userId,
      },
    })

    if (userTags.length !== tagIds.length)
      return { error: MESSAGE_CODES.TAG_NOT_FOUND }

    const mark = await prisma.webMark.update({
      data: {
        tags: {
          set: tagIds.map((tagId) => ({ id: tagId })),
        },
      },
      where: {
        id,
        userId,
      },
    })

    return { data: mark }
  } catch (error) {
    console.error(error)
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        return { error: MESSAGE_CODES.MARK_NOT_FOUND }
      }
    }
    return { error: MESSAGE_CODES.INTERNAL_ERROR }
  }
}
