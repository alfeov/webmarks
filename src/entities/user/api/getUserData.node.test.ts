import { createRandomUser } from '@/test/factories/createRandomUser'

import type { SafeUserData } from '../lib/SafeUserData'
import { getUserData } from './getUserData'

describe('getUserData', () => {
  it('should return null when user not found', async () => {
    const result = await getUserData({ id: 'non-existent-id' })

    expect(result).toBeNull()
  })
  it('should return safe user data when user was found', async () => {
    const randomUser = await createRandomUser()
    const expectedUser: SafeUserData = {
      id: randomUser.id,
      username: randomUser.username,
      avatarUrl: randomUser.avatarUrl,
    }

    const result = await getUserData({ id: randomUser.id })

    expect(result).toEqual(expectedUser)
  })
})
