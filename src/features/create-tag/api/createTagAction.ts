'use server'

import { updateTag } from 'next/cache'

import { MESSAGE_CODES } from '@/shared/api/types'
import { verifySession } from '@/shared/lib/session'
import { validateFormData } from '@/shared/lib/utils/validateFormData'

import { CreateTagFormSchema } from '../lib/CreateTagFormSchema'
import type { CreateTagFormState } from '../model/types'
import { createTag } from './createTag'

export async function createTagAction(
  prevState: CreateTagFormState,
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
    CreateTagFormSchema,
  )
  if (!validatedData)
    return {
      isSuccess: false,
      message: MESSAGE_CODES.VALIDATION_ERROR,
      errors: validationErrors,
    }

  // creating tag in DB
  const { data, error } = await createTag({
    ...validatedData,
    userId: session.userId,
  })
  if (!data)
    return {
      isSuccess: false,
      message: error,
    }

  // revalidation
  updateTag(`tags-${session.userId}`)

  // return success response
  return {
    isSuccess: true,
    message: MESSAGE_CODES.TAG_CREATE_SUCCESS,
  }
}
