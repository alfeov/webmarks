import { spyOnConsoleError } from '@/test/vitest.setup'

import { decrypt, encrypt } from './crypto'
import type { SessionPayload } from './types'

const payload: SessionPayload = {
  userId: '1',
  avatarUrl: 'https://url.com',
  username: 'username',
}

describe('crypto', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe('decrypt', () => {
    it('should return payload on success', async () => {
      const token = await encrypt(payload)

      const result = await decrypt(token)

      expect(result).toMatchObject(payload)
    })
    it('should console error and return null when token is invalid', async () => {
      const result = await decrypt('invalid-token')

      expect(spyOnConsoleError).toHaveBeenCalledOnce()
      expect(result).toBeNull()
    })
    it('should console error and return null when token is expired', async () => {
      const token = await encrypt(payload)
      const now = Date.now()

      vi.setSystemTime(now + 7 * 24 * 60 * 60 * 999)

      const notExpiredResult = await decrypt(token)
      expect(notExpiredResult).toMatchObject(payload)
      expect(spyOnConsoleError).not.toHaveBeenCalled()

      vi.setSystemTime(now + 7 * 24 * 60 * 60 * 1000)

      const expiredResult = await decrypt(token)
      expect(expiredResult).toBeNull()
      expect(spyOnConsoleError).toHaveBeenCalledOnce()
    })
  })
})
