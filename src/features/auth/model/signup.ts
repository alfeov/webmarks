'use server'

import { flattenError } from 'zod'

import { SignupFormSchema } from './SignupFormSchema'

type FormState =
  | {
      errors?: {
        email?: string[]
        password?: string[]
        confirmPassword?: string[]
      }
      message?: string
    }
  | undefined

export async function signup(prevState: FormState, formData: FormData) {
  const { email, password, confirmPassword } = Object.fromEntries(formData)

  const validatedFields = SignupFormSchema.safeParse({
    email,
    password,
    confirmPassword,
  })

  if (!validatedFields.success) {
    return {
      errors: flattenError(validatedFields.error).fieldErrors,
    }
  }

  return undefined
}
