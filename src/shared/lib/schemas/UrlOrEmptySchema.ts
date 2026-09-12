import z from 'zod'

import { UrlSchema } from './UrlSchema'

export const UrlOrEmptySchema = UrlSchema.trim()
  .or(z.literal(''))
  .transform((value) => (value === '' ? null : value))
