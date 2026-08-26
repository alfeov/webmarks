'use server'

import { redirect } from 'next/navigation'

import { deleteSession } from '../model/session'

export async function logout() {
  await deleteSession()

  redirect('/')
}
