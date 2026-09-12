import 'server-only'

import { prisma } from '@/shared/lib/prisma'
import { Prisma, WebMark } from '@/shared/lib/prisma/generated/client'

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
      error: null,
    }
  } catch (error) {
    console.error(error)
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        return {
          error: `Seems like current user doesn't have this WebMark`,
        }
      }
    }
    return {
      error: 'An internal error occurred while deleting WebMark',
    }
  }
}
