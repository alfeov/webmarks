import { expect, test } from 'tests/fixtures/auth'
import { gotoAndWaitForHydration } from 'tests/utils/navigation'
import { openSidebar } from 'tests/utils/sidebar'

import { TEST_IDS } from '@/shared/config/testids'

test('TagsWidget has corresponding design', async ({
  authorizedPage,
  tag: _tag,
  isMobile,
}) => {
  await gotoAndWaitForHydration(authorizedPage)

  await openSidebar(authorizedPage, isMobile)

  const tagsWidget = authorizedPage.getByTestId(TEST_IDS.STATIC.TAGS_WIDGET)

  await expect(tagsWidget).toBeVisible()
  await expect(tagsWidget).toHaveScreenshot()
})
