import type { Page } from '@playwright/test'
import { expect, test } from 'tests/fixtures/auth'
import { gotoAndWaitForHydration } from 'tests/utils/navigation'
import {
  expectFetchingIndicatorToBeHidden,
  expectFetchingIndicatorToBeVisible,
} from 'tests/utils/tooltip'

import { TEST_IDS } from '@/shared/config/testids'
import { prisma } from '@/shared/lib/prisma'
import type { WebMark } from '@/shared/lib/prisma/generated/client'
import { createRandomMark } from '@/test/factories/createRandomMark'

let webmark1: WebMark
let webmark2: WebMark

const clickPinMarkButton = async (page: Page, webmarkId: WebMark['id']) => {
  await test.step('click pin mark button', async () => {
    await page
      .getByTestId(TEST_IDS.STATIC.MARK_ITEM(webmarkId))
      .getByTestId(TEST_IDS.CLICKABLE.BUTTON.MANAGE_MARK)
      .click()
    await page.getByTestId(TEST_IDS.CLICKABLE.BUTTON.PIN_MARK).click()
  })
}

test.beforeEach(async ({ authorizedPage, user }) => {
  webmark1 = await createRandomMark(user.id)
  webmark2 = await createRandomMark(user.id)

  await gotoAndWaitForHydration(authorizedPage)

  await expect(
    authorizedPage.getByTestId(TEST_IDS.STATIC.MARK_LIST).getByRole('listitem'),
  ).toContainText([webmark2.title, webmark1.title])
})

test('should pin mark', async ({ authorizedPage }) => {
  await clickPinMarkButton(authorizedPage, webmark1.id)

  await expectFetchingIndicatorToBeVisible(authorizedPage)

  await test.step('marks order in list changed', () =>
    expect(
      authorizedPage
        .getByTestId(TEST_IDS.STATIC.MARK_LIST)
        .getByRole('listitem'),
    ).toContainText([webmark1.title, webmark2.title]))

  await expectFetchingIndicatorToBeHidden(authorizedPage)
})

test('should not pin mark on error', async ({ authorizedPage }) => {
  await prisma.webMark.delete({
    where: {
      id: webmark1.id,
    },
  })

  await clickPinMarkButton(authorizedPage, webmark1.id)

  await expectFetchingIndicatorToBeVisible(authorizedPage)
  await expectFetchingIndicatorToBeHidden(authorizedPage)

  await test.step('marks order in list does not changed', () =>
    expect(
      authorizedPage
        .getByTestId(TEST_IDS.STATIC.MARK_LIST)
        .getByRole('listitem'),
    ).toContainText([webmark2.title, webmark1.title]))
})
