import 'server-only'

import { MESSAGE_CODES } from '@/shared/api/types'
import { prisma } from '@/shared/lib/prisma'
import { Prisma, type WebMark } from '@/shared/lib/prisma/generated/client'

type DeleteUserMarkParams = Pick<WebMark, 'id' | 'userId'>

export async function deleteUserMark({ id, userId }: DeleteUserMarkParams) {
  try {
    await prisma.webMark.delete({
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
          error: MESSAGE_CODES.MARK_NOT_FOUND,
        }
      }
    }
    return {
      error: MESSAGE_CODES.INTERNAL_ERROR,
    }
  }
}
