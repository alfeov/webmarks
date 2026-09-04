import { prisma } from '@/shared/lib/prisma'
import { Prisma } from '@/shared/lib/prisma/generated/client'
import { TagUncheckedCreateInput } from '@/shared/lib/prisma/generated/models'

export async function createTag({ title, userId }: TagUncheckedCreateInput) {
  try {
    const tag = await prisma.tag.create({
      data: {
        userId,
        title,
      },
    })
    return {
      tag,
      error: null,
    }
  } catch (error) {
    console.error(error)
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return {
          tag: null,
          error: 'Tag with this Title already exist!',
        }
      }
    }
    return {
      tag: null,
      error: 'An internal error occurred while creating Tag',
    }
  }
}
