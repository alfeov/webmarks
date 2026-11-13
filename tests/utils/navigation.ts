import { expect, type Page } from '@playwright/test'

import { TEST_IDS } from '@/shared/config/testids'

export async function gotoAndWaitForHydration(page: Page, path: string = '/') {
  await page.goto(path)

  await expect(page.getByTestId(TEST_IDS.STATIC.SKELETON_FALLBACK)).toHaveCount(
    0,
  )
}
