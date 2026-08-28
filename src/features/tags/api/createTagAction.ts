'use server'

import { flattenError } from 'zod'

import { createResult } from '@/shared/lib/createResult'
import { verifySession } from '@/shared/lib/session'

import { TagFormSchema } from '../lib/TagFormSchema'
import { CreateTagFormState } from '../model/types'
import { createTag } from './createTag'

export async function createTagAction(
  prevState: CreateTagFormState,
  formData: FormData,
) {
  // check auth
  const session = await verifySession()
  if (!session)
    return createResult({
      message: 'To create tags you must be logged in',
    })

  // zod validation
  const rawData = Object.fromEntries(formData)
  const validatedFields = TagFormSchema.safeParse(rawData)
  if (!validatedFields.success)
    return createResult({
      message: 'Please fix highlighted fields',
      errors: flattenError(validatedFields.error).fieldErrors,
    })

  // creating tag in DB
  const { tag, error } = await createTag({
    ...validatedFields.data,
    userId: session.userId,
  })
  if (!tag)
    return createResult({
      message: error,
    })

  // return success response
  return createResult({
    isSuccess: true,
    message: 'Tag has been successfully created',
  })
}
