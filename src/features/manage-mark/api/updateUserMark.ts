import 'server-only'

import { MESSAGE_CODES } from '@/shared/api/types'
import { prisma } from '@/shared/lib/prisma'
import { Prisma, type WebMark } from '@/shared/lib/prisma/generated/client'

export async function updateUserMark({
  id,
  userId,
  title,
  description,
  url,
  logoUrl,
}: Pick<
  WebMark,
  'title' | 'description' | 'url' | 'logoUrl' | 'id' | 'userId'
>) {
  try {
    // update mark in db
    const mark = await prisma.webMark.update({
      data: {
        title,
        description,
        url,
        logoUrl,
      },
      where: {
        id,
        userId,
      },
    })

    // return success
    return { data: mark }
  } catch (error) {
    // error handling
    console.error(error)
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return {
          error: MESSAGE_CODES.MARK_EXISTS,
        }
      }
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
