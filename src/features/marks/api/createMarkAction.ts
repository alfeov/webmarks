'use server'

import { flattenError } from 'zod'

import { createResult } from '@/shared/lib/createResult'
import { verifySession } from '@/shared/lib/session'

import { MarkFormSchema } from '../lib/MarkFormSchema'
import { CreateMark, CreateMarkFormState } from '../model/types'
import { createMark } from './createMark'

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
  const validatedFields = MarkFormSchema.safeParse(data)
  if (!validatedFields.success)
    return createResult({
      errors: flattenError(validatedFields.error).fieldErrors,
      message: 'Please fix the highlighted fields',
    })

  // webmark creation
  const { mark, error } = await createMark({
    ...validatedFields.data,
    userId: session.userId,
  })
  if (!mark)
    return createResult({
      message: error,
    })

  // return success response
  return createResult({
    isSuccess: true,
    message: 'Webmark has been successfully created',
  })
}
