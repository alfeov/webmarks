/* eslint-disable react-hooks/rules-of-hooks */
import { test as base } from '@playwright/test'

import { clearDatabase } from './db'

export const test = base.extend({
  page: async ({ page }, use) => {
    if (!process.env.DATABASE_URL?.includes('test')) {
      throw new Error('Refusal to perform cleanup non testing database')
    }
    await clearDatabase()
    await use(page)
  },
})

export { expect } from '@playwright/test'
