import type { ActionFormStateWithErrors } from '@/shared/api/types'

export type SigninFormState = ActionFormStateWithErrors<{
  email?: string[]
  password?: string[]
}>
