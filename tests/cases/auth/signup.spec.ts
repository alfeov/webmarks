import { test } from 'tests/fixtures/db'
import {
  expectSubmitError,
  expectSubmitSuccess,
  fillInputs,
  submitForm,
} from 'tests/utils/form'
import { gotoAndWaitForHydration } from 'tests/utils/navigation'

import { SIGNUP_FORM } from '@/features/signup/lib/constants'

test.beforeEach(async ({ page }) => {
  await gotoAndWaitForHydration(page)

  const dialog = page.getByRole('dialog')
  await dialog.getByRole('button', { name: /sign up/i }).click()
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
    submitButton: page.getByRole('button', { name: /sign up/i }),
  })

  await expectSubmitSuccess(page)
})

test('should show field errors and toast', async ({ page }) => {
  await fillInputs({
    page,
    fields: {
      [SIGNUP_FORM.CONFIRM_PASSWORD]: 'not match',
    },
  })

  await submitForm({
    page,
    submitButton: page.getByRole('button', { name: /sign up/i }),
  })

  await expectSubmitError({ page, inputs: Object.values(SIGNUP_FORM) })
})
