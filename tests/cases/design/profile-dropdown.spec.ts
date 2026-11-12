import { expect, test } from 'tests/fixtures/auth'
import { gotoAndWaitForHydration } from 'tests/utils/navigation'

import { TEST_IDS } from '@/shared/config/testids'

import { closeDialog } from './(utils)/closeDialog'

test('ProfileDropdownContent has corresponding design (not auth)', async ({
  page,
}) => {
  await gotoAndWaitForHydration(page)

  await closeDialog(page)

  await page.getByTestId(TEST_IDS.CLICKABLE.BUTTON.PROFILE).click()

  const profileDropdownContent = page.getByTestId(
    TEST_IDS.STATIC.PROFILE_DROPDOWN_CONTENT,
  )

  await expect(profileDropdownContent).toBeVisible()
  await expect(profileDropdownContent).toHaveScreenshot()
})

test('ProfileDropdownContent has corresponding design (auth)', async ({
  authorizedPage,
}) => {
  await gotoAndWaitForHydration(authorizedPage)

  await authorizedPage.getByTestId(TEST_IDS.CLICKABLE.BUTTON.PROFILE).click()

  const profileDropdownContent = authorizedPage.getByTestId(
    TEST_IDS.STATIC.PROFILE_DROPDOWN_CONTENT,
  )

  await expect(profileDropdownContent).toBeVisible()
  await expect(profileDropdownContent).toHaveScreenshot()
})
