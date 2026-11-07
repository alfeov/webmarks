import type { EDIT_MARK_FORM } from '@/features/manage-mark/lib/constants'

export const UPDATED_MARK: Record<keyof typeof EDIT_MARK_FORM, string> = {
  URL: 'https://new-url.com',
  TITLE: 'New Webmark Title',
  DESCRIPTION: 'Some new cool description',
  LOGO_URL: '',
}
