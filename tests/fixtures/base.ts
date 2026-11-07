/* eslint-disable react-hooks/rules-of-hooks */
import { test as base } from '@playwright/test'

// disable ViewTransition to prevent errors and test delay

export const test = base.extend({
  page: async ({ page }, use) => {
    await page.addInitScript(() => {
      // @ts-expect-error experimental API
      delete Document.prototype.startViewTransition
    })
    await use(page)
  },
})

export { expect } from '@playwright/test'
