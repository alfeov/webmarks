import type {
  ActionFormState,
  ActionFormStateWithErrors,
} from '@/shared/api/types'

export type ChangeMarkTagsFormState = ActionFormState

export type PinMarkFormState = ActionFormState

export type DeleteMarkFormState = ActionFormState

export type EditMarkFormState = ActionFormStateWithErrors<{
  title?: string[]
  url?: string[]
  description?: string[]
  logoUrl?: string[]
}>
