import type { Page } from '@playwright/test'
import { expect, test } from 'tests/fixtures/auth'
import {
  expectSubmitError,
  expectSubmitSuccess,
  submitForm,
} from 'tests/utils/form'
import { gotoAndWaitForHydration } from 'tests/utils/navigation'

import { TEST_IDS } from '@/shared/config/testids'
import { prisma } from '@/shared/lib/prisma'

const openDeleteMarkTagsDialog = async (page: Page) => {
  await test.step('open delete mark tags dialog', async () => {
    await page.getByTestId(TEST_IDS.CLICKABLE.BUTTON.MANAGE_MARK).click()
    await page.getByTestId(TEST_IDS.CLICKABLE.BUTTON.DELETE_MARK).click()
    await expect(page.getByTestId(TEST_IDS.STATIC.DIALOG)).toBeVisible()
  })
}

test('should delete mark', async ({ authorizedPage, webmark }) => {
  await gotoAndWaitForHydration(authorizedPage)

  await test.step('mark item to be visible', () => {
    expect(
      authorizedPage.getByTestId(TEST_IDS.STATIC.MARK_ITEM(webmark.id)),
    ).toBeVisible()
  })

  await openDeleteMarkTagsDialog(authorizedPage)

  await submitForm({ page: authorizedPage })

  await expectSubmitSuccess(authorizedPage)

  await test.step('mark item to be hidden', () => {
    expect(
      authorizedPage.getByTestId(TEST_IDS.STATIC.MARK_ITEM(webmark.id)),
    ).toBeHidden()
  })
})
test('should show corresponding error states', async ({
  authorizedPage,
  webmark,
}) => {
  await gotoAndWaitForHydration(authorizedPage)

  await test.step('delete webmark from db to emulate error', () =>
    prisma.webMark.delete({
      where: {
        id: webmark.id,
      },
    }))

  await openDeleteMarkTagsDialog(authorizedPage)

  await submitForm({ page: authorizedPage })

  await expectSubmitError({
    page: authorizedPage,
  })
})
