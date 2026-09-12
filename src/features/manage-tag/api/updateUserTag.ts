import 'server-only'

import { prisma } from '@/shared/lib/prisma'
import { Prisma, Tag } from '@/shared/lib/prisma/generated/client'

type UpdateUserTagParams = Pick<Tag, 'id' | 'userId'> & {
  newTitle: Tag['title']
}

export async function updateUserTag({
  id,
  userId,
  newTitle,
}: UpdateUserTagParams) {
  try {
    // update tag in db
    const tag = await prisma.tag.update({
      data: {
        title: newTitle,
      },
      where: {
        id,
        userId,
      },
    })

    // return success
    return {
      tag,
      error: null,
    }
  } catch (error) {
    // error handling
    console.error(error)
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return {
          tag: null,
          error: 'Tag with this Title already exist!',
        }
      }
      if (error.code === 'P2025') {
        return {
          tag: null,
          error: `Seems like current user doesn't have this Tag`,
        }
      }
    }
    return {
      tag: null,
      error: 'An internal error occurred while updating Tag',
    }
  }
}
