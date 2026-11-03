import { type Page } from '@playwright/test'
import bcrypt from 'bcrypt'

import type { User } from '@/shared/lib/prisma/generated/client'
import {
  saltOrRounds,
  SESSION_COOKIE_KEY,
} from '@/shared/lib/session/constants'
import { encrypt } from '@/shared/lib/session/crypto'
import { createRandomUser } from '@/test/factories/createRandomUser'

import { test as dbTest } from './db'

type Fixtures = {
  user: User
  authorizedPage: Page
}

export const test = dbTest.extend<Fixtures>({
  user: [
    async ({}, use) => {
      const password = 'TestPass123'
      const hashedPassword = await bcrypt.hash(password, saltOrRounds)

      const user = await createRandomUser({ password: hashedPassword })

      await use({
        ...user,
        password,
      })
    },
    { auto: true },
  ],
  authorizedPage: async ({ page, user, baseURL }, use) => {
    const session = await encrypt({
      avatarUrl: user.avatarUrl,
      userId: user.id,
      username: user.username,
    })

    await page.context().addCookies([
      {
        name: SESSION_COOKIE_KEY,
        value: session,
        httpOnly: true,
        secure: true,
        sameSite: 'Lax',
        url: baseURL,
      },
    ])

    // eslint-disable-next-line react-hooks/rules-of-hooks
    await use(page)
  },
})

export { expect } from './db'
