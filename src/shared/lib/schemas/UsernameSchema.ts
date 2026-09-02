import z from 'zod'

export const UsernameSchema = z
  .string()
  .regex(/^[a-zA-Z0-9_-]+$/, 'Only latin letters, numbers, _ and - allowed')
  .trim()
  .min(5, 'At least 5 characters')
  .max(30, 'Maximum 30 characters')
