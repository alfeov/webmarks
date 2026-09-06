import z from 'zod'

export const MarkTitleSchema = z
  .string()
  .trim()
  .min(3, 'At least 3 characters')
  .max(50, 'Maximum 50 characters')
