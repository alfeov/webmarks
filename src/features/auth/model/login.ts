'use server'

import { flattenError } from 'zod'

import { LoginFormSchema } from './LoginFormSchema'

type FormState =
  | {
      errors?: {
        email?: string[]
        password?: string[]
      }
      message?: string
    }
  | undefined

export async function login(prevState: FormState, formData: FormData) {
  const { email, password } = Object.fromEntries(formData)

  const validatedFields = LoginFormSchema.safeParse({
    email,
    password,
  })

  if (!validatedFields.success) {
    return {
      errors: flattenError(validatedFields.error).fieldErrors,
    }
  }

  return undefined
}
