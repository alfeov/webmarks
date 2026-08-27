import z from 'zod'

import { CREATE_MARK_FORMDATA } from '../lib/constants'

export const MarkFormSchema = z.object({
  [CREATE_MARK_FORMDATA.TITLE]: z.string().min(3, 'At least 3 characters'),
  [CREATE_MARK_FORMDATA.URL]: z.url('Not correct URL'),
  [CREATE_MARK_FORMDATA.DESCRIPTION]: z
    .string()
    .min(10, 'At least 10 characters'),
  [CREATE_MARK_FORMDATA.LOGO_URL]: z.string().optional(),
})
