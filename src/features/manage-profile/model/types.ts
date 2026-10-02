import { ActionFormStateWithErrors } from '@/shared/api/types'

export type EditAvatarFormState = ActionFormStateWithErrors<{
  avatarUrl?: string[]
} | null>
