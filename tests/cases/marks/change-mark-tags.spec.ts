import { expect, test } from 'tests/fixtures/auth'
import { expectSubmitSuccess, submitForm } from 'tests/utils/formCases'
import { waitForHydration } from 'tests/utils/hydration'

import { TEST_IDS } from '@/shared/config/testids'
import { createRandomTag } from '@/test/factories/createRandomTag'

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

    await authorizedPage.goto('/')
    await waitForHydration(authorizedPage)

    const markItemBadge = authorizedPage.getByTestId(
      TEST_IDS.STATIC.MARK_ITEM_TAG_BADGE,
    )
    await test.step('mark item badge has corresponding tags', async () => {
      await expect(markItemBadge).toHaveText(tag.title)
      await expect(markItemBadge).not.toHaveText(anotherTag.title)
    })

    await test.step('open change mark tags dialog', async () => {
      await authorizedPage
        .getByTestId(TEST_IDS.CLICKABLE.BUTTON.MANAGE_MARK)
        .click()
      await authorizedPage
        .getByTestId(TEST_IDS.CLICKABLE.BUTTON.CHANGE_MARK_TAGS)
        .click()
      await expect(
        authorizedPage.getByTestId(TEST_IDS.STATIC.DIALOG),
      ).toBeVisible()
    })

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

    submitForm({
      page: authorizedPage,
      fields: {},
    })

    await expectSubmitSuccess(authorizedPage)

    await test.step('mark item badge has corresponding tags', async () => {
      await expect(markItemBadge).not.toHaveText(tag.title)
      await expect(markItemBadge).toHaveText(anotherTag.title)
    })
  })
})
