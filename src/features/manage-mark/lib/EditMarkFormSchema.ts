import z from 'zod'

import { MarkDescriptionSchema } from '@/entities/mark/lib/MarkDescriptionSchema'
import { MarkTitleSchema } from '@/entities/mark/lib/MarkTitleSchema'
import { UrlOrEmptySchema } from '@/shared/lib/schemas/UrlOrEmptySchema'
import { UrlSchema } from '@/shared/lib/schemas/UrlSchema'

import { EDIT_MARK_FORMDATA } from './constants'

export const EditMarkFormSchema = z.object({
  [EDIT_MARK_FORMDATA.TITLE]: MarkTitleSchema,
  [EDIT_MARK_FORMDATA.URL]: UrlSchema,
  [EDIT_MARK_FORMDATA.DESCRIPTION]: MarkDescriptionSchema,
  [EDIT_MARK_FORMDATA.LOGO_URL]: UrlOrEmptySchema,
})
