import z from 'zod'

export const MIN_USERNAME_LENGTH = 5
export const MAX_USERNAME_LENGTH = 30

export const UsernameSchema = z
  .string()
  .regex(/^[a-zA-Z0-9_-]+$/, 'username.allowed')
  .min(MIN_USERNAME_LENGTH, 'username.minLength')
  .max(MAX_USERNAME_LENGTH, 'username.maxLength')
