import { SIGNUP_FORM } from '@/features/signup/lib/constants'
import { TEST_IDS } from '@/shared/config/testids'

import { expect, test } from '../fixtures'

test('should create new account, show toast and close dialog on creation', async ({
  page,
}) => {
  await page.goto('/')

  const dialog = page.getByRole('dialog')
  await dialog.getByRole('button', { name: /sign up/i }).click()

  const signupForm = page.getByTestId(TEST_IDS.STATIC.FORMS.SIGNUP)

  // fill inputs
  await signupForm
    .locator(`input[name="${SIGNUP_FORM.USERNAME}"]`)
    .fill('Username')
  await signupForm
    .locator(`input[name="${SIGNUP_FORM.EMAIL}"]`)
    .fill('username@gmail.com')
  await signupForm
    .locator(`input[name="${SIGNUP_FORM.PASSWORD}"]`)
    .fill('Password1')
  await signupForm
    .locator(`input[name="${SIGNUP_FORM.CONFIRM_PASSWORD}"]`)
    .fill('Password1')

  // click sign up btn
  await signupForm.getByRole('button', { name: /sign up/i }).click()

  // should show fetching indicator during loading
  const fetchingIndicator = page.getByTestId(TEST_IDS.STATIC.FETCHING_INDICATOR)
  await expect(fetchingIndicator).toBeVisible()

  // show toast
  await expect(page.getByText(/success!/i)).toBeVisible({
    timeout: 10_000,
  })
  // should unmount fetching indicator on success
  await expect(fetchingIndicator).toHaveCount(0)
  // should close dialog on success
  await expect(page.getByTestId(TEST_IDS.STATIC.DIALOG)).toHaveCount(0)
})
