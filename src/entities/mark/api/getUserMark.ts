import 'server-only'

import { prisma } from '@/shared/lib/prisma'
import { WebMark } from '@/shared/lib/prisma/generated/client'

type GetUserMarkParams = Pick<WebMark, 'id' | 'userId'>

export async function getUserMark({ id, userId }: GetUserMarkParams) {
  return await prisma.webMark.findUnique({
    where: {
      id,
      userId,
    },
  })
}
