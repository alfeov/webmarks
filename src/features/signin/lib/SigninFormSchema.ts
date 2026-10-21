import z from 'zod'

import { EmailSchema } from '@/shared/lib/schemas/EmailSchema'
import { PasswordSchema } from '@/shared/lib/schemas/PasswordSchema'

import { SIGNIN_FORM } from './constants'

export const SigninFormSchema = z.object({
  [SIGNIN_FORM.EMAIL]: EmailSchema,
  [SIGNIN_FORM.PASSWORD]: PasswordSchema,
})
