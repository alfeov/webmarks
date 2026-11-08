import type { CREATE_TAG_FORM } from '@/features/create-tag/lib/constants'
import type { EDIT_TAG_FORM } from '@/features/manage-tag/lib/constants'

export const NEW_TAG: Record<keyof typeof CREATE_TAG_FORM, string> = {
  TITLE: 'Tag Title',
}

export const UPDATED_TAG: Record<keyof typeof EDIT_TAG_FORM, string> = {
  TITLE: 'New Tag Title',
}
