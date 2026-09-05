import { prisma } from '@/shared/lib/prisma'
import { WebMark } from '@/shared/lib/prisma/generated/client'

type GetUserMarkParams = Pick<WebMark, 'id' | 'userId'>

export async function getUserMark({ id, userId }: GetUserMarkParams) {
  const mark = await prisma.webMark.findUnique({
    where: {
      id,
      userId,
    },
  })

  if (!mark)
    return {
      error: `Seems like current user doesn't have provided WebMark`,
      mark: null,
    }

  return {
    error: null,
    mark,
  }
}
