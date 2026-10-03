'use server'

import { updateTag } from 'next/cache'

import { MESSAGE_CODES } from '@/shared/api/types'
import { Tag } from '@/shared/lib/prisma/generated/client'
import { verifySession } from '@/shared/lib/session'
import { validateFormData } from '@/shared/lib/utils/validateFormData'

import { EditTagFormSchema } from '../lib/EditTagFormSchema'
import type { EditTagFormState } from '../model/types'
import { updateUserTag } from './updateUserTag'

export async function editTagAction(
  id: Tag['id'],
  prevState: EditTagFormState,
  formData: FormData,
) {
  // check auth
  const session = await verifySession()
  if (!session)
    return {
      isSuccess: false,
      message: MESSAGE_CODES.UNAUTHORIZED,
    }

  // zod validation
  const { validatedData, validationErrors } = validateFormData(
    formData,
    EditTagFormSchema,
  )
  if (!validatedData)
    return {
      isSuccess: false,
      message: MESSAGE_CODES.VALIDATION_ERROR,
      errors: validationErrors,
    }

  // update tag in DB
  const { error } = await updateUserTag({
    id,
    newTitle: validatedData.title,
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

  // return success response
  return {
    isSuccess: true,
    message: MESSAGE_CODES.TAG_EDIT_SUCCESS,
  }
}
