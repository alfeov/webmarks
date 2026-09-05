import 'server-only'

import { cacheLife } from 'next/cache'
import { cookies } from 'next/headers'

import { SESSION_COOKIE_KEY } from './constants'
import { decrypt, encrypt } from './crypto'
import type { SessionPayload } from './types'

export async function createSession(payload: SessionPayload) {
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  const session = await encrypt(payload)
  const cookieStore = await cookies()

  cookieStore.set(SESSION_COOKIE_KEY, session, {
    httpOnly: true,
    secure: true,
    expires,
    sameSite: 'lax',
    path: '/',
  })
}

export async function updateSession() {
  const session = (await cookies()).get(SESSION_COOKIE_KEY)?.value
  const payload = await decrypt(session)

  if (!session || !payload) {
    return null
  }

  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE_KEY, session, {
    httpOnly: true,
    secure: true,
    expires,
    sameSite: 'lax',
    path: '/',
  })
}

export async function deleteSession() {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE_KEY)
}

export async function verifySession() {
  'use cache: private'

  cacheLife('hours')

  const cookie = (await cookies()).get(SESSION_COOKIE_KEY)?.value
  const session = await decrypt(cookie)
  return session
}
