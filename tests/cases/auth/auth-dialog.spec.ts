import { expect, test } from '@playwright/test'
import { gotoAndWaitForHydration } from 'tests/utils/navigation'

import { SIGNIN_FORM } from '@/features/signin/lib/constants'
import { SIGNUP_FORM } from '@/features/signup/lib/constants'
import { TEST_IDS } from '@/shared/config/testids'

test('should show signin dialog if user is not auth and ability to switch on signup', async ({
  page,
}) => {
  await gotoAndWaitForHydration(page)

  await test.step('auth dialog to be visible when not auth', () =>
    expect(page.getByTestId(TEST_IDS.STATIC.DIALOG)).toBeVisible())

  await test.step('login form elements to be visible', async () => {
    await expect(page.getByTestId(`${SIGNIN_FORM.EMAIL}-input`)).toBeVisible()
    await expect(
      page.getByTestId(`${SIGNIN_FORM.PASSWORD}-input`),
    ).toBeVisible()
    await expect(
      page
        .getByTestId(TEST_IDS.CLICKABLE.BUTTON.SUBMIT)
        .filter({ hasText: /login/i }),
    ).toBeVisible()
  })

  const toggleAuthModeButton = page.getByTestId(
    TEST_IDS.CLICKABLE.BUTTON.TOGGLE_AUTH_MODE,
  )

  await test.step('toggle auth mode on sign up', async () => {
    await expect(toggleAuthModeButton).toHaveText(/sign up/i)
    await toggleAuthModeButton.click()
  })

  await test.step('signup form elements to be visible', async () => {
    await expect(
      page.getByTestId(`${SIGNUP_FORM.USERNAME}-input`),
    ).toBeVisible()
    await expect(page.getByTestId(`${SIGNUP_FORM.EMAIL}-input`)).toBeVisible()
    await expect(
      page.getByTestId(`${SIGNUP_FORM.PASSWORD}-input`),
    ).toBeVisible()
    await expect(
      page.getByTestId(`${SIGNUP_FORM.CONFIRM_PASSWORD}-input`),
    ).toBeVisible()
    await expect(
      page
        .getByTestId(TEST_IDS.CLICKABLE.BUTTON.SUBMIT)
        .filter({ hasText: /sign up/i }),
    ).toBeVisible()
  })

  await test.step('toggle auth mode back to login', async () => {
    await expect(toggleAuthModeButton).toHaveText(/login/i)
    await toggleAuthModeButton.click()
  })

  await test.step('login element to be visible', () =>
    expect(
      page
        .getByTestId(TEST_IDS.CLICKABLE.BUTTON.SUBMIT)
        .filter({ hasText: /login/i }),
    ).toBeVisible())
})
