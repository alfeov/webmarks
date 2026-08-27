'use server'

import { createResult } from '@/shared/lib/createResult'
import { createSession } from '@/shared/lib/session'

import { validateSignupFormData } from '../lib/validation/validateSignupFormData'
import { createUser } from './createUser'

export async function signup(prevState: SignupFormState, formData: FormData) {
  // zod validation
  const { validatedData, errors, message } = validateSignupFormData(formData)
  if (!validatedData)
    return createResult({
      errors,
      message,
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
