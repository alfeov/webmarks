import { prisma } from '@/shared/lib/prisma'
import { Prisma, Tag, WebMark } from '@/shared/lib/prisma/generated/client'

type SetMarkTagsParams = {
  markId: WebMark['id']
  tagIds: Pick<Tag, 'id'>[]
}

export async function setMarkTags({ markId, tagIds }: SetMarkTagsParams) {
  try {
    const mark = await prisma.webMark.update({
      data: {
        tags: {
          set: tagIds,
        },
      },
      where: {
        id: markId,
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
          error: "Seems like WebMark/Provided Tag(-s) doesn't exist",
        }
      }
    }
    return {
      mark: null,
      error: 'An internal error occurred while connecting WebMark with Tag(-s)',
    }
  }
}
