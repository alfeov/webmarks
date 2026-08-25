import 'server-only'

import { jwtVerify, SignJWT } from 'jose'
import { cookies } from 'next/headers'

import type { User } from '@/shared/lib/prisma/generated/client'

const secretKey = process.env.SESSION_SECRET
const encodedKey = new TextEncoder().encode(secretKey)

const SESSION_COOKIE_KEY = 'session'

type SessionPayload = {
  userId: User['id']
} & Pick<User, 'avatarUrl' | 'username'>

export const encrypt = async (payload: SessionPayload) =>
  new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedKey)

export const decrypt = async (jwt: string = '') => {
  try {
    const { payload } = await jwtVerify<SessionPayload>(jwt, encodedKey, {
      algorithms: ['HS256'],
    })
    return payload
  } catch (error) {
    console.error('Failed to verify session: ' + error)
    return null
  }
}

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
  const cookie = (await cookies()).get(SESSION_COOKIE_KEY)?.value
  const session = await decrypt(cookie)
  return session
}
