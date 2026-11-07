/* eslint-disable react-hooks/rules-of-hooks */
import bcrypt from 'bcrypt'

import type { Tag, User, WebMark } from '@/shared/lib/prisma/generated/client'
import { saltOrRounds } from '@/shared/lib/session/constants'
import { clearDatabase } from '@/test/factories/clearDatabase'
import { createRandomMark } from '@/test/factories/createRandomMark'
import { createRandomTag } from '@/test/factories/createRandomTag'
import { createRandomUser } from '@/test/factories/createRandomUser'

import { test as base } from './base'

type Fixtures = {
  cleanDB: void
  user: User
  tag: Tag
  webmark: WebMark
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
    const title = 'Tag Title'
    const tag = await createRandomTag(user.id, {
      title,
    })

    await use(tag)
  },
  webmark: async ({ user, tag }, use) => {
    const title = 'WebMark'
    const webmark = await createRandomMark(user.id, tag.id, {
      title,
    })

    await use(webmark)
  },
})

export { expect } from './base'
