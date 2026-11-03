import type { ActionFormStateWithErrors } from '@/shared/api/types'

export type SigninFormState = ActionFormStateWithErrors<{
  signinEmail?: string[]
  signinPassword?: string[]
}>
