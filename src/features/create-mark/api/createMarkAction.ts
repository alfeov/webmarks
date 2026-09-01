'use server'

import { revalidateTag, updateTag } from 'next/cache'

import { createResult } from '@/shared/lib/createResult'
import { verifySession } from '@/shared/lib/session'
import { validateFormData } from '@/shared/lib/validateFormData'

import { MarkFormSchema } from '../lib/MarkFormSchema'
import { CreateMark, CreateMarkFormState } from '../model/types'
import { createMark } from './createMark'
import { createMarkAndConnectTag } from './createMarkAndConnectTag'

export async function createMarkAction(
  prevState: CreateMarkFormState,
  data: CreateMark,
) {
  // check auth
  const session = await verifySession()
  if (!session)
    return createResult({
      message: 'To create WebMarks you must login to account',
    })

  // zod validation
  const { validatedData, validationErrors } = validateFormData(
    data,
    MarkFormSchema,
  )
  if (!validatedData)
    return createResult({
      errors: validationErrors,
      message: 'Please fix the highlighted fields',
    })

  // webmark creation
  const { mark, error } = validatedData.defaultTagId
    ? await createMarkAndConnectTag({
        ...validatedData,
        tagId: validatedData.defaultTagId,
        userId: session.userId,
      })
    : await createMark({
        ...validatedData,
        userId: session.userId,
      })
  if (!mark)
    return createResult({
      message: error,
    })

  // revalidation
  if (validatedData.defaultTagId) {
    updateTag(`marks-${session.userId}-${validatedData.defaultTagId}`)
  }
  updateTag(`marks-${session.userId}`)

  // return success response
  return createResult({
    isSuccess: true,
    message: 'Webmark has been successfully created',
  })
}
