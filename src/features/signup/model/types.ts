import type { ActionFormStateWithErrors } from '@/shared/api/types'

export type SignupFormState = ActionFormStateWithErrors<{
  username?: string[]
  email?: string[]
  password?: string[]
  confirmPassword?: string[]
}>
