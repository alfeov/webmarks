import { Prisma } from '@/shared/lib/prisma/generated/client'

export type WebMarkWithTags = Prisma.WebMarkGetPayload<{
  include: {
    tags: true
  }
}>
