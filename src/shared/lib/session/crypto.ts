import 'server-only'

import { jwtVerify, SignJWT } from 'jose'

import { encodedKey } from './constants'
import type { SessionPayload } from './types'

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
