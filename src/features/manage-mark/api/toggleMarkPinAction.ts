'use server'

import { updateTag } from 'next/cache'

import { WebMark } from '@/shared/lib/prisma/generated/client'
import { verifySession } from '@/shared/lib/session'

import { toggleMarkPin } from './toggleMarkPin'

type ToggleMarkPinActionParams = Pick<WebMark, 'id' | 'pinned'>

export async function toggleMarkPinAction({
  id,
  pinned,
}: ToggleMarkPinActionParams) {
  // check user
  const session = await verifySession()
  if (!session) {
    return {
      isSuccess: false,
      message: 'To pin WebMark you must be auth',
    }
  }

  // toggling webmark pinned state
  // ! pass current pinned state
  const { error } = await toggleMarkPin({
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
    message: 'Mark has been successfully pinned',
  }
}
