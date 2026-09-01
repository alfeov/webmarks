import z from 'zod'

export const UsernameSchema = z
  .string()
  .trim()
  .min(5, 'At least 5 characters')
  .max(30, 'Maximum 30 characters')
