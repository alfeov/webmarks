import type { ActionFormStateWithErrors } from '@/shared/api/types'

export type SignupFormState = ActionFormStateWithErrors<{
  username?: string[]
  signupEmail?: string[]
  signupPassword?: string[]
  confirmPassword?: string[]
}>
