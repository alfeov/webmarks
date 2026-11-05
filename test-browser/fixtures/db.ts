/* eslint-disable react-hooks/rules-of-hooks */
import { test as base } from '@playwright/test'
import bcrypt from 'bcrypt'

import type { User } from '@/shared/lib/prisma/generated/client'
import type { Tag } from '@/shared/lib/prisma/generated/client'
import { saltOrRounds } from '@/shared/lib/session/constants'
import { clearDatabase } from '@/test/factories/clearDatabase'
import { createRandomTag } from '@/test/factories/createRandomTag'
import { createRandomUser } from '@/test/factories/createRandomUser'

type Fixtures = {
  cleanDB: void
  user: User
  tag: Tag
}

export const test = base.extend<Fixtures>({
  cleanDB: [
    async ({}, use) => {
      await clearDatabase()
      await use()
    },
    { auto: true },
  ],
  user: async ({}, use) => {
    const password = 'TestPass123'
    const hashedPassword = await bcrypt.hash(password, saltOrRounds)

    const user = await createRandomUser({ password: hashedPassword })

    await use({
      ...user,
      password,
    })
  },
  tag: async ({ user }, use) => {
    const title = 'Tag'
    const tag = await createRandomTag(user.id, {
      title,
    })

    await use({
      ...tag,
      title,
    })
  },
})

export { expect } from '@playwright/test'
