import z from 'zod'

export const MIN_TAG_TITLE_LENGTH = 1
export const MAX_TAG_TITLE_LENGTH = 15

export const TagTitleSchema = z
  .string()
  .trim()
  .min(MIN_TAG_TITLE_LENGTH, 'tagTitle.minLength')
  .max(MAX_TAG_TITLE_LENGTH, 'tagTitle.maxLength')
