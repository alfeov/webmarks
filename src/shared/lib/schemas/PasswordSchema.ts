import z from 'zod'

export const PasswordSchema = z
  .string()
  .regex(/^[A-Za-z0-9]+$/, 'password.allowed')
  .regex(/[A-Z]/, 'password.capital')
  .regex(/[0-9]/, 'password.digit')
  .min(8, 'password.min')
  .max(72, 'password.max')
