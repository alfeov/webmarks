import type {
  ActionFormState,
  ActionFormStateWithErrors,
} from '@/shared/api/types'

export type DeleteTagFormState = ActionFormState

export type EditTagFormState = ActionFormStateWithErrors<{
  title?: string[]
}>
