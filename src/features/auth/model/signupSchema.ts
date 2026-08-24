import z from 'zod'

import { passwordSchema } from '@/shared/utils/passwordSchema'

export const signupSchema = z
  .object({
    email: z.email('Email is not correct'),
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.confirmPassword === data.password, {
    error: "Passwords don't match",
    path: ['confirmPassword'],
  })
