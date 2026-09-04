'use server'

import { updateTag } from 'next/cache'

import { WebMark } from '@/shared/lib/prisma/generated/client'
import { verifySession } from '@/shared/lib/session'

import { validateChangeMarkTagsForm } from '../lib/validateChangeMarkTagsForm'
import { ChangeMarkTagsFormState } from '../model/types'
import { setMarkTags } from './setMarkTags'

export async function changeMarkTagsAction(
  markId: WebMark['id'] | undefined,
  prevState: ChangeMarkTagsFormState,
  formData: FormData,
) {
  if (!markId)
    return {
      isSuccess: false,
      message: 'Mark ID has not been provided',
    }

  // check auth
  const session = await verifySession()
  if (!session)
    return {
      isSuccess: false,
      message: 'To change WebMark Tags you must me auth',
    }

  // zod validation
  const { tagIds, validationError } = validateChangeMarkTagsForm(formData)
  if (!tagIds)
    return {
      isSuccess: false,
      message: validationError,
    }

  // set tags to webmark
  const { error } = await setMarkTags({
    markId,
    tagIds: tagIds.map((tagId) => ({ id: tagId })),
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
    message: 'Tags has been successfully changed',
  }
}
