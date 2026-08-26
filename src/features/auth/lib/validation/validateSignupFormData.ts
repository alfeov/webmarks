import { flattenError } from 'zod'

import { SIGNUP_FORMDATA } from '../constants'
import { SignupFormSchema } from './SignupFormSchema'

export function validateSignupFormData(formData: FormData) {
  const validatedFields = SignupFormSchema.safeParse({
    username: formData.get(SIGNUP_FORMDATA.USERNAME),
    email: formData.get(SIGNUP_FORMDATA.EMAIL),
    password: formData.get(SIGNUP_FORMDATA.PASSWORD),
    confirmPassword: formData.get(SIGNUP_FORMDATA.CONFIRM_PASSWORD),
  })
  if (!validatedFields.success)
    return {
      validatedData: null,
      errors: flattenError(validatedFields.error).fieldErrors,
      message: 'Please fix the highlighted fields',
    }
  return {
    validatedData: validatedFields.data,
    errors: null,
    message: null,
  }
}
