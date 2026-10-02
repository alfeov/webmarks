'use server'

import { updateTag } from 'next/cache'

import { MESSAGE_CODES } from '@/shared/api/types'
import { WebMark } from '@/shared/lib/prisma/generated/client'
import { verifySession } from '@/shared/lib/session'
import { validateFormData } from '@/shared/lib/utils/validateFormData'

import { EditMarkFormSchema } from '../lib/EditMarkFormSchema'
import { EditMarkFormState } from '../model/types'
import { updateUserMark } from './updateUserMark'

export async function editMarkAction(
  markId: WebMark['id'],
  prevState: EditMarkFormState,
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
    EditMarkFormSchema,
  )
  if (!validatedData)
    return {
      isSuccess: false,
      errors: validationErrors,
      message: MESSAGE_CODES.VALIDATION_ERROR,
    }

  // updating webmark in db
  const { error, data } = await updateUserMark({
    id: markId,
    userId: session.userId,
    ...validatedData,
    logoUrl: validatedData.logoUrl ?? null,
  })
  if (!data)
    return {
      isSuccess: false,
      message: error,
    }

  // revalidation
  updateTag(`marks-${session.userId}`)

  // return success response
  return {
    isSuccess: true,
    message: MESSAGE_CODES.MARK_EDIT_SUCCESS,
  }
}
