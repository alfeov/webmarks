import { expect, test } from '@playwright/test'

import { SIGNIN_FORM } from '@/features/signin/lib/constants'
import { SIGNUP_FORM } from '@/features/signup/lib/constants'
import { TEST_IDS } from '@/shared/config/testids'

test('should show signin dialog if user is not auth and ability to switch on signup', async ({
  page,
}) => {
  await page.goto('/')

  await expect(page.getByRole('dialog')).toBeVisible()

  const signinForm = page.getByTestId(TEST_IDS.STATIC.FORMS.SIGNIN)

  await expect(
    signinForm.locator(`input[name="${SIGNIN_FORM.EMAIL}"]`),
  ).toBeVisible()
  await expect(
    signinForm.locator(`input[name="${SIGNIN_FORM.PASSWORD}"]`),
  ).toBeVisible()
  await expect(signinForm.getByRole('button', { name: /login/i })).toBeVisible()

  await page.getByRole('button', { name: /sign up/i }).click()

  const signupForm = page.getByTestId(TEST_IDS.STATIC.FORMS.SIGNUP)

  await expect(
    signupForm.locator(`input[name="${SIGNUP_FORM.USERNAME}"]`),
  ).toBeVisible()
  await expect(
    signupForm.locator(`input[name="${SIGNUP_FORM.EMAIL}"]`),
  ).toBeVisible()
  await expect(
    signupForm.locator(`input[name="${SIGNUP_FORM.PASSWORD}"]`),
  ).toBeVisible()
  await expect(
    signupForm.locator(`input[name="${SIGNUP_FORM.CONFIRM_PASSWORD}"]`),
  ).toBeVisible()
  await expect(
    signupForm.getByRole('button', { name: /sign up/i }),
  ).toBeVisible()
})
