import z from 'zod'

import { EmailSchema } from '@/shared/lib/schemas/EmailSchema'
import { PasswordSchema } from '@/shared/lib/schemas/PasswordSchema'
import { UsernameSchema } from '@/shared/lib/schemas/UsernameSchema'

import { SIGNUP_FORM } from './constants'

export const SignupFormSchema = z
  .object({
    [SIGNUP_FORM.USERNAME]: UsernameSchema,
    [SIGNUP_FORM.EMAIL]: EmailSchema,
    [SIGNUP_FORM.PASSWORD]: PasswordSchema,
    [SIGNUP_FORM.CONFIRM_PASSWORD]: z.string(),
  })
  .refine(
    (data) => data[SIGNUP_FORM.CONFIRM_PASSWORD] === data[SIGNUP_FORM.PASSWORD],
    {
      error: 'password.notMatch',
      path: ['confirmPassword'],
    },
  )
