import { expect, test } from 'tests/fixtures/auth'
import { gotoAndWaitForHydration } from 'tests/utils/navigation'
import { openSidebar } from 'tests/utils/sidebar'

import { TEST_IDS } from '@/shared/config/testids'

test('TagDropdownContent has corresponding design', async ({
  authorizedPage,
  isMobile,
  tag: _tag,
}) => {
  await gotoAndWaitForHydration(authorizedPage)

  await openSidebar(authorizedPage, isMobile)

  await authorizedPage.getByTestId(TEST_IDS.CLICKABLE.BUTTON.MANAGE_TAG).click()

  const tagDropdownContent = authorizedPage.getByTestId(
    TEST_IDS.STATIC.TAG_DROPDOWN_CONTENT,
  )

  await expect(tagDropdownContent).toBeVisible()
  await expect(tagDropdownContent).toHaveScreenshot()
})
