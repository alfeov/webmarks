import 'server-only'

import { MESSAGE_CODES } from '@/shared/api/types'
import { prisma } from '@/shared/lib/prisma'
import { Prisma, Tag, WebMark } from '@/shared/lib/prisma/generated/client'

type CreateMarkParams = Pick<
  WebMark,
  'title' | 'description' | 'url' | 'logoUrl' | 'userId'
> & { tagId: Tag['id'] | null }

export async function createMark({
  tagId,
  title,
  description,
  url,
  logoUrl,
  userId,
}: CreateMarkParams) {
  try {
    const mark = await prisma.webMark.create({
      data: {
        userId,
        title,
        url,
        description,
        logoUrl: logoUrl ?? null,
        tags: tagId
          ? {
              connect: {
                id: tagId,
              },
            }
          : undefined,
      },
    })

    return {
      data: mark,
    }
  } catch (error) {
    console.error(error)
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return {
          error: MESSAGE_CODES.MARK_EXISTS,
        }
      }
    }
    return {
      error: MESSAGE_CODES.INTERNAL_ERROR,
    }
  }
}
