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

test.describe('delete-mark', () => {
  test('should delete mark', async ({ authorizedPage, webmark: _webmark }) => {
    await gotoAndWaitForHydration(authorizedPage)

    await test.step('mark item to be visible', () => {
      expect(
        authorizedPage.getByTestId(TEST_IDS.STATIC.MARK_ITEM),
      ).toBeVisible()
    })

    await openDeleteMarkTagsDialog(authorizedPage)

    await submitForm({ page: authorizedPage })

    await expectSubmitSuccess(authorizedPage)

    await test.step('mark item list to be empty', () => {
      expect(authorizedPage.getByTestId(TEST_IDS.STATIC.MARK_ITEM)).toHaveCount(
        0,
      )
    })
  })
  test('should show corresponding error states', async ({
    authorizedPage,
    webmark,
  }) => {
    await gotoAndWaitForHydration(authorizedPage)

    // delete webmark from db to emulate error
    await prisma.webMark.delete({
      where: {
        id: webmark.id,
      },
    })

    await openDeleteMarkTagsDialog(authorizedPage)

    await submitForm({ page: authorizedPage })

    await expectSubmitError({
      page: authorizedPage,
    })
  })
})
