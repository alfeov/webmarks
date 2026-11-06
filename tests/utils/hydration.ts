import { expect, type Page } from '@playwright/test'

import { TEST_IDS } from '@/shared/config/testids'

export const waitForHydration = async (page: Page) => {
  await expect(page.getByTestId(TEST_IDS.STATIC.SKELETON_FALLBACK)).toBeHidden()
}
