/* eslint-disable react-hooks/rules-of-hooks */
import { type Page } from '@playwright/test'

import { SESSION_COOKIE_KEY } from '@/shared/lib/session/constants'
import { encrypt } from '@/shared/lib/session/crypto'

import { test as dbTest } from './db'

type Fixtures = {
  authorizedPage: Page
}

export const test = dbTest.extend<Fixtures>({
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

    await use(page)
  },
})

export { expect } from './db'
