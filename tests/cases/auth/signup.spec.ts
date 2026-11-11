import { expect, test } from 'tests/fixtures/db'
import {
  expectSubmitError,
  expectSubmitSuccess,
  fillInputs,
  submitForm,
} from 'tests/utils/form'
import { gotoAndWaitForHydration } from 'tests/utils/navigation'

import { SIGNUP_FORM } from '@/features/signup/lib/constants'
import { TEST_IDS } from '@/shared/config/testids'

test.beforeEach(async ({ page }) => {
  await gotoAndWaitForHydration(page)

  await test.step('expect dialog to be visible', () =>
    expect(page.getByTestId(TEST_IDS.STATIC.DIALOG)).toBeVisible())

  await test.step('toggle auth mode on signup', async () => {
    const toggleAuthModeButton = page.getByTestId(
      TEST_IDS.CLICKABLE.BUTTON.TOGGLE_AUTH_MODE,
    )
    await expect(toggleAuthModeButton).toHaveText(/sign up/i)
    await toggleAuthModeButton.click()
  })
})

test('should create new account, show toast and close dialog on creation', async ({
  page,
}) => {
  await fillInputs({
    page,
    fields: {
      [SIGNUP_FORM.USERNAME]: 'Username',
      [SIGNUP_FORM.EMAIL]: 'username@gmail.com',
      [SIGNUP_FORM.PASSWORD]: 'Password1',
      [SIGNUP_FORM.CONFIRM_PASSWORD]: 'Password1',
    },
  })

  await submitForm({
    page,
    submitButton: page
      .getByTestId(TEST_IDS.CLICKABLE.BUTTON.SUBMIT)
      .filter({ hasText: /sign up/i }),
  })

  await expectSubmitSuccess(page)
})

test('should show corresponding error states', async ({ page }) => {
  await fillInputs({
    page,
    fields: {
      [SIGNUP_FORM.CONFIRM_PASSWORD]: 'not match',
    },
  })

  await submitForm({
    page,
    submitButton: page
      .getByTestId(TEST_IDS.CLICKABLE.BUTTON.SUBMIT)
      .filter({ hasText: /sign up/i }),
  })

  await expectSubmitError({ page, inputs: Object.values(SIGNUP_FORM) })
})
