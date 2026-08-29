'use server'

import { createResult } from '@/shared/lib/createResult'
import { createSession } from '@/shared/lib/session'
import { validateFormData } from '@/shared/lib/validateFormData'

import { SignupFormSchema } from '../lib/validation/SignupFormSchema'
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
  const { user, error } = await createUser(validatedData)
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
