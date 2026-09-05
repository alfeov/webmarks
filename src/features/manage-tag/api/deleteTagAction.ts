'use server'

import { updateTag } from 'next/cache'
import { redirect } from 'next/navigation'

import { Tag } from '@/shared/lib/prisma/generated/client'
import { verifySession } from '@/shared/lib/session'

import { deleteUserTag } from './deleteUserTag'

export async function deleteTagAction(id: Tag['id'], isOnTagPage: boolean) {
  // check auth
  const session = await verifySession()
  if (!session)
    return {
      isSuccess: false,
      message: 'To delete Tag you must be auth',
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
  if (isOnTagPage) redirect('/')

  // return success response
  return {
    isSuccess: true,
    message: 'Tag has been successfully deleted!',
  }
}
