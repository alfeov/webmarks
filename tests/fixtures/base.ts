/* eslint-disable react-hooks/rules-of-hooks */
import { type Page, test as base } from '@playwright/test'

type Fixtures = {
  page: Page
}

export const test = base.extend<Fixtures>({
  page: async ({ page }, use) => {
    await page.addInitScript(() => {
      // @ts-expect-error disable ViewTransition to prevent errors and test delay
      delete Document.prototype.startViewTransition
    })
    await use(page)
  },
})

export { expect } from '@playwright/test'
