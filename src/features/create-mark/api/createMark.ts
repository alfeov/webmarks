import { prisma } from '@/shared/lib/prisma'
import { Prisma, WebMark } from '@/shared/lib/prisma/generated/client'

type CreateMarkParams = Pick<
  WebMark,
  'title' | 'description' | 'url' | 'logoUrl' | 'userId'
>

export async function createMark({
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
