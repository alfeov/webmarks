import { expect, test } from '@playwright/test'

import { SIGNIN_FORM } from '@/features/signin/lib/constants'
import { SIGNUP_FORM } from '@/features/signup/lib/constants'

test('should show signin dialog if user is not auth and ability to switch on signup', async ({
  page,
}) => {
  await page.goto('/')

  await expect(page.getByRole('dialog')).toBeVisible()

  await expect(page.getByTestId(`${SIGNIN_FORM.EMAIL}-input`)).toBeVisible()
  await expect(page.getByTestId(`${SIGNIN_FORM.PASSWORD}-input`)).toBeVisible()
  await expect(page.getByRole('button', { name: /login/i })).toBeVisible()

  await page.getByRole('button', { name: /sign up/i }).click()

  await expect(page.getByTestId(`${SIGNUP_FORM.USERNAME}-input`)).toBeVisible()
  await expect(page.getByTestId(`${SIGNUP_FORM.EMAIL}-input`)).toBeVisible()
  await expect(page.getByTestId(`${SIGNUP_FORM.PASSWORD}-input`)).toBeVisible()
  await expect(
    page.getByTestId(`${SIGNUP_FORM.CONFIRM_PASSWORD}-input`),
  ).toBeVisible()
  await expect(page.getByRole('button', { name: /sign up/i })).toBeVisible()
})
