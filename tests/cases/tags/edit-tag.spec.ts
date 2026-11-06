import { expect, test } from 'tests/fixtures/auth'
import {
  expectSubmitError,
  expectSubmitSuccess,
  submitForm,
} from 'tests/utils/formCases'
import { waitForHydration } from 'tests/utils/hydration'

import { EDIT_TAG_FORM } from '@/features/manage-tag/lib/constants'
import { TEST_IDS } from '@/shared/config/testids'

test.describe('edit-tag', () => {
  test('should edit tag and show it in interface', async ({
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
    await authorizedPage.getByTestId(TEST_IDS.CLICKABLE.BUTTON.EDIT_TAG).click()
    await expect(
      authorizedPage.getByTestId(TEST_IDS.STATIC.DIALOG),
    ).toBeVisible()

    const newTitle = 'New Tag Title'
    await submitForm({
      page: authorizedPage,
      fields: {
        [EDIT_TAG_FORM.TITLE]: newTitle,
      },
    })

    await expectSubmitSuccess(authorizedPage)

    await expect(
      authorizedPage.getByTestId(TEST_IDS.STATIC.TAG_ITEM),
    ).toHaveCount(1)
    await expect(
      authorizedPage.getByTestId(TEST_IDS.STATIC.TAG_ITEM),
    ).toHaveText(newTitle)
  })

  test('should edit tag on webmark item tags', async ({
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
    await authorizedPage.getByTestId(TEST_IDS.CLICKABLE.BUTTON.EDIT_TAG).click()
    await expect(
      authorizedPage.getByTestId(TEST_IDS.STATIC.DIALOG),
    ).toBeVisible()

    const newTitle = 'New Tag Title'
    await submitForm({
      page: authorizedPage,
      fields: {
        [EDIT_TAG_FORM.TITLE]: newTitle,
      },
    })

    await expect(
      authorizedPage.getByTestId(TEST_IDS.STATIC.MARK_ITEM_TAG_BADGE),
    ).toHaveText(newTitle)
  })

  test('should show corresponding error states', async ({
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
    await authorizedPage.getByTestId(TEST_IDS.CLICKABLE.BUTTON.EDIT_TAG).click()
    await expect(
      authorizedPage.getByTestId(TEST_IDS.STATIC.DIALOG),
    ).toBeVisible()

    await submitForm({
      page: authorizedPage,
      fields: {},
    })

    await expectSubmitError(authorizedPage, Object.values(EDIT_TAG_FORM))
  })
})
