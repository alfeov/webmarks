import z from 'zod'

import { TagTitleSchema } from '@/entities/tag/lib/TagTitleSchema'

import { CREATE_TAG_FORM } from './constants'

export const CreateTagFormSchema = z.object({
  [CREATE_TAG_FORM.TITLE]: TagTitleSchema,
})
