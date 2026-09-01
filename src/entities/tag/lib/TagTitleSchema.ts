import z from 'zod'

export const TagTitleSchema = z
  .string()
  .trim()
  .min(1, 'At least 1 characters')
  .max(15, 'Maximum 15 characters')
