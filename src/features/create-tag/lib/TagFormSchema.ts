import z from 'zod'

import { TagTitleSchema } from '@/entities/tag/lib/TagTitleSchema'

import { TAG_FORMDATA } from './constants'

export const TagFormSchema = z.object({
  [TAG_FORMDATA.TITLE]: TagTitleSchema,
})
