import z from 'zod'

import { TagTitleSchema } from '@/entities/tag/lib/TagTitleSchema'

import { EDIT_TAG_FORM } from './constants'

export const EditTagFormSchema = z.object({
  [EDIT_TAG_FORM.TITLE]: TagTitleSchema,
})
