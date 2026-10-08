import 'server-only'

import { MESSAGE_CODES } from '@/shared/api/types'
import { prisma } from '@/shared/lib/prisma'
import { Prisma, type WebMark } from '@/shared/lib/prisma/generated/client'

type ToggleUserMarkPinnedParams = Pick<WebMark, 'id' | 'pinned' | 'userId'>

// toggling webmark pinned state
// ! pass current pinned state

export async function toggleUserMarkPinned({
  id,
  pinned,
  userId,
}: ToggleUserMarkPinnedParams) {
  try {
    // update pinned state
    const mark = await prisma.webMark.update({
      data: {
        pinned: !pinned,
      },
      where: {
        id,
        userId,
      },
    })

    return { data: mark }
  } catch (error) {
    // error handling
    console.error(error)
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        return {
          error: MESSAGE_CODES.MARK_NOT_FOUND,
        }
      }
    }

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
    }
    return {
      error: MESSAGE_CODES.INTERNAL_ERROR,
    }
  }
}
