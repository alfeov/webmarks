import { ActionFormState } from '@/shared/api/types'

export type EditAvatarFormState = ActionFormState<{
  avatarUrl?: string[]
} | null>
