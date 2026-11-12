import { expect, type Page, test } from '@playwright/test'

import { TEST_IDS } from '@/shared/config/testids'

export async function dialogScreenshot(page: Page) {
  await test.step('dialog has stable design', () =>
    expect(page.getByTestId(TEST_IDS.STATIC.DIALOG)).toHaveScreenshot())
}
