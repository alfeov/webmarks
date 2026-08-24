import z from 'zod'

import { PasswordSchema } from '@/shared/utils/PasswordSchema'

export const SignupFormSchema = z
  .object({
    email: z.email('Email is not correct'),
    password: PasswordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.confirmPassword === data.password, {
    error: "Passwords don't match",
    path: ['confirmPassword'],
  })
