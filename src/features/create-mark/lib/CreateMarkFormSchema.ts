import z from 'zod'

import { MarkDescriptionSchema } from '@/entities/mark/lib/MarkDescriptionSchema'
import { MarkTitleSchema } from '@/entities/mark/lib/MarkTitleSchema'
import { UrlOrEmptySchema } from '@/shared/lib/schemas/UrlOrEmptySchema'
import { UrlSchema } from '@/shared/lib/schemas/UrlSchema'

import { CREATE_MARK_FORM } from './constants'

export const CreateMarkFormSchema = z.object({
  [CREATE_MARK_FORM.TITLE]: MarkTitleSchema,
  [CREATE_MARK_FORM.URL]: UrlSchema,
  [CREATE_MARK_FORM.DESCRIPTION]: MarkDescriptionSchema,
  [CREATE_MARK_FORM.LOGO_URL]: UrlOrEmptySchema,
})
