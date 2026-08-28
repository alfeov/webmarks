import { Prisma } from '@/shared/lib/prisma/generated/client'
import { WebMarkCreateInput } from '@/shared/lib/prisma/generated/models'

export type WebMarkWithTags = Prisma.WebMarkGetPayload<{
  include: {
    tags: true
  }
}>

export type CreateMark = Pick<
  WebMarkCreateInput,
  'title' | 'description' | 'url' | 'logoUrl'
>

export interface CreateMarkFormState {
  isSuccess: boolean
  errors: {
    title?: string[]
    url?: string[]
    description?: string[]
    logoUrl?: string[]
  } | null
  message: string | null
}

export interface LoadMetaFormState {
  error: string | null
  data: CreateMark | null
}
