import { ActionFormStateWithErrors } from '@/shared/api/types'

export type CreateTagFormState = ActionFormStateWithErrors<{
  title?: string[]
}>
