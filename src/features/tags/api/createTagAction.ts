'use server'

import { updateTag } from 'next/cache'

import { createResult } from '@/shared/lib/createResult'
import { verifySession } from '@/shared/lib/session'
import { validateFormData } from '@/shared/lib/validateFormData'

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
  const { validatedData, validationErrors } = validateFormData(
    formData,
    TagFormSchema,
  )
  if (!validatedData)
    return createResult({
      message: 'Please fix highlighted fields',
      errors: validationErrors,
    })

  // creating tag in DB
  const { tag, error } = await createTag({
    ...validatedData,
    userId: session.userId,
  })
  if (!tag)
    return createResult({
      message: error,
    })

  // revalidation
  updateTag(`tags-${session.userId}`)

  // return success response
  return createResult({
    isSuccess: true,
    message: 'Tag has been successfully created',
  })
}
