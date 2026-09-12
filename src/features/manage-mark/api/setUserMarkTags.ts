import 'server-only'

import { prisma } from '@/shared/lib/prisma'
import { Prisma, Tag, WebMark } from '@/shared/lib/prisma/generated/client'

type SetUserMarkTagsParams = Pick<WebMark, 'id' | 'userId'> & {
  tagIds: Pick<Tag, 'id'>[]
}

export async function setUserMarkTags({
  id,
  userId,
  tagIds,
}: SetUserMarkTagsParams) {
  try {
    const mark = await prisma.webMark.update({
      data: {
        tags: {
          set: tagIds,
        },
      },
      where: {
        id,
        userId,
      },
    })

    return {
      mark,
      error: null,
    }
  } catch (error) {
    console.error(error)
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        return {
          mark: null,
          error:
            "Seems like current user doesn't have this WebMark/Provided Tag(-s) doesn't exist",
        }
      }
    }
    return {
      mark: null,
      error: 'An internal error occurred while applying Tag(-s) to WebMark',
    }
  }
}
