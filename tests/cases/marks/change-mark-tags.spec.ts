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
import { createRandomTag } from '@/test/factories/createRandomTag'

const openChangeMarkTagsDialog = async (page: Page) => {
  await test.step('open change mark tags dialog', async () => {
    await page.getByTestId(TEST_IDS.CLICKABLE.BUTTON.MANAGE_MARK).click()
    await page.getByTestId(TEST_IDS.CLICKABLE.BUTTON.CHANGE_MARK_TAGS).click()
    await expect(page.getByTestId(TEST_IDS.STATIC.DIALOG)).toBeVisible()
  })
}

test.describe('change-mark-tags', () => {
  test('should apply tags to mark and show in tag list checked tags if mark has tag', async ({
    authorizedPage,
    user,
    webmark: _webmark,
    tag,
  }) => {
    const anotherTagTitle = 'Another Tag'
    const anotherTag = await createRandomTag(user.id, {
      title: anotherTagTitle,
    })

    await gotoAndWaitForHydration(authorizedPage)

    const markItemBadge = authorizedPage.getByTestId(
      TEST_IDS.STATIC.MARK_ITEM_TAG_BADGE,
    )
    await test.step('mark item badge has corresponding tags', async () => {
      await expect(markItemBadge).toHaveText(tag.title)
      await expect(markItemBadge).not.toHaveText(anotherTag.title)
    })

    await openChangeMarkTagsDialog(authorizedPage)

    const tagCheckbox = authorizedPage.getByTestId(
      TEST_IDS.CHANGEABLE.INPUT.MARK_TAG_ITEM(tag.id),
    )
    const anotherTagCheckbox = authorizedPage.getByTestId(
      TEST_IDS.CHANGEABLE.INPUT.MARK_TAG_ITEM(anotherTag.id),
    )

    await test.step('checked/unchecked tags depends on mark', async () => {
      await expect(tagCheckbox).toBeChecked()
      await expect(anotherTagCheckbox).not.toBeChecked()
    })

    await test.step('toggle checkboxes', async () => {
      await tagCheckbox.click()
      await anotherTagCheckbox.click()
    })

    await submitForm({
      page: authorizedPage,
    })

    await expectSubmitSuccess(authorizedPage)

    await test.step('mark item badge has corresponding tags', async () => {
      await expect(markItemBadge).not.toHaveText(tag.title)
      await expect(markItemBadge).toHaveText(anotherTag.title)
    })
  })
  test('should show corresponding error states', async ({
    authorizedPage,
    tag,
    webmark: _webmark,
  }) => {
    await gotoAndWaitForHydration(authorizedPage)

    // delete tag from db to emulate error
    await prisma.tag.delete({
      where: {
        id: tag.id,
      },
    })

    await openChangeMarkTagsDialog(authorizedPage)

    await submitForm({
      page: authorizedPage,
    })

    await expectSubmitError({
      page: authorizedPage,
    })
  })
})
