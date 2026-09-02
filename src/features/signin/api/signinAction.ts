'use server'

import { createSession } from '@/shared/lib/session'
import { createResult } from '@/shared/lib/utils/createResult'
import { validateFormData } from '@/shared/lib/utils/validateFormData'

import { SigninFormSchema } from '../lib/SigninFormSchema'
import type { SigninFormState } from '../model/types'
import { verifyUser } from './verifyUser'

export async function signinAction(
  prevState: SigninFormState,
  formData: FormData,
) {
  // zod validation
  const { validatedData, validationErrors } = validateFormData(
    formData,
    SigninFormSchema,
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
