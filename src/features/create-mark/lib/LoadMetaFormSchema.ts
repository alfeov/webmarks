import z from 'zod'

import { UrlSchema } from '@/shared/lib/schemas/UrlSchema'

import { LOAD_META_FORM } from './constants'

export const LoadMetaFormSchema = z.object({
  [LOAD_META_FORM.URL]: UrlSchema,
})
