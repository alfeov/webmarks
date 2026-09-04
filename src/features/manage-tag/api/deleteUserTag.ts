import { prisma } from '@/shared/lib/prisma'
import { Prisma, Tag } from '@/shared/lib/prisma/generated/client'

type DeleteTagParams = Pick<Tag, 'id' | 'userId'>

export async function deleteUserTag({ id, userId }: DeleteTagParams) {
  try {
    await prisma.tag.delete({
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
          error: `Seems like this user doesn't have Tag with id ${id}`,
        }
      }
    }
    return {
      error: 'An internal error occurred while deleting Tag',
    }
  }
}
