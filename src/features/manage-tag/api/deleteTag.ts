import { prisma } from '@/shared/lib/prisma'
import { Prisma, Tag } from '@/shared/lib/prisma/generated/client'

interface DeleteTagParams {
  id: Tag['id']
}

export async function deleteTag({ id }: DeleteTagParams) {
  try {
    await prisma.tag.delete({
      where: {
        id,
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
          error: `Seems like Tag with id ${id} doesn't exist!`,
        }
      }
    }
    return {
      error: 'An internal error occurred while creating WebMark',
    }
  }
}
