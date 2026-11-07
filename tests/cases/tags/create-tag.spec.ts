import { expect, test } from 'tests/fixtures/auth'
import {
  expectSubmitError,
  expectSubmitSuccess,
  submitForm,
} from 'tests/utils/form'
import { gotoAndWaitForHydration } from 'tests/utils/navigation'
import { openSidebar } from 'tests/utils/sidebar'

import { CREATE_TAG_FORM } from '@/features/create-tag/lib/constants'
import { TEST_IDS } from '@/shared/config/testids'

test.describe('create-tag', () => {
  test.beforeEach(async ({ authorizedPage, isMobile }) => {
    await gotoAndWaitForHydration(authorizedPage)

    await openSidebar(authorizedPage, isMobile)

    await test.step('open create tag dialog', async () => {
      await authorizedPage
        .getByTestId(TEST_IDS.CLICKABLE.BUTTON.CREATE_TAG)
        .click()
      await expect(
        authorizedPage.getByTestId(TEST_IDS.STATIC.DIALOG),
      ).toBeVisible()
    })
  })

  test('should create tag and show it in interface', async ({
    authorizedPage,
  }) => {
    const title = 'Tag Title'
    await submitForm({
      page: authorizedPage,
      fields: {
        [CREATE_TAG_FORM.TITLE]: title,
      },
    })

    await expectSubmitSuccess(authorizedPage)

    await expect(
      authorizedPage.getByTestId(TEST_IDS.STATIC.TAG_ITEM),
    ).toHaveCount(1)
    await expect(
      authorizedPage.getByTestId(TEST_IDS.STATIC.TAG_ITEM),
    ).toHaveText(title)
  })

  test('should show corresponding error states', async ({ authorizedPage }) => {
    await submitForm({
      page: authorizedPage,
      fields: {},
    })

    await expectSubmitError(authorizedPage, Object.values(CREATE_TAG_FORM))
  })
})
