import { getUserTag } from '@/entities/tag/api/getUserTag'
import { prisma } from '@/shared/lib/prisma'
import { Tag } from '@/shared/lib/prisma/generated/client'

type UpdateUserTagParams = Pick<Tag, 'id' | 'userId'> & {
  newTitle: Tag['title']
}

export async function updateUserTag({
  id,
  userId,
  newTitle,
}: UpdateUserTagParams) {
  try {
    // check existence tag in db
    const { error } = await getUserTag({ id, userId })
    if (error)
      return {
        tag: null,
        error,
      }

    // update tag in db
    const tag = await prisma.tag.update({
      data: {
        title: newTitle,
      },
      where: {
        id,
      },
    })

    // return success
    return {
      tag,
      error: null,
    }
  } catch (error) {
    // error handling
    console.error(error)
    return {
      tag: null,
      error: 'An internal error occurred while creating WebMark',
    }
  }
}
