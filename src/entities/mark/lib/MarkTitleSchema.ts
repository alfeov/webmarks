import z from 'zod'

export const MIN_MARK_TITLE_LENGTH = 3
export const MAX_MARK_TITLE_LENGTH = 50

export const MarkTitleSchema = z
  .string()
  .trim()
  .min(MIN_MARK_TITLE_LENGTH, 'markTitle.minLength')
  .max(MAX_MARK_TITLE_LENGTH, 'markTitle.maxLength')
