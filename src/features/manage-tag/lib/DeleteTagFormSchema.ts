import z from 'zod'

import { IdSchema } from '@/shared/lib/schemas/IdSchema'

import { DELETE_TAG_FORMDATA } from './constants'

export const DeleteTagFormSchema = z.object({
  [DELETE_TAG_FORMDATA.ID]: IdSchema,
  [DELETE_TAG_FORMDATA.REDIRECT]: z.stringbool(),
})
