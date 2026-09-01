import z from 'zod'

import { IdSchema } from '@/shared/lib/IdSchema'

export const IdsSchema = z.array(IdSchema)
