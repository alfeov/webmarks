import z from 'zod'

export const MarkTitleSchema = z
  .string()
  .trim()
  .min(3, 'markTitle.min')
  .max(50, 'markTitle.max')
