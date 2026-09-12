import 'server-only'

const secretKey = process.env.SESSION_SECRET
export const encodedKey = new TextEncoder().encode(secretKey)

export const SESSION_COOKIE_KEY = 'webmarks-session'

export const saltOrRounds = 10
