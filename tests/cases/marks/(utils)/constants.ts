import type { CREATE_MARK_FORM } from '@/features/create-mark/lib/constants'
import type { EDIT_MARK_FORM } from '@/features/manage-mark/lib/constants'

export const UPDATED_MARK: Record<keyof typeof EDIT_MARK_FORM, string> = {
  URL: 'https://new-url.com',
  TITLE: 'New Webmark Title',
  DESCRIPTION: 'Some new cool description',
  LOGO_URL: '',
}

export const NEW_MARK: Record<keyof typeof CREATE_MARK_FORM, string> = {
  URL: 'https://some-url.com',
  TITLE: 'webmark',
  DESCRIPTION: 'some webmark description',
  LOGO_URL: '',
}
