import z from 'zod'

import { TagTitleSchema } from '@/entities/tag/lib/TagTitleSchema'

import { CREATE_TAG_FORMDATA } from './constants'

export const CreateTagFormSchema = z.object({
  [CREATE_TAG_FORMDATA.TITLE]: TagTitleSchema,
})
