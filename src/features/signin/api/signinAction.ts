'use server'

import { SigninFormSchema } from '@/features/signin/lib/SigninFormSchema'
import type { SigninFormState } from '@/features/signin/model/types'
import { MESSAGE_CODES } from '@/shared/api/constants'
import { createSession } from '@/shared/lib/session'
import { validateFormData } from '@/shared/lib/utils/validateFormData'

import { verifyUser } from './verifyUser'

export async function signinAction(
  _prevState: SigninFormState,
  formData: FormData,
) {
  // zod validation
  const { validatedData, validationErrors } = validateFormData(
    formData,
    SigninFormSchema,
  )
  if (!validatedData)
    return {
      isSuccess: false,
      errors: validationErrors,
      message: MESSAGE_CODES.VALIDATION_ERROR,
    }

  // finding user in db and compare password
  const { data, error } = await verifyUser({
    email: validatedData.signinEmail,
    password: validatedData.signinPassword,
  })
  if (!data)
    return {
      isSuccess: false,
      message: error,
    }

  // create session
  await createSession({
    avatarUrl: data.avatarUrl,
    userId: data.id,
    username: data.username,
  })

  // return success response
  return {
    isSuccess: true,
    message: MESSAGE_CODES.SIGNIN_SUCCESS,
  }
}
