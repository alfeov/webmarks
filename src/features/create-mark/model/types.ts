import type { ActionFormStateWithErrors } from '@/shared/api/types'
import type { WebMark } from '@/shared/lib/prisma/generated/client'

export type CreateMark = Partial<
  Pick<WebMark, 'title' | 'description' | 'url' | 'logoUrl'>
>

export type CreateMarkFormState = ActionFormStateWithErrors<{
  title?: string[]
  url?: string[]
  description?: string[]
  logoUrl?: string[]
}>

export type MetaData = CreateMark | null

export type LoadMetaFormState = ActionFormStateWithErrors<{
  url?: string[]
}> & {
  data?: MetaData
}
