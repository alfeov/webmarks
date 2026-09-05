'use server'

import { updateTag } from 'next/cache'

import { Tag } from '@/shared/lib/prisma/generated/client'
import { verifySession } from '@/shared/lib/session'
import { createResult } from '@/shared/lib/utils/createResult'
import { validateFormData } from '@/shared/lib/utils/validateFormData'

import { CreateMarkFormSchema } from '../lib/CreateMarkFormSchema'
import { CreateMark, CreateMarkFormState } from '../model/types'
import { createMark } from './createMark'

export async function createMarkAction(
  defaultTagId: Tag['id'] | null,
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
    CreateMarkFormSchema,
  )
  if (!validatedData)
    return createResult({
      errors: validationErrors,
      message: 'Please fix the highlighted fields',
    })

  // webmark creation
  const { mark, error } = await createMark({
    userId: session.userId,
    ...validatedData,
    logoUrl: validatedData.logoUrl ?? null,
    // if on the tag page then connect to tag
    tagId: defaultTagId,
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
    message: 'Webmark has been successfully created',
  })
}
