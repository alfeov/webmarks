import { expect, test } from 'tests/fixtures/auth'
import { gotoAndWaitForHydration } from 'tests/utils/navigation'
import { openSidebar } from 'tests/utils/sidebar'

import { TEST_IDS } from '@/shared/config/testids'

test('MarksNotFoundMessage has corresponding design', async ({
  authorizedPage,
}) => {
  await gotoAndWaitForHydration(authorizedPage)

  const marksNotFoundMessage = authorizedPage.getByTestId(
    TEST_IDS.STATIC.MARKS_NOT_FOUND_MESSAGE,
  )

  await expect(marksNotFoundMessage).toBeVisible()
  await expect(marksNotFoundMessage).toHaveScreenshot()
})

test('TagsNotFoundMessage has corresponding design', async ({
  authorizedPage,
  isMobile,
}) => {
  await gotoAndWaitForHydration(authorizedPage)

  await openSidebar(authorizedPage, isMobile)

  const tagsNotFoundMessage = authorizedPage.getByTestId(
    TEST_IDS.STATIC.TAGS_NOT_FOUND_MESSAGE,
  )

  await expect(tagsNotFoundMessage).toBeVisible()
  await expect(tagsNotFoundMessage).toHaveScreenshot()
})
