import { prisma } from '@/shared/lib/prisma'
import { Tag } from '@/shared/lib/prisma/generated/client'

type GetUserTagParams = Pick<Tag, 'id' | 'userId'>

export async function getUserTag({ id, userId }: GetUserTagParams) {
  const tag = await prisma.tag.findUnique({
    where: {
      id,
      userId,
    },
  })

  if (!tag)
    return {
      error: `Seems like Tag with id (${id}) doesn't exist`,
      tag: null,
    }

  return {
    error: null,
    tag,
  }
}
