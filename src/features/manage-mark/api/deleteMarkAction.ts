'use server'

import { updateTag } from 'next/cache'

import { WebMark } from '@/shared/lib/prisma/generated/client'
import { verifySession } from '@/shared/lib/session'

import { deleteUserMark } from './deleteUserMark'

export async function deleteMarkAction(id: WebMark['id']) {
  // check auth
  const session = await verifySession()
  if (!session)
    return {
      isSuccess: false,
      message: 'To delete you must be auth',
    }

  // delete mark in db
  const { error } = await deleteUserMark({
    id,
    userId: session.userId,
  })
  if (error)
    return {
      isSuccess: false,
      message: error,
    }

  // revalidation
  updateTag(`marks-${session.userId}`)

  // return success response
  return {
    isSuccess: true,
    message: 'WebMark has been successfully deleted!',
  }
}
