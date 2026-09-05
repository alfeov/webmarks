'use server'

import { updateTag } from 'next/cache'

import { WebMark } from '@/shared/lib/prisma/generated/client'
import { verifySession } from '@/shared/lib/session'
import { createResult } from '@/shared/lib/utils/createResult'
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
    return createResult({
      message: 'To edit WebMarks you must login to account',
    })

  // zod validation
  const { validatedData, validationErrors } = validateFormData(
    formData,
    EditMarkFormSchema,
  )
  if (!validatedData)
    return createResult({
      errors: validationErrors,
      message: 'Please fix the highlighted fields',
    })

  // updating webmark in db
  const { error, mark } = await updateUserMark({
    id: markId,
    userId: session.userId,
    ...validatedData,
    logoUrl: validatedData.logoUrl ?? null,
  })
  if (!mark)
    return createResult({
      message: error,
    })

  // revalidation
  updateTag(`marks-${session.userId}`)

  // return success response
  return createResult({
    isSuccess: true,
    message: 'Webmark has been successfully edited',
  })
}
