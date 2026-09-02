import z from 'zod'

import { PasswordSchema } from '@/shared/lib/schemas/PasswordSchema'
import { UsernameSchema } from '@/shared/lib/schemas/UsernameSchema'

import { SIGNUP_FORMDATA } from './constants'

export const SignupFormSchema = z
  .object({
    [SIGNUP_FORMDATA.USERNAME]: UsernameSchema,
    [SIGNUP_FORMDATA.EMAIL]: z.email('Email is not correct'),
    [SIGNUP_FORMDATA.PASSWORD]: PasswordSchema,
    [SIGNUP_FORMDATA.CONFIRM_PASSWORD]: z.string(),
  })
  .refine(
    (data) =>
      data[SIGNUP_FORMDATA.CONFIRM_PASSWORD] === data[SIGNUP_FORMDATA.PASSWORD],
    {
      error: "Passwords don't match",
      path: ['confirmPassword'],
    },
  )
