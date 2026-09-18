import { WebMark } from '@/shared/lib/prisma/generated/client'

export type CreateMark = Partial<
  Pick<WebMark, 'title' | 'description' | 'url' | 'logoUrl'>
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

export type MetaData = CreateMark | null

export interface LoadMetaFormState {
  error: string | null
  metadata: MetaData
}
