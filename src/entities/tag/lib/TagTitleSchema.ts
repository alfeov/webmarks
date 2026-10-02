import z from 'zod'

export const TagTitleSchema = z
  .string()
  .trim()
  .min(1, 'tagTitle.min')
  .max(15, 'tagTitle.max')
