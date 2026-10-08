'use server'

import { updateTag } from 'next/cache'

import { MESSAGE_CODES } from '@/shared/api/types'
import type { WebMark } from '@/shared/lib/prisma/generated/client'
import { verifySession } from '@/shared/lib/session'

import { toggleUserMarkPinned } from './toggleUserMarkPinned'

type ToggleMarkPinnedActionParams = Pick<WebMark, 'id' | 'pinned'>

export async function toggleMarkPinnedAction({
  id,
  pinned,
}: ToggleMarkPinnedActionParams) {
  // check user
  const session = await verifySession()
  if (!session) {
    return {
      isSuccess: false,
      message: MESSAGE_CODES.UNAUTHORIZED,
    }
  }

  // toggling webmark pinned state
  // ! provide the current pinned state
  const { error } = await toggleUserMarkPinned({
    id,
    pinned,
    userId: session.userId,
  })
  if (error) {
    return {
      isSuccess: false,
      message: error,
    }
  }

  // revalidation
  updateTag(`marks-${session.userId}`)

  // return success result
  return {
    isSuccess: true,
    message: MESSAGE_CODES.TOGGLE_MARK_PIN_SUCCESS,
  }
}
