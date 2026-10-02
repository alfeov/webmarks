import type { ActionFormState } from '@/shared/api/types'
import type { WebMark } from '@/shared/lib/prisma/generated/client'

export type CreateMark = Partial<
  Pick<WebMark, 'title' | 'description' | 'url' | 'logoUrl'>
>

export type CreateMarkFormState = ActionFormState<{
  title?: string[]
  url?: string[]
  description?: string[]
  logoUrl?: string[]
}>

export type MetaData = CreateMark | null

export type LoadMetaFormState = ActionFormState<{ url?: string[] }> & {
  data?: MetaData
}
