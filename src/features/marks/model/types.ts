import { Prisma } from '@/shared/lib/prisma/generated/client'

export type WebMarkWithTags = Prisma.WebMarkGetPayload<{
  include: {
    tags: true
  }
}>

export interface CreateMark {
  title: string
  url: string
  description: string
  logoUrl: string
}

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
