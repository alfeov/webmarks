import type { Page } from '@playwright/test'
import { expect, test } from 'tests/fixtures/auth'
import {
  expectSubmitError,
  expectSubmitSuccess,
  fillInputs,
  submitForm,
} from 'tests/utils/form'
import { gotoAndWaitForHydration } from 'tests/utils/navigation'

import { EDIT_MARK_FORM } from '@/features/manage-mark/lib/constants'
import { TEST_IDS } from '@/shared/config/testids'

import { UPDATED_MARK } from './(utils)/constants'

const openEditMarkDialog = async (page: Page) => {
  await test.step('open edit mark dialog', async () => {
    await page.getByTestId(TEST_IDS.CLICKABLE.BUTTON.MANAGE_MARK).click()
    await page.getByTestId(TEST_IDS.CLICKABLE.BUTTON.EDIT_MARK).click()
    await expect(page.getByTestId(TEST_IDS.STATIC.DIALOG)).toBeVisible()
  })
}

test('should edit mark and show it in interface', async ({
  authorizedPage,
  webmark,
}) => {
  await gotoAndWaitForHydration(authorizedPage)

  await test.step('mark item to have values', async () => {
    await expect(
      authorizedPage.getByTestId(TEST_IDS.STATIC.MARK_ITEM_URL),
    ).toHaveText(webmark.url.split('://')[1])
    await expect(
      authorizedPage.getByTestId(TEST_IDS.STATIC.MARK_ITEM_TITLE),
    ).toHaveText(webmark.title)
    await expect(
      authorizedPage.getByTestId(TEST_IDS.STATIC.MARK_ITEM_DESCRIPTION),
    ).toHaveText(webmark.description)
  })

  await openEditMarkDialog(authorizedPage)

  await test.step('inputs have values from webmark', async () => {
    await expect(
      authorizedPage.getByTestId(`${EDIT_MARK_FORM.URL}-input`),
    ).toHaveValue(webmark.url)
    await expect(
      authorizedPage.getByTestId(`${EDIT_MARK_FORM.TITLE}-input`),
    ).toHaveValue(webmark.title)
    await expect(
      authorizedPage.getByTestId(`${EDIT_MARK_FORM.DESCRIPTION}-input`),
    ).toHaveValue(webmark.description)
    await expect(
      authorizedPage.getByTestId(`${EDIT_MARK_FORM.LOGO_URL}-input`),
    ).toHaveValue(webmark.logoUrl ?? '')
  })

  await fillInputs({
    page: authorizedPage,
    fields: {
      [EDIT_MARK_FORM.URL]: UPDATED_MARK.URL,
      [EDIT_MARK_FORM.TITLE]: UPDATED_MARK.TITLE,
      [EDIT_MARK_FORM.DESCRIPTION]: UPDATED_MARK.DESCRIPTION,
      [EDIT_MARK_FORM.LOGO_URL]: UPDATED_MARK.LOGO_URL,
    },
  })

  await submitForm({ page: authorizedPage })

  await expectSubmitSuccess(authorizedPage)

  await test.step('mark item to have new values', async () => {
    await expect(
      authorizedPage.getByTestId(TEST_IDS.STATIC.MARK_ITEM_URL),
    ).toHaveText(UPDATED_MARK.URL.split('://')[1])
    await expect(
      authorizedPage.getByTestId(TEST_IDS.STATIC.MARK_ITEM_TITLE),
    ).toHaveText(UPDATED_MARK.TITLE)
    await expect(
      authorizedPage.getByTestId(TEST_IDS.STATIC.MARK_ITEM_DESCRIPTION),
    ).toHaveText(UPDATED_MARK.DESCRIPTION)
  })
})

test('should show corresponding error states', async ({
  authorizedPage,
  webmark: _webmark,
}) => {
  await gotoAndWaitForHydration(authorizedPage)

  await openEditMarkDialog(authorizedPage)

  await fillInputs({
    page: authorizedPage,
    fields: {
      [EDIT_MARK_FORM.URL]: '',
      [EDIT_MARK_FORM.TITLE]: '',
      [EDIT_MARK_FORM.DESCRIPTION]: '',
      [EDIT_MARK_FORM.LOGO_URL]: 'error',
    },
  })

  await submitForm({ page: authorizedPage })

  await expectSubmitError({
    page: authorizedPage,
    inputs: Object.values(EDIT_MARK_FORM),
  })
})
