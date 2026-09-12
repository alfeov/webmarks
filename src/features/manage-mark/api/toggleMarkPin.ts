import 'server-only'

import { getUserMark } from '@/entities/mark/api/getUserMark'
import { prisma } from '@/shared/lib/prisma'
import { WebMark } from '@/shared/lib/prisma/generated/client'

type SetMarkPinnedParams = Pick<WebMark, 'id' | 'pinned' | 'userId'>

// toggling webmark pinned state
// ! pass current pinned state

export async function toggleMarkPin({
  id,
  pinned,
  userId,
}: SetMarkPinnedParams) {
  try {
    // check mark in db
    const { error } = await getUserMark({ id, userId })
    if (error) return { mark: null, error }

    // update pinned state
    const mark = await prisma.webMark.update({
      data: {
        pinned: !pinned,
      },
      where: {
        id,
      },
    })

    return { mark, error: null }
  } catch (error) {
    // error handling
    console.error(error)
    return {
      mark: null,
      error: 'An internal error occurred while attach pin to WebMark',
    }
  }
}
