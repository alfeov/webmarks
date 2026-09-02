'use server'

import { redirect } from 'next/navigation'

import { deleteSession } from '@/shared/lib/session'

export async function signoutAction() {
  await deleteSession()

  redirect('/', 'replace')
}
