import { Tag } from '@/shared/lib/prisma/generated/client'
import { WebMarkCreateInput } from '@/shared/lib/prisma/generated/models'

export type CreateMark = Partial<
  Pick<WebMarkCreateInput, 'title' | 'description' | 'url' | 'logoUrl'> & {
    defaultTagId: Tag['id']
  }
>

export interface CreateMarkFormState {
  isSuccess: boolean
  errors: {
    title?: string[]
    url?: string[]
    description?: string[]
    logoUrl?: string[]
    defaultTagId?: string[]
  } | null
  message: string | null
}

export interface LoadMetaFormState {
  error: string | null
  data: Exclude<CreateMark, 'defaultTagId'> | null
}
