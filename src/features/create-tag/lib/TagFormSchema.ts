import z from 'zod'

import { TAG_FORMDATA } from './constants'

export const TagFormSchema = z.object({
  [TAG_FORMDATA.TITLE]: z.string().trim().min(3, 'At least 3 characters'),
})
