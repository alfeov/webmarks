import type { Page } from '@playwright/test'
import { expect, test } from 'tests/fixtures/auth'
import { gotoAndWaitForHydration } from 'tests/utils/navigation'
import {
  expectErrorToastToBeVisible,
  expectSuccessToastToBeVisible,
} from 'tests/utils/tooltip'

import { TEST_IDS } from '@/shared/config/testids'

test.use({
  permissions: ['clipboard-read', 'clipboard-write'],
  browserName: 'chromium',
})

const clickCopyMarkLinkButton = async (page: Page) => {
  await test.step('click copy mark link button', async () => {
    await page.getByTestId(TEST_IDS.CLICKABLE.BUTTON.MANAGE_MARK).click()
    await page.getByTestId(TEST_IDS.CLICKABLE.BUTTON.COPY_MARK_LINK).click()
  })
}

test('should copy mark link ', async ({ authorizedPage, webmark }) => {
  await gotoAndWaitForHydration(authorizedPage)

  await clickCopyMarkLinkButton(authorizedPage)

  await expectSuccessToastToBeVisible(authorizedPage)

  await test.step('clipboard text should be webmark url', async () => {
    const clipboardText = await authorizedPage.evaluate(() =>
      navigator.clipboard.readText(),
    )
    expect(clipboardText).toBe(webmark.url)
  })
})

test('should show error if browser does not support copy API', async ({
  authorizedPage,
  webmark: _webmark,
}) => {
  await authorizedPage.addInitScript(() => {
    Object.defineProperty(window.navigator, 'clipboard', {
      value: undefined,
    })
  })

  await gotoAndWaitForHydration(authorizedPage)

  await clickCopyMarkLinkButton(authorizedPage)

  await expectErrorToastToBeVisible(authorizedPage)
})
