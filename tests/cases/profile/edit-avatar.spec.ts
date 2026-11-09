import type { Page } from '@playwright/test'
import { expect, test } from 'tests/fixtures/auth'
import { expectSubmitSuccess, fillInputs, submitForm } from 'tests/utils/form'
import { gotoAndWaitForHydration } from 'tests/utils/navigation'

import { EDIT_AVATAR_FORM } from '@/features/manage-profile/lib/constants'
import { TEST_IDS } from '@/shared/config/testids'

import { UPDATED_AVATAR } from './(utils)/constants'

const openEditProfileAvatarDialog = async (page: Page) => {
  await test.step('open edit profile avatar dialog', async () => {
    await page.getByTestId(TEST_IDS.CLICKABLE.BUTTON.PROFILE).click()
    await page.getByTestId(TEST_IDS.CLICKABLE.BUTTON.EDIT_AVATAR).click()
    await expect(page.getByTestId(TEST_IDS.STATIC.DIALOG)).toBeVisible()
  })
}

test('should edit profile avatar', async ({ authorizedPage, user }) => {
  await gotoAndWaitForHydration(authorizedPage)

  await test.step('profile avatar to have initial src', () =>
    expect(
      authorizedPage.getByTestId(TEST_IDS.STATIC.PROFILE_AVATAR),
    ).toHaveAttribute('src', user.avatarUrl ?? ''))

  await openEditProfileAvatarDialog(authorizedPage)

  await fillInputs({
    page: authorizedPage,
    fields: {
      [EDIT_AVATAR_FORM.AVATAR_URL]: UPDATED_AVATAR.AVATAR_URL,
    },
  })

  await submitForm({
    page: authorizedPage,
  })

  await expectSubmitSuccess(authorizedPage)

  await test.step('profile avatar to have new src', () =>
    expect(
      authorizedPage.getByTestId(TEST_IDS.STATIC.PROFILE_AVATAR),
    ).toHaveAttribute('src', UPDATED_AVATAR.AVATAR_URL))
})

test('should apply empty string as valid and show fallback avatar', async ({
  authorizedPage,
  user,
}) => {
  await gotoAndWaitForHydration(authorizedPage)

  await test.step('profile avatar fallback to be hidden', () =>
    expect(
      authorizedPage.getByTestId(TEST_IDS.STATIC.PROFILE_AVATAR_FALLBACK),
    ).toBeHidden())

  await openEditProfileAvatarDialog(authorizedPage)

  await fillInputs({
    page: authorizedPage,
    fields: {
      [EDIT_AVATAR_FORM.AVATAR_URL]: '',
    },
  })

  await submitForm({
    page: authorizedPage,
  })

  await expectSubmitSuccess(authorizedPage)

  await test.step('profile avatar fallback to have corresponding text', () =>
    expect(
      authorizedPage.getByTestId(TEST_IDS.STATIC.PROFILE_AVATAR_FALLBACK),
    ).toHaveText(user.username.charAt(0).toUpperCase()))
})
