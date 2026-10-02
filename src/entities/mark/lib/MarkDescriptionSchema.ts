import z from 'zod'

export const MAX_MARK_DESC = 200

export const MarkDescriptionSchema = z
  .string()
  .trim()
  .min(10, 'markDescription.min')
  .max(MAX_MARK_DESC, `markDescription.max`)
