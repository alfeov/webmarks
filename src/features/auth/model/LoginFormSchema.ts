import z from 'zod'

import { PasswordSchema } from '@/shared/utils/PasswordSchema'

export const LoginFormSchema = z.object({
  email: z.email('Email is not correct'),
  password: PasswordSchema,
})
