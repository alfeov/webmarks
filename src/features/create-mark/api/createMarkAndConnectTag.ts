import { getUserTag } from '@/entities/tag/api/getUserTag'
import { prisma } from '@/shared/lib/prisma'
import { Prisma, Tag } from '@/shared/lib/prisma/generated/client'
import { WebMarkUncheckedCreateInput } from '@/shared/lib/prisma/generated/models'

type CreateMarkAndConnectTagParams = WebMarkUncheckedCreateInput & {
  tagId: Tag['id']
}

export async function createMarkAndConnectTag({
  title,
  description,
  url,
  logoUrl,
  userId,
  tagId,
}: CreateMarkAndConnectTagParams) {
  try {
    const { error, tag } = await getUserTag({ id: tagId, userId })
    if (!tag) {
      return {
        mark: null,
        error,
      }
    }

    const mark = await prisma.webMark.create({
      data: {
        userId,
        title,
        url,
        description,
        logoUrl: logoUrl ?? null,
        tags: {
          connect: {
            id: tag.id,
          },
        },
      },
    })

    return {
      mark,
      error: null,
    }
  } catch (error) {
    console.error(error)
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return {
          mark: null,
          error: 'WebMark with this URL already exist!',
        }
      }
    }
    return {
      mark: null,
      error: 'An internal error occurred while creating WebMark',
    }
  }
}
