import 'server-only'

import type { MessageCode } from '@/shared/api/types'
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
}: CreateMarkParams): Promise<
  | { data: WebMark; errorCode?: undefined }
  | {
      data?: undefined
      errorCode: Extract<MessageCode, 'INTERNAL_ERROR' | 'MARK_EXISTS'>
    }
> {
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
          errorCode: 'MARK_EXISTS',
        }
      }
    }
    return {
      errorCode: 'INTERNAL_ERROR',
    }
  }
}
