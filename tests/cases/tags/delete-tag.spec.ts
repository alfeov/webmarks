import { expect, test } from 'tests/fixtures/auth'
import {
  expectSubmitError,
  expectSubmitSuccess,
  submitForm,
} from 'tests/utils/formCases'
import { waitForHydration } from 'tests/utils/hydration'

import { TEST_IDS } from '@/shared/config/testids'
import { prisma } from '@/shared/lib/prisma'

test.describe('delete-tag', () => {
  test('should delete tag and remove it from interface', async ({
    authorizedPage,
    tag,
  }) => {
    await authorizedPage.goto('/')
    await waitForHydration(authorizedPage)

    await expect(
      authorizedPage.getByTestId(TEST_IDS.STATIC.TAG_ITEM),
    ).toHaveText(tag.title)

    await authorizedPage
      .getByTestId(TEST_IDS.CLICKABLE.BUTTON.MANAGE_TAG)
      .click()
    await authorizedPage
      .getByTestId(TEST_IDS.CLICKABLE.BUTTON.DELETE_TAG)
      .click()
    await expect(
      authorizedPage.getByTestId(TEST_IDS.STATIC.DIALOG),
    ).toBeVisible()

    await submitForm({
      page: authorizedPage,
      fields: {},
    })

    await expectSubmitSuccess(authorizedPage)

    await expect(
      authorizedPage.getByTestId(TEST_IDS.STATIC.TAG_ITEM),
    ).toHaveCount(0)
  })

  test('should redirect to home page if on tag page', async ({
    authorizedPage,
    tag,
  }) => {
    await authorizedPage.goto(`/${tag.id}`)
    await waitForHydration(authorizedPage)

    await authorizedPage
      .getByTestId(TEST_IDS.CLICKABLE.BUTTON.MANAGE_TAG)
      .click()
    await authorizedPage
      .getByTestId(TEST_IDS.CLICKABLE.BUTTON.DELETE_TAG)
      .click()
    await expect(
      authorizedPage.getByTestId(TEST_IDS.STATIC.DIALOG),
    ).toBeVisible()

    await submitForm({
      page: authorizedPage,
      fields: {},
    })

    await expect(authorizedPage).toHaveURL('/en')
  })

  test('should remove tag from webmark item on delete', async ({
    authorizedPage,
    tag,
    webmark,
  }) => {
    await authorizedPage.goto('/')
    await waitForHydration(authorizedPage)

    await expect(
      authorizedPage.getByTestId(TEST_IDS.STATIC.MARK_ITEM_TAG_BADGE),
    ).toHaveText(tag.title)

    await authorizedPage
      .getByTestId(TEST_IDS.CLICKABLE.BUTTON.MANAGE_TAG)
      .click()
    await authorizedPage
      .getByTestId(TEST_IDS.CLICKABLE.BUTTON.DELETE_TAG)
      .click()
    await expect(
      authorizedPage.getByTestId(TEST_IDS.STATIC.DIALOG),
    ).toBeVisible()

    await submitForm({
      page: authorizedPage,
      fields: {},
    })

    await expect(
      authorizedPage.getByTestId(TEST_IDS.STATIC.MARK_ITEM_TAG_BADGE),
    ).toBeHidden()
  })

  test('should show corresponding error', async ({ authorizedPage, tag }) => {
    await authorizedPage.goto('/')
    await waitForHydration(authorizedPage)

    await expect(
      authorizedPage.getByTestId(TEST_IDS.STATIC.TAG_ITEM),
    ).toHaveText(tag.title)

    // delete tag from db to emulate error
    await prisma.tag.delete({
      where: {
        id: tag.id,
      },
    })

    await authorizedPage
      .getByTestId(TEST_IDS.CLICKABLE.BUTTON.MANAGE_TAG)
      .click()
    await authorizedPage
      .getByTestId(TEST_IDS.CLICKABLE.BUTTON.DELETE_TAG)
      .click()
    await expect(
      authorizedPage.getByTestId(TEST_IDS.STATIC.DIALOG),
    ).toBeVisible()

    await submitForm({
      page: authorizedPage,
      fields: {},
    })

    await expectSubmitError(authorizedPage, [])
  })
})
