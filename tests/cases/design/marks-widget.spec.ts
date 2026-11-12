import { expect, test } from 'tests/fixtures/auth'
import { gotoAndWaitForHydration } from 'tests/utils/navigation'

import { TEST_IDS } from '@/shared/config/testids'

test('MarksWidget has corresponding design', async ({
  authorizedPage,
  tag: _tag,
  webmark: _webmark,
}) => {
  await gotoAndWaitForHydration(authorizedPage)

  const marksWidget = authorizedPage.getByTestId(TEST_IDS.STATIC.MARKS_WIDGET)

  await expect(marksWidget).toBeVisible()
  await expect(marksWidget).toHaveScreenshot()
})
