import { test } from 'tests/fixtures/db'
import {
  expectSubmitError,
  expectSubmitSuccess,
  submitForm,
} from 'tests/utils/formCases'
import { waitForHydration } from 'tests/utils/hydration'

import { SIGNUP_FORM } from '@/features/signup/lib/constants'

test.describe('signup', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await waitForHydration(page)

    const dialog = page.getByRole('dialog')
    await dialog.getByRole('button', { name: /sign up/i }).click()
  })

  test('should create new account, show toast and close dialog on creation', async ({
    page,
  }) => {
    await submitForm({
      page,
      fields: {
        [SIGNUP_FORM.USERNAME]: 'Username',
        [SIGNUP_FORM.EMAIL]: 'username@gmail.com',
        [SIGNUP_FORM.PASSWORD]: 'Password1',
        [SIGNUP_FORM.CONFIRM_PASSWORD]: 'Password1',
      },
      submitButton: page.getByRole('button', { name: /sign up/i }),
    })

    await expectSubmitSuccess(page)
  })
  test('should show field errors and toast', async ({ page }) => {
    await submitForm({
      page,
      fields: {
        [SIGNUP_FORM.CONFIRM_PASSWORD]: 'not match',
      },
      submitButton: page.getByRole('button', { name: /sign up/i }),
    })

    await expectSubmitError(page, Object.values(SIGNUP_FORM))
  })
})
