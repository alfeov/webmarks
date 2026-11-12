import { expect, test } from 'tests/fixtures/auth'
import { gotoAndWaitForHydration } from 'tests/utils/navigation'
import { openSidebar } from 'tests/utils/sidebar'

import { TEST_IDS } from '@/shared/config/testids'

test('TagItem has corresponding design', async ({
  authorizedPage,
  tag,
  isMobile,
}) => {
  await gotoAndWaitForHydration(authorizedPage)

  await openSidebar(authorizedPage, isMobile)

  const tagItem = authorizedPage.getByTestId(TEST_IDS.STATIC.TAG_ITEM(tag.id))

  await expect(tagItem).toBeVisible()
  await expect(tagItem).toHaveScreenshot()
})
