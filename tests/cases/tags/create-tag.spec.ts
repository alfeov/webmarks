import type { Page } from '@playwright/test'
import { expect, test } from 'tests/fixtures/auth'
import {
  expectSubmitError,
  expectSubmitSuccess,
  fillInputs,
  submitForm,
} from 'tests/utils/form'
import { gotoAndWaitForHydration } from 'tests/utils/navigation'
import { dialogScreenshot } from 'tests/utils/screenshot'
import { openSidebar } from 'tests/utils/sidebar'

import { CREATE_TAG_FORM } from '@/features/create-tag/lib/constants'
import { TEST_IDS } from '@/shared/config/testids'

import { NEW_TAG } from './(utils)/constants'

const openCreateTagDialog = async (page: Page) => {
  await test.step('open create tag dialog', async () => {
    await page.getByTestId(TEST_IDS.CLICKABLE.BUTTON.CREATE_TAG).click()
    await expect(page.getByTestId(TEST_IDS.STATIC.DIALOG)).toBeVisible()
  })
}

test.beforeEach(async ({ authorizedPage, isMobile }) => {
  await gotoAndWaitForHydration(authorizedPage)

  await openSidebar(authorizedPage, isMobile)
})

test('should create tag and show it in interface', async ({
  authorizedPage,
}) => {
  await test.step('tag list is empty', () =>
    expect(
      authorizedPage
        .getByTestId(TEST_IDS.STATIC.TAG_LIST)
        .getByRole('listitem'),
    ).toHaveCount(0))

  await openCreateTagDialog(authorizedPage)

  await dialogScreenshot(authorizedPage)

  await fillInputs({
    page: authorizedPage,
    fields: {
      [CREATE_TAG_FORM.TITLE]: NEW_TAG.TITLE,
    },
  })

  await submitForm({
    page: authorizedPage,
  })

  await expectSubmitSuccess(authorizedPage)

  await test.step('tag list has tag with corresponding title', () =>
    expect(
      authorizedPage
        .getByTestId(TEST_IDS.STATIC.TAG_LIST)
        .getByRole('listitem'),
    ).toHaveText(NEW_TAG.TITLE))
})

test('should show corresponding error states', async ({ authorizedPage }) => {
  await openCreateTagDialog(authorizedPage)

  await submitForm({
    page: authorizedPage,
  })

  await expectSubmitError({
    page: authorizedPage,
    inputs: Object.values(CREATE_TAG_FORM),
  })
})
