import z from 'zod'

export const MarkDescriptionSchema = z
  .string()
  .trim()
  .min(10, 'At least 10 characters')
  .max(100, 'Maximum 100 characters')
