'use server'

import { updateTag } from 'next/cache'

import { verifySession } from '@/shared/lib/session'
import { createResult } from '@/shared/lib/utils/createResult'
import { validateFormData } from '@/shared/lib/utils/validateFormData'

import { EditAvatarFormSchema } from '../lib/EditAvatarFormSchema'
import { EditAvatarFormState } from '../model/types'
import { updateUserAvatar } from './updateUserAvatar'

export async function editAvatarAction(
  prevState: EditAvatarFormState,
  formData: FormData,
) {
  // check auth
  const session = await verifySession()
  if (!session)
    return createResult({
      message: 'To edit avatar you must be auth',
    })

  // zod validation
  const { validatedData, validationErrors } = validateFormData(
    formData,
    EditAvatarFormSchema,
  )
  if (!validatedData)
    return createResult({
      message: 'Please fix highlighted fields',
      errors: validationErrors,
    })

  // update avatarUrl in DB
  const { error } = await updateUserAvatar({
    id: session.userId,
    avatarUrl: validatedData.avatarUrl,
  })
  if (error)
    return createResult({
      message: error,
    })

  // revalidation
  updateTag(`user-${session.userId}`)

  // return success response
  return createResult({
    isSuccess: true,
    message: 'Avatar has been successfully edited',
  })
}
