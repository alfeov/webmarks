'use server'

import { updateTag } from 'next/cache'

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
  if (!session) return

  // toggling webmark pinned state
  // ! provide the current pinned state
  const { error } = await toggleUserMarkPinned({
    id,
    pinned,
    userId: session.userId,
  })
  if (error) return

  // revalidation
  updateTag(`marks-${session.userId}`)
}
