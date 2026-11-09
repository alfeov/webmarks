import type { Page } from '@playwright/test'
import { expect, test } from 'tests/fixtures/auth'
import {
  expectSubmitError,
  expectSubmitSuccess,
  submitForm,
} from 'tests/utils/form'
import { gotoAndWaitForHydration } from 'tests/utils/navigation'
import { openSidebar } from 'tests/utils/sidebar'

import { TEST_IDS } from '@/shared/config/testids'
import { prisma } from '@/shared/lib/prisma'

const openDeleteTagDialog = async (page: Page) => {
  await test.step('open delete tag dialog', async () => {
    await page.getByTestId(TEST_IDS.CLICKABLE.BUTTON.MANAGE_TAG).click()
    await page.getByTestId(TEST_IDS.CLICKABLE.BUTTON.DELETE_TAG).click()
    await expect(page.getByTestId(TEST_IDS.STATIC.DIALOG)).toBeVisible()
  })
}

test('should delete tag and remove it from interface', async ({
  authorizedPage,
  tag,
  isMobile,
}) => {
  await gotoAndWaitForHydration(authorizedPage)

  await openSidebar(authorizedPage, isMobile)

  await test.step('tag list has tag', () =>
    expect(authorizedPage.getByTestId(TEST_IDS.STATIC.TAG_ITEM)).toHaveText(
      tag.title,
    ))

  await openDeleteTagDialog(authorizedPage)

  await submitForm({
    page: authorizedPage,
  })

  await expectSubmitSuccess(authorizedPage)

  await test.step('tag list is empty', () =>
    expect(authorizedPage.getByTestId(TEST_IDS.STATIC.TAG_ITEM)).toHaveCount(0))
})

test('should redirect to home page if on tag page', async ({
  authorizedPage,
  tag: _tag,
  baseURL,
  isMobile,
}) => {
  await gotoAndWaitForHydration(authorizedPage)

  await openSidebar(authorizedPage, isMobile)

  await openDeleteTagDialog(authorizedPage)

  await submitForm({
    page: authorizedPage,
  })

  await test.step('redirect to home page', () =>
    expect(authorizedPage).toHaveURL(baseURL ?? '/'))
})

test('should remove tag from webmark item on delete', async ({
  authorizedPage,
  tag: tag,
  webmark: _webmark,
  isMobile,
}) => {
  await gotoAndWaitForHydration(authorizedPage)

  await openSidebar(authorizedPage, isMobile)

  await test.step('mark tag list has tag', () =>
    expect(
      authorizedPage.getByTestId(TEST_IDS.STATIC.MARK_ITEM_TAG_BADGE),
    ).toHaveText(tag.title))

  await openDeleteTagDialog(authorizedPage)

  await submitForm({
    page: authorizedPage,
  })

  await test.step('mark tag list is empty', () =>
    expect(
      authorizedPage.getByTestId(TEST_IDS.STATIC.MARK_ITEM_TAG_BADGE),
    ).toBeHidden())
})

test('should show corresponding error states', async ({
  authorizedPage,
  tag,
  isMobile,
}) => {
  await gotoAndWaitForHydration(authorizedPage)

  await openSidebar(authorizedPage, isMobile)

  await test.step('delete tag from db to emulate error', () =>
    prisma.tag.delete({
      where: {
        id: tag.id,
      },
    }))

  await openDeleteTagDialog(authorizedPage)

  await submitForm({
    page: authorizedPage,
  })

  await expectSubmitError({ page: authorizedPage })
})
