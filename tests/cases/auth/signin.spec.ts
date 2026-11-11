import { test } from 'tests/fixtures/auth'
import {
  expectSubmitError,
  expectSubmitSuccess,
  fillInputs,
  submitForm,
} from 'tests/utils/form'
import { gotoAndWaitForHydration } from 'tests/utils/navigation'

import { SIGNIN_FORM } from '@/features/signin/lib/constants'

test('should login to existing account, show toast and close dialog on creation', async ({
  page,
  user,
}) => {
  await gotoAndWaitForHydration(page)

  await fillInputs({
    page,
    fields: {
      [SIGNIN_FORM.EMAIL]: user.email,
      [SIGNIN_FORM.PASSWORD]: user.password,
    },
  })

  await submitForm({
    page,
    submitButton: page.getByRole('button', { name: /login/i }),
  })

  await expectSubmitSuccess(page)
})

test('should show corresponding error states', async ({ page }) => {
  await gotoAndWaitForHydration(page)

  await submitForm({
    page,
    submitButton: page.getByRole('button', { name: /login/i }),
  })

  await expectSubmitError({
    page,
    inputs: Object.values(SIGNIN_FORM),
  })
})
