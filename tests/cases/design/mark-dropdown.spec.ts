import { expect, test } from 'tests/fixtures/auth'
import { gotoAndWaitForHydration } from 'tests/utils/navigation'

import { TEST_IDS } from '@/shared/config/testids'

test('MarkDropdownContent has corresponding design', async ({
  authorizedPage,
  webmark: _webmark,
}) => {
  await gotoAndWaitForHydration(authorizedPage)

  await authorizedPage
    .getByTestId(TEST_IDS.CLICKABLE.BUTTON.MANAGE_MARK)
    .click()

  const markDropdownContent = authorizedPage.getByTestId(
    TEST_IDS.STATIC.MARK_DROPDOWN_CONTENT,
  )

  await expect(markDropdownContent).toBeVisible()
  await expect(markDropdownContent).toHaveScreenshot()
})
