import { test } from 'tests/fixtures/auth'
import {
  expectSubmitError,
  expectSubmitSuccess,
  submitForm,
} from 'tests/utils/formCases'

import { SIGNIN_FORM } from '@/features/signin/lib/constants'

test.describe('signin', () => {
  test('should login to existing account, show toast and close dialog on creation', async ({
    page,
    user,
  }) => {
    await page.goto('/')

    await submitForm({
      inputs: {
        [SIGNIN_FORM.EMAIL]: user.email,
        [SIGNIN_FORM.PASSWORD]: user.password,
      },
      page,
      submitButtonName: /login/i,
    })

    await expectSubmitSuccess(page)
  })

  test('should show field errors and toast', async ({ page }) => {
    await page.goto('/')

    await submitForm({
      page,
      inputs: {},
      submitButtonName: /login/i,
    })

    await expectSubmitError(page, Object.values(SIGNIN_FORM))
  })
})
