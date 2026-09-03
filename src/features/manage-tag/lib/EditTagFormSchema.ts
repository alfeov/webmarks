import z from 'zod'

import { TagTitleSchema } from '@/entities/tag/lib/TagTitleSchema'
import { IdSchema } from '@/shared/lib/schemas/IdSchema'

import { EDIT_TAG_FORMDATA } from './constants'

export const EditTagFormSchema = z.object({
  [EDIT_TAG_FORMDATA.ID]: IdSchema,
  [EDIT_TAG_FORMDATA.TITLE]: TagTitleSchema,
})
