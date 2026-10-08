'use server'

import { updateTag } from 'next/cache'

import { MESSAGE_CODES } from '@/shared/api/types'
import type { WebMark } from '@/shared/lib/prisma/generated/client'
import { verifySession } from '@/shared/lib/session'

import { IdsSchema } from '../lib/IdsSchema'
import type { ChangeMarkTagsFormState } from '../model/types'
import { setUserMarkTags } from './setUserMarkTags'

export async function changeMarkTagsAction(
  markId: WebMark['id'] | undefined,
  prevState: ChangeMarkTagsFormState,
  formData: FormData,
) {
  if (!markId)
    return {
      isSuccess: false,
      message: MESSAGE_CODES.INVALID_ID,
    }

  // check auth
  const session = await verifySession()
  if (!session)
    return {
      isSuccess: false,
      message: MESSAGE_CODES.UNAUTHORIZED,
    }

  // zod validation
  const rawData = Array.from(formData.values())
  const validatedValues = IdsSchema.safeParse(rawData)
  if (!validatedValues.success)
    return {
      isSuccess: false,
      message: MESSAGE_CODES.INVALID_ID,
    }

  // set tags to webmark
  const { data, error } = await setUserMarkTags({
    id: markId,
    userId: session.userId,
    tagIds: validatedValues.data,
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
    message: MESSAGE_CODES.CHANGE_MARK_TAGS_SUCCESS,
  }
}
