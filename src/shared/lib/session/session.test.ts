import { cookies } from 'next/headers'

import { SESSION_COOKIE_KEY } from './constants'
import { decrypt, encrypt } from './crypto'
import {
  createSession,
  deleteSession,
  updateSession,
  verifySession,
} from './session'
import type { SessionPayload } from './types'

const payload: SessionPayload = {
  userId: '1',
  avatarUrl: 'https://url.com',
  username: 'username',
}

vi.mock('next/headers', () => ({
  cookies: vi.fn(),
}))

vi.mock('next/cache', () => ({
  cacheLife: vi.fn(),
}))

vi.mock('./crypto', { spy: true })

const cookieSettings = {
  httpOnly: true,
  secure: true,
  sameSite: 'lax',
  path: '/',
}

describe('session', () => {
  const setFn = vi.fn()
  const getFn = vi.fn()
  const deleteFn = vi.fn()

  beforeEach(() => {
    vi.mocked(cookies, { partial: true }).mockResolvedValue({
      set: setFn,
      get: getFn,
      delete: deleteFn,
    })
  })

  describe('createSession', () => {
    it('should encrypt payload and set session to cookie', async () => {
      await createSession(payload)

      expect(encrypt).toHaveBeenCalledOnce()
      expect(encrypt).toHaveBeenCalledWith(payload)
      expect(setFn).toHaveBeenCalledOnce()
      expect(setFn).toHaveBeenCalledWith(
        SESSION_COOKIE_KEY,
        expect.any(String),
        expect.objectContaining(cookieSettings),
      )
    })
  })
  describe('updateSession', () => {
    it('should return null when session or payload is falsy', async () => {
      const result = await updateSession()

      expect(result).toBeNull()
      expect(setFn).not.toHaveBeenCalled()
    })
    it('should decrypt payload and set session to cookie', async () => {
      vi.mocked(getFn).mockReturnValueOnce({ value: 'some-key' })
      vi.mocked(decrypt).mockResolvedValueOnce(payload)

      await updateSession()

      expect(decrypt).toHaveBeenCalledOnce()
      expect(setFn).toHaveBeenCalledOnce()
      expect(setFn).toHaveBeenCalledWith(
        SESSION_COOKIE_KEY,
        expect.any(String),
        expect.objectContaining(cookieSettings),
      )
    })
  })

  describe('deleteSession', () => {
    it('should clear cookie by key', async () => {
      await deleteSession()

      expect(deleteFn).toHaveBeenCalledWith(SESSION_COOKIE_KEY)
    })
  })
  describe('verifySession', () => {
    it('should return session if exists and null if not', async () => {
      expect(await verifySession()).toBeNull()

      vi.mocked(decrypt).mockResolvedValueOnce(payload)

      expect(await verifySession()).toMatchObject(payload)
    })
  })
})
