import z from 'zod'

import { MarkDescriptionSchema } from '@/entities/mark/lib/MarkDescriptionSchema'
import { MarkTitleSchema } from '@/entities/mark/lib/MarkTitleSchema'
import { UrlOrEmptySchema } from '@/shared/lib/schemas/UrlOrEmptySchema'
import { UrlSchema } from '@/shared/lib/schemas/UrlSchema'

import { EDIT_MARK_FORM } from './constants'

export const EditMarkFormSchema = z.object({
  [EDIT_MARK_FORM.URL]: UrlSchema,
  [EDIT_MARK_FORM.TITLE]: MarkTitleSchema,
  [EDIT_MARK_FORM.DESCRIPTION]: MarkDescriptionSchema,
  [EDIT_MARK_FORM.LOGO_URL]: UrlOrEmptySchema,
})
