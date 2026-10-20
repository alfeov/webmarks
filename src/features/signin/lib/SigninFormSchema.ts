import z from 'zod'

import { EmailSchema } from '@/shared/lib/schemas/EmailSchema'
import { PasswordSchema } from '@/shared/lib/schemas/PasswordSchema'

import { SIGNIN_FORMDATA } from './constants'

export const SigninFormSchema = z.object({
  [SIGNIN_FORMDATA.EMAIL]: EmailSchema,
  [SIGNIN_FORMDATA.PASSWORD]: PasswordSchema,
})
