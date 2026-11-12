import { expect, type Page, test } from '@playwright/test'

import { TEST_IDS } from '@/shared/config/testids'

export const closeDialog = async (page: Page) => {
  await test.step('close dialog', async () => {
    await expect(page.getByTestId(TEST_IDS.STATIC.DIALOG)).toBeVisible()
    await page.getByTestId(TEST_IDS.CLICKABLE.BUTTON.CLOSE_DIALOG).click()
  })
}
