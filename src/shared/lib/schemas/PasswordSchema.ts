import z from 'zod'

export const MIN_PASSWORD_LENGTH = 8
export const MAX_PASSWORD_LENGTH = 72

export const PasswordSchema = z
  .string()
  .regex(/^[A-Za-z0-9]+$/, 'password.allowed')
  .regex(/[A-Z]/, 'password.capital')
  .regex(/[0-9]/, 'password.digit')
  .min(MIN_PASSWORD_LENGTH, 'password.min')
  .max(MAX_PASSWORD_LENGTH, 'password.max')
