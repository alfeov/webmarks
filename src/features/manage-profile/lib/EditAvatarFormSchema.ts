import z from 'zod'

import { UrlOrEmptySchema } from '@/shared/lib/schemas/UrlOrEmptySchema'

import { EDIT_AVATAR_FORM } from './constants'

export const EditAvatarFormSchema = z.object({
  [EDIT_AVATAR_FORM.AVATAR_URL]: UrlOrEmptySchema,
})
