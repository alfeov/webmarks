'use server'

import { createResult } from '@/shared/lib/createResult'
import { createSession } from '@/shared/lib/session'
import { validateFormData } from '@/shared/lib/validateFormData'

import { LoginFormSchema } from '../lib/validation/LoginFormSchema'
import { verifyUser } from './verifyUser'

export async function loginAction(
  prevState: LoginFormState,
  formData: FormData,
) {
  // zod validation
  const { validatedData, validationErrors } = validateFormData(
    formData,
    LoginFormSchema,
  )
  if (!validatedData)
    return createResult({
      errors: validationErrors,
      message: 'Please fix the highlighted fields',
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
