import z from 'zod'

import { IdSchema } from '@/shared/lib/schemas/IdSchema'
import { UrlSchema } from '@/shared/lib/schemas/UrlSchema'

import { CREATE_MARK_FORMDATA } from './constants'

export const MarkFormSchema = z.object({
  [CREATE_MARK_FORMDATA.TITLE]: z
    .string()
    .trim()
    .min(3, 'At least 3 characters')
    .max(30, 'Maximum 30 characters'),
  [CREATE_MARK_FORMDATA.URL]: UrlSchema,
  [CREATE_MARK_FORMDATA.DESCRIPTION]: z
    .string()
    .trim()
    .min(10, 'At least 10 characters')
    .max(100, 'Maximum 100 characters'),
  [CREATE_MARK_FORMDATA.LOGO_URL]: UrlSchema.optional(),
  [CREATE_MARK_FORMDATA.DEFAULT_TAG_ID]: IdSchema.optional(),
})
