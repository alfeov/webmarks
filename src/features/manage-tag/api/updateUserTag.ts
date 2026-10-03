import 'server-only'

import { MESSAGE_CODES } from '@/shared/api/types'
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
      data: tag,
    }
  } catch (error) {
    // error handling
    console.error(error)
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return {
          error: MESSAGE_CODES.TAG_EXISTS,
        }
      }
      if (error.code === 'P2025') {
        return {
          error: MESSAGE_CODES.TAG_NOT_FOUND,
        }
      }
    }
    return {
      error: MESSAGE_CODES.INTERNAL_ERROR,
    }
  }
}
