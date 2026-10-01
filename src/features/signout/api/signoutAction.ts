'use server'

import 'server-only'

import type { Locale } from 'next-intl'

import { redirect } from '@/shared/i18n/navigation'
import { deleteSession } from '@/shared/lib/session'

export async function signoutAction(locale: Locale) {
  await deleteSession()

  redirect(
    {
      href: '/',
      locale,
    },
    'replace',
  )
}
