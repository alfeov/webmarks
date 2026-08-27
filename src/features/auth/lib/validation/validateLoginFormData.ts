import { flattenError } from 'zod'

import { LOGIN_FORMDATA } from '../constants'
import { LoginFormSchema } from './LoginFormSchema'

export function validateLoginFormData(formData: FormData) {
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get(LOGIN_FORMDATA.EMAIL),
    password: formData.get(LOGIN_FORMDATA.PASSWORD),
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
