/* eslint-disable react-hooks/rules-of-hooks */
import { test as base } from '@playwright/test'

export const test = base.extend({
  page: async ({ page }, use) => {
    await page.addInitScript(() => {
      // @ts-expect-error disable ViewTransition to prevent errors and test delay
      delete Document.prototype.startViewTransition
    })
    await use(page)
  },
})

export { expect } from '@playwright/test'
