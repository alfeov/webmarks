import { test } from 'tests/fixtures/auth'
import {
  expectSubmitError,
  expectSubmitSuccess,
  submitForm,
} from 'tests/utils/formCases'
import { waitForHydration } from 'tests/utils/hydration'

import { SIGNIN_FORM } from '@/features/signin/lib/constants'

test.describe('signin', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await waitForHydration(page)
  })

  test('should login to existing account, show toast and close dialog on creation', async ({
    page,
    user,
  }) => {
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
    await submitForm({
      page,
      fields: {},
      submitButton: page.getByRole('button', { name: /login/i }),
    })

    await expectSubmitError(page, Object.values(SIGNIN_FORM))
  })
})
