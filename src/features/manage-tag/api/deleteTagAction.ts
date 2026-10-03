'use server'

import { updateTag } from 'next/cache'
import type { Locale } from 'next-intl'

import { MESSAGE_CODES } from '@/shared/api/types'
import { redirect } from '@/shared/i18n/navigation'
import { Tag } from '@/shared/lib/prisma/generated/client'
import { verifySession } from '@/shared/lib/session'

import { deleteUserTag } from './deleteUserTag'

export async function deleteTagAction(
  id: Tag['id'],
  isOnTagPage: boolean,
  locale: Locale,
) {
  // check auth
  const session = await verifySession()
  if (!session)
    return {
      isSuccess: false,
      message: MESSAGE_CODES.UNAUTHORIZED,
    }

  // delete tag in db
  const { error } = await deleteUserTag({
    id,
    userId: session.userId,
  })
  if (error)
    return {
      isSuccess: false,
      message: error,
    }

  // revalidation
  updateTag(`tags-${session.userId}`)
  updateTag(`marks-${session.userId}`)

  // redirection
  if (isOnTagPage) redirect({ href: '/', locale })

  // return success response
  return {
    isSuccess: true,
    message: MESSAGE_CODES.TAG_DELETE_SUCCESS,
  }
}
