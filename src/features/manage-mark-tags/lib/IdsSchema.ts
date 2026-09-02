import z from 'zod'

import { IdSchema } from '@/shared/lib/schemas/IdSchema'

export const IdsSchema = z.array(IdSchema)
