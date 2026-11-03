import { test as base } from '@playwright/test'

import { clearDatabase } from '@/test/factories/clearDatabase'

type Fixtures = {
  cleanDB: void
}

export const test = base.extend<Fixtures>({
  cleanDB: [
    async ({}, use) => {
      await clearDatabase()
      await use()
    },
    { auto: true },
  ],
})

export { expect } from '@playwright/test'
