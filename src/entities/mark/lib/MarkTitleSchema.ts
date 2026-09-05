import z from 'zod'

export const MarkTitleSchema = z
  .string()
  .trim()
  .min(3, 'At least 3 characters')
  .max(30, 'Maximum 30 characters')
