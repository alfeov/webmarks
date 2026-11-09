import type { Page } from '@playwright/test'
import { expect, test } from 'tests/fixtures/auth'
import {
  expectSubmitError,
  expectSubmitSuccess,
  fillInputs,
  submitForm,
} from 'tests/utils/form'
import { gotoAndWaitForHydration } from 'tests/utils/navigation'
import { openSidebar } from 'tests/utils/sidebar'

import { EDIT_TAG_FORM } from '@/features/manage-tag/lib/constants'
import { TEST_IDS } from '@/shared/config/testids'

import { UPDATED_TAG } from './(utils)/constants'

const openEditTagDialog = async (page: Page) => {
  await test.step('open edit tag dialog', async () => {
    await page.getByTestId(TEST_IDS.CLICKABLE.BUTTON.MANAGE_TAG).click()
    await page.getByTestId(TEST_IDS.CLICKABLE.BUTTON.EDIT_TAG).click()
    await expect(page.getByTestId(TEST_IDS.STATIC.DIALOG)).toBeVisible()
  })
}

test('should edit tag and show it in interface', async ({
  authorizedPage,
  tag,
  isMobile,
}) => {
  await gotoAndWaitForHydration(authorizedPage)

  await openSidebar(authorizedPage, isMobile)

  await expect(authorizedPage.getByTestId(TEST_IDS.STATIC.TAG_ITEM)).toHaveText(
    tag.title,
  )

  await openEditTagDialog(authorizedPage)

  await fillInputs({
    page: authorizedPage,
    fields: {
      [EDIT_TAG_FORM.TITLE]: UPDATED_TAG.TITLE,
    },
  })

  await submitForm({
    page: authorizedPage,
  })

  await expectSubmitSuccess(authorizedPage)

  await test.step('tag list has corresponding items', async () => {
    await expect(
      authorizedPage.getByTestId(TEST_IDS.STATIC.TAG_ITEM),
    ).toHaveCount(1)
    await expect(
      authorizedPage.getByTestId(TEST_IDS.STATIC.TAG_ITEM),
    ).toHaveText(UPDATED_TAG.TITLE)
  })
})

test('should edit tag on webmark item tags', async ({
  authorizedPage,
  tag,
  webmark: _webmark,
  isMobile,
}) => {
  await gotoAndWaitForHydration(authorizedPage)

  await test.step('tag has initial title', () =>
    expect(
      authorizedPage.getByTestId(TEST_IDS.STATIC.MARK_ITEM_TAG_BADGE),
    ).toHaveText(tag.title))

  await openSidebar(authorizedPage, isMobile)

  await openEditTagDialog(authorizedPage)

  await fillInputs({
    page: authorizedPage,
    fields: {
      [EDIT_TAG_FORM.TITLE]: UPDATED_TAG.TITLE,
    },
  })

  await submitForm({
    page: authorizedPage,
  })

  await test.step('tag has new title', () =>
    expect(
      authorizedPage.getByTestId(TEST_IDS.STATIC.MARK_ITEM_TAG_BADGE),
    ).toHaveText(UPDATED_TAG.TITLE))
})

test('should show corresponding error states', async ({
  authorizedPage,
  tag: _tag,
  isMobile,
}) => {
  await gotoAndWaitForHydration(authorizedPage)

  await openSidebar(authorizedPage, isMobile)

  await openEditTagDialog(authorizedPage)

  await submitForm({
    page: authorizedPage,
  })

  await expectSubmitError({
    page: authorizedPage,
    inputs: Object.values(EDIT_TAG_FORM),
  })
})
