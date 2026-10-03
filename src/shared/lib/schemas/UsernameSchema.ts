import z from 'zod'

export const UsernameSchema = z
  .string()
  .regex(/^[a-zA-Z0-9_-]+$/, 'username.allowed')
  .min(5, 'username.min')
  .max(30, 'username.min')
