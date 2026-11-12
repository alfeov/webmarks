import { expect, test } from 'tests/fixtures/base'
import { gotoAndWaitForHydration } from 'tests/utils/navigation'
import { openSidebar } from 'tests/utils/sidebar'

import { TEST_IDS } from '@/shared/config/testids'

import { closeDialog } from './(utils)/closeDialog'

test('MarksUnauthMessage has corresponding design', async ({ page }) => {
  await gotoAndWaitForHydration(page)

  await closeDialog(page)

  const marksUnauthMessage = page.getByTestId(
    TEST_IDS.STATIC.MARKS_UNAUTHORIZED_MESSAGE,
  )

  await expect(marksUnauthMessage).toBeVisible()
  await expect(marksUnauthMessage).toHaveScreenshot()
})

test('TagsUnauthMessage has corresponding design', async ({
  page,
  isMobile,
}) => {
  await gotoAndWaitForHydration(page)

  await closeDialog(page)

  await openSidebar(page, isMobile)

  const tagsUnauthMessage = page.getByTestId(
    TEST_IDS.STATIC.TAGS_UNAUTHORIZED_MESSAGE,
  )

  await expect(tagsUnauthMessage).toBeVisible()
  await expect(tagsUnauthMessage).toHaveScreenshot()
})
