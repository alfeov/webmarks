'use server'

import { updateTag } from 'next/cache'

import { MESSAGE_CODES } from '@/shared/api/types'
import { Tag } from '@/shared/lib/prisma/generated/client'
import { verifySession } from '@/shared/lib/session'
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
    return {
      isSuccess: false,
      message: MESSAGE_CODES.UNAUTHORIZED,
    }

  // zod validation
  const { validatedData, validationErrors } = validateFormData(
    data,
    CreateMarkFormSchema,
  )
  if (!validatedData)
    return {
      isSuccess: false,
      errors: validationErrors,
      message: MESSAGE_CODES.VALIDATION_ERROR,
    }

  // webmark creation
  const result = await createMark({
    userId: session.userId,
    ...validatedData,
    logoUrl: validatedData.logoUrl ?? null,
    // if on the tag page then connect to tag
    tagId: defaultTagId,
  })
  if (!result.data)
    return {
      isSuccess: false,
      message: result.error,
    }

  // invalidation
  updateTag(`marks-${session.userId}`)

  // return success response
  return {
    isSuccess: true,
    message: MESSAGE_CODES.MARK_CREATE_SUCCESS,
  }
}
