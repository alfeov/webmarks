import type { Page } from '@playwright/test'
import { expect, test } from 'tests/fixtures/auth'
import {
  expectSubmitError,
  expectSubmitSuccess,
  submitForm,
} from 'tests/utils/form'
import { gotoAndWaitForHydration } from 'tests/utils/navigation'
import { dialogScreenshot } from 'tests/utils/screenshot'
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

test('should delete tag and remove it from sidebar', async ({
  authorizedPage,
  tag: _tag,
  isMobile,
}) => {
  await gotoAndWaitForHydration(authorizedPage)

  await openSidebar(authorizedPage, isMobile)

  await test.step('tag is in sidebar', () =>
    expect(
      authorizedPage
        .getByTestId(TEST_IDS.STATIC.TAG_LIST)
        .getByRole('listitem'),
    ).toHaveCount(1))

  await openDeleteTagDialog(authorizedPage)

  await dialogScreenshot(authorizedPage)

  await submitForm({
    page: authorizedPage,
  })

  await expectSubmitSuccess(authorizedPage)

  await test.step('tag is removed from sidebar', () =>
    expect(
      authorizedPage
        .getByTestId(TEST_IDS.STATIC.TAG_LIST)
        .getByRole('listitem'),
    ).toHaveCount(0))
})

test('should redirect to home page if on tag page', async ({
  authorizedPage,
  tag,
  baseURL,
  isMobile,
}) => {
  await gotoAndWaitForHydration(authorizedPage, `/${tag.id}`)

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
  tag,
  webmark,
  isMobile,
}) => {
  await gotoAndWaitForHydration(authorizedPage)

  await openSidebar(authorizedPage, isMobile)

  await test.step('mark item has tag badge', () =>
    expect(
      authorizedPage
        .getByTestId(TEST_IDS.STATIC.MARK_ITEM(webmark.id))
        .getByTestId(TEST_IDS.STATIC.MARK_ITEM_TAG_BADGE(tag.id)),
    ).toBeVisible())

  await openDeleteTagDialog(authorizedPage)

  await submitForm({
    page: authorizedPage,
  })

  await test.step('mark item has not tag badge', () =>
    expect(
      authorizedPage
        .getByTestId(TEST_IDS.STATIC.MARK_ITEM(webmark.id))
        .getByTestId(TEST_IDS.STATIC.MARK_ITEM_TAG_BADGE(tag.id)),
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
