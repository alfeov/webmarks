import z from 'zod'

import { PasswordSchema } from '@/shared/lib/schemas/PasswordSchema'

import { SIGNIN_FORMDATA } from './constants'

export const SigninFormSchema = z.object({
  [SIGNIN_FORMDATA.EMAIL]: z.email('email.invalid'),
  [SIGNIN_FORMDATA.PASSWORD]: PasswordSchema,
})
