import z from 'zod'

import { MarkDescriptionSchema } from '@/entities/mark/lib/MarkDescriptionSchema'
import { MarkTitleSchema } from '@/entities/mark/lib/MarkTitleSchema'
import { IdSchema } from '@/shared/lib/schemas/IdSchema'
import { UrlSchema } from '@/shared/lib/schemas/UrlSchema'

import { CREATE_MARK_FORMDATA } from './constants'

export const CreateMarkFormSchema = z.object({
  [CREATE_MARK_FORMDATA.TITLE]: MarkTitleSchema,
  [CREATE_MARK_FORMDATA.URL]: UrlSchema,
  [CREATE_MARK_FORMDATA.DESCRIPTION]: MarkDescriptionSchema,
  [CREATE_MARK_FORMDATA.LOGO_URL]: UrlSchema.optional(),
  [CREATE_MARK_FORMDATA.DEFAULT_TAG_ID]: IdSchema.optional(),
})
