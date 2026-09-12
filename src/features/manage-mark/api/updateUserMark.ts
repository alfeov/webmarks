import 'server-only'

import { prisma } from '@/shared/lib/prisma'
import { Prisma, WebMark } from '@/shared/lib/prisma/generated/client'

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
    return { mark, error: null }
  } catch (error) {
    // error handling
    console.error(error)
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return {
          mark: null,
          error: 'WebMark with this URL already exist!',
        }
      }
      if (error.code === 'P2025') {
        return {
          mark: null,
          error: `Seems like current user doesn't have this WebMark`,
        }
      }
    }
    return {
      mark: null,
      error: 'An internal error occurred while updating WebMark',
    }
  }
}
