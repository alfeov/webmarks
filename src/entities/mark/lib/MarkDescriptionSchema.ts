import z from 'zod'

export const MIN_MARK_DESC_LENGTH = 10
export const MAX_MARK_DESC_LENGTH = 200

export const MarkDescriptionSchema = z
  .string()
  .trim()
  .min(MIN_MARK_DESC_LENGTH, 'markDescription.minLength')
  .max(MAX_MARK_DESC_LENGTH, `markDescription.maxLength`)
