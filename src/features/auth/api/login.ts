'use server'

import { createResult } from '@/shared/lib/createResult'
import { createSession } from '@/shared/lib/session'

import { validateLoginFormData } from '../lib/validation/validateLoginFormData'
import { verifyUser } from './verifyUser'

export async function login(prevState: LoginFormState, formData: FormData) {
  // zod validation
  const { validatedData, errors, message } = validateLoginFormData(formData)
  if (!validatedData)
    return createResult({
      errors,
      message,
    })

  // finding user in db and compare password
  const { user, error } = await verifyUser(validatedData)
  if (!user)
    return createResult({
      message: error,
    })

  // create session
  await createSession({
    avatarUrl: user.avatarUrl,
    userId: user.id,
    username: user.username,
  })

  // return success response
  return createResult({
    isSuccess: true,
    message:
      'You have successfully enter to your account: ' +
      (user.username ?? user.email),
  })
}
