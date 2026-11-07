import { expect, test } from 'tests/fixtures/auth'
import { gotoAndWaitForHydration } from 'tests/utils/navigation'

import { TEST_IDS } from '@/shared/config/testids'

test('should logout from profile', async ({ authorizedPage }) => {
  await gotoAndWaitForHydration(authorizedPage)

  await authorizedPage.getByTestId(TEST_IDS.CLICKABLE.BUTTON.PROFILE).click()

  await test.step('authorized buttons to be visible', async () => {
    await expect(
      authorizedPage.getByTestId(TEST_IDS.CLICKABLE.BUTTON.CHANGE_AVATAR),
    ).toBeVisible()
    await expect(
      authorizedPage.getByTestId(TEST_IDS.CLICKABLE.BUTTON.LOGOUT),
    ).toBeVisible()
  })

  await test.step('click signout button', async () => {
    await authorizedPage.getByTestId(TEST_IDS.CLICKABLE.BUTTON.LOGOUT).click()
  })

  await authorizedPage.getByTestId(TEST_IDS.CLICKABLE.BUTTON.PROFILE).click()

  await test.step('authorized buttons not to be visible', async () => {
    await expect(
      authorizedPage.getByTestId(TEST_IDS.CLICKABLE.BUTTON.CHANGE_AVATAR),
    ).toBeHidden()
    await expect(
      authorizedPage.getByTestId(TEST_IDS.CLICKABLE.BUTTON.LOGOUT),
    ).toBeHidden()
  })
})
