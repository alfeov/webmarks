import z from 'zod'

import { IdSchema } from '@/shared/lib/IdSchema'

import { CREATE_MARK_FORMDATA } from './constants'

export const MarkFormSchema = z.object({
  [CREATE_MARK_FORMDATA.TITLE]: z
    .string()
    .trim()
    .min(3, 'At least 3 characters'),
  [CREATE_MARK_FORMDATA.URL]: z.url('Not correct URL'),
  [CREATE_MARK_FORMDATA.DESCRIPTION]: z
    .string()
    .trim()
    .min(10, 'At least 10 characters'),
  [CREATE_MARK_FORMDATA.LOGO_URL]: z.url('Not correct URL').optional(),
  [CREATE_MARK_FORMDATA.DEFAULT_TAG_ID]: IdSchema.optional(),
})
