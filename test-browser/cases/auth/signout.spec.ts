import { expect, test } from 'tests/fixtures/auth'

import { TEST_IDS } from '@/shared/config/testids'

test('should logout from profile', async ({ authorizedPage }) => {
  await authorizedPage.goto('/')

  await expect(
    authorizedPage.getByText(/you must be authenticated/i),
  ).toHaveCount(0)

  await authorizedPage.getByTestId(TEST_IDS.CLICKABLE.BUTTON.PROFILE).click()

  await authorizedPage.getByTestId(TEST_IDS.CLICKABLE.BUTTON.LOGOUT).click()

  await expect(
    authorizedPage.getByText(/you must be authenticated/i),
  ).toHaveCount(2)
})
