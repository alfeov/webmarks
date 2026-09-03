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
    console.error('pinMarkAction: To pin WebMark user must be auth')
    return
  }

  // toggling webmark pinned state
  // ! pass current pinned state
  const { error } = await toggleMarkPin({
    id,
    pinned,
    userId: session.userId,
  })
  if (error) {
    console.error('pinMarkAction: ' + error)
    return
  }

  // revalidation
  updateTag(`marks-${session.userId}`)
}
