import 'server-only'

import { MESSAGE_CODES } from '@/shared/api/types'
import { prisma } from '@/shared/lib/prisma'
import { Prisma, Tag } from '@/shared/lib/prisma/generated/client'

type DeleteUserTagParams = Pick<Tag, 'id' | 'userId'>

export async function deleteUserTag({ id, userId }: DeleteUserTagParams) {
  try {
    await prisma.tag.delete({
      where: {
        id,
        userId,
      },
    })
    return {
      error: undefined,
    }
  } catch (error) {
    console.error(error)
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
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
