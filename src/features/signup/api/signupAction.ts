'use server'

import { MESSAGE_CODES } from '@/shared/api/types'
import { createSession } from '@/shared/lib/session'
import { validateFormData } from '@/shared/lib/utils/validateFormData'

import { SignupFormSchema } from '../lib/SignupFormSchema'
import type { SignupFormState } from '../model/types'
import { createUser } from './createUser'

export async function signupAction(_: SignupFormState, formData: FormData) {
  // zod validation
  const { validatedData, validationErrors } = validateFormData(
    formData,
    SignupFormSchema,
  )
  if (!validatedData)
    return {
      isSuccess: false,
      errors: validationErrors,
      message: MESSAGE_CODES.VALIDATION_ERROR,
    }

  // hash password and create user in DB
  const { confirmPassword, ...restUserData } = validatedData
  const { data: user, error } = await createUser(restUserData)
  if (!user)
    return {
      isSuccess: false,
      message: error,
    }

  // creation session
  await createSession({
    avatarUrl: user.avatarUrl,
    userId: user.id,
    username: user.username,
  })

  // return success response
  return {
    isSuccess: true,
    message: MESSAGE_CODES.SIGNUP_SUCCESS,
  }
}
