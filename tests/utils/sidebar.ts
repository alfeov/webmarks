import { expect, type Page, test } from '@playwright/test'

import { TEST_IDS } from '@/shared/config/testids'

export async function openSidebar(page: Page, isMobile: boolean) {
  if (!isMobile) return

  await test.step('open sidebar on mobile', async () => {
    await page.getByTestId(TEST_IDS.CLICKABLE.BUTTON.TOGGLE_SIDEBAR).click()
    await expect(
      page.getByTestId(TEST_IDS.STATIC.SIDEBAR_CONTENT),
    ).toBeVisible()
  })
}

export async function closeSidebar(page: Page, isMobile: boolean) {
  if (!isMobile) return

  await test.step('close sidebar on mobile', async () => {
    await page.getByTestId(TEST_IDS.CLICKABLE.BUTTON.TOGGLE_SIDEBAR).click()
    await expect(page.getByTestId(TEST_IDS.STATIC.SIDEBAR_CONTENT)).toBeHidden()
  })
}
