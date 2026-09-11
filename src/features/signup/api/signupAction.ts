'use server'

import { createSession } from '@/shared/lib/session'
import { createResult } from '@/shared/lib/utils/createResult'
import { validateFormData } from '@/shared/lib/utils/validateFormData'

import { SignupFormSchema } from '../lib/SignupFormSchema'
import type { SignupFormState } from '../model/types'
import { createUser } from './createUser'

export async function signupAction(
  prevState: SignupFormState,
  formData: FormData,
) {
  // zod validation
  const { validatedData, validationErrors } = validateFormData(
    formData,
    SignupFormSchema,
  )
  if (!validatedData)
    return createResult({
      errors: validationErrors,
      message: 'Please fix the highlighted fields',
    })

  // hash password and create user in DB
  const { confirmPassword, ...restData } = validatedData
  const { user, error } = await createUser(restData)
  if (!user)
    return createResult({
      message: error,
    })

  // creation session
  await createSession({
    avatarUrl: user.avatarUrl,
    userId: user.id,
    username: user.username,
  })

  // return success response
  return createResult({
    isSuccess: true,
    message:
      'You have successfully create account: ' + (user.username ?? user.email),
  })
}
