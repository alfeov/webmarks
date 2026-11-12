import { expect, test } from 'tests/fixtures/auth'
import {
  expectSubmitError,
  expectSubmitSuccess,
  fillInputs,
  submitForm,
} from 'tests/utils/form'
import { gotoAndWaitForHydration } from 'tests/utils/navigation'
import { dialogScreenshot } from 'tests/utils/screenshot'

import { SIGNIN_FORM } from '@/features/signin/lib/constants'
import { TEST_IDS } from '@/shared/config/testids'

test.beforeEach(async ({ page }) => {
  await gotoAndWaitForHydration(page)

  await expect(page.getByTestId(TEST_IDS.STATIC.DIALOG)).toBeVisible()
})

test('should login to existing account, show toast and close dialog on creation', async ({
  page,
  user,
}) => {
  await dialogScreenshot(page)

  await fillInputs({
    page,
    fields: {
      [SIGNIN_FORM.EMAIL]: user.email,
      [SIGNIN_FORM.PASSWORD]: user.password,
    },
  })

  await submitForm({
    page,
    submitButton: page
      .getByTestId(TEST_IDS.CLICKABLE.BUTTON.SUBMIT)
      .filter({ hasText: /login/i }),
  })

  await expectSubmitSuccess(page)
})

test('should show corresponding error states', async ({ page }) => {
  await submitForm({
    page,
    submitButton: page
      .getByTestId(TEST_IDS.CLICKABLE.BUTTON.SUBMIT)
      .filter({ hasText: /login/i }),
  })

  await expectSubmitError({
    page,
    inputs: Object.values(SIGNIN_FORM),
  })
})
