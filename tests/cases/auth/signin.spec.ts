import { test } from 'tests/fixtures/auth'
import {
  expectSubmitError,
  expectSubmitSuccess,
  submitForm,
} from 'tests/utils/form'
import { gotoAndWaitForHydration } from 'tests/utils/navigation'

import { SIGNIN_FORM } from '@/features/signin/lib/constants'

test.describe('signin', () => {
  test('should login to existing account, show toast and close dialog on creation', async ({
    page,
    user,
  }) => {
    await gotoAndWaitForHydration(page)

    await submitForm({
      fields: {
        [SIGNIN_FORM.EMAIL]: user.email,
        [SIGNIN_FORM.PASSWORD]: user.password,
      },
      page,
      submitButton: page.getByRole('button', { name: /login/i }),
    })

    await expectSubmitSuccess(page)
  })

  test('should show field errors and toast', async ({ page }) => {
    await gotoAndWaitForHydration(page)

    await submitForm({
      page,
      fields: {},
      submitButton: page.getByRole('button', { name: /login/i }),
    })

    await expectSubmitError(page, Object.values(SIGNIN_FORM))
  })
})
