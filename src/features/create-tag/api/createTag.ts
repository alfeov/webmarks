import 'server-only'

import { MESSAGE_CODES } from '@/shared/api/types'
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
      data: tag,
    }
  } catch (error) {
    console.error(error)
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return {
          error: MESSAGE_CODES.TAG_EXISTS,
        }
      }
    }
    return {
      error: MESSAGE_CODES.INTERNAL_ERROR,
    }
  }
}
