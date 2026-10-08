'use server'

import { updateTag } from 'next/cache'

import { MESSAGE_CODES } from '@/shared/api/types'
import { verifySession } from '@/shared/lib/session'
import { validateFormData } from '@/shared/lib/utils/validateFormData'

import { EditAvatarFormSchema } from '../lib/EditAvatarFormSchema'
import type { EditAvatarFormState } from '../model/types'
import { updateUserAvatar } from './updateUserAvatar'

export async function editAvatarAction(
  prevState: EditAvatarFormState,
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
    EditAvatarFormSchema,
  )
  if (!validatedData)
    return {
      isSuccess: false,
      message: MESSAGE_CODES.VALIDATION_ERROR,
      errors: validationErrors,
    }

  // update avatarUrl in DB
  const { error } = await updateUserAvatar({
    id: session.userId,
    avatarUrl: validatedData.avatarUrl,
  })
  if (error)
    return {
      isSuccess: false,
      message: error,
    }

  // revalidation
  updateTag(`user-${session.userId}`)

  // return success response
  return {
    isSuccess: true,
    message: MESSAGE_CODES.AVATAR_EDIT_SUCCESS,
  }
}
