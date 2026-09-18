import z from 'zod'

export const MAX_MARK_DESC = 200

export const MarkDescriptionSchema = z
  .string()
  .trim()
  .min(10, 'At least 10 characters')
  .max(MAX_MARK_DESC, `Maximum ${MAX_MARK_DESC} characters`)
