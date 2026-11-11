import { expect, test } from 'tests/fixtures/auth'
import { gotoAndWaitForHydration } from 'tests/utils/navigation'
import { openSidebar } from 'tests/utils/sidebar'

import { TEST_IDS } from '@/shared/config/testids'
import { createRandomMark } from '@/test/factories/createRandomMark'
import { createRandomTag } from '@/test/factories/createRandomTag'

test('should be instant on a client navigation', async ({
  authorizedPage,
  isMobile,
  user,
  tag,
  webmark,
}) => {
  const anotherTag = await createRandomTag(user.id, { title: 'Another Tag' })
  const anotherWebmark = await createRandomMark(user.id, anotherTag.id)

  await gotoAndWaitForHydration(authorizedPage, `/${tag.id}`)

  await test.step('webmark with current page tag to be visible', () =>
    expect(
      authorizedPage.getByTestId(TEST_IDS.STATIC.MARK_ITEM(webmark.id)),
    ).toBeVisible())

  await test.step('follow new tag link', async () => {
    await openSidebar(authorizedPage, isMobile)
    await authorizedPage
      .getByTestId(TEST_IDS.CLICKABLE.LINK.OPEN_TAG_PAGE(anotherTag.id))
      .click()
  })

  await test.step('instantly show items without suspense fallback', async () => {
    await expect(
      authorizedPage.getByTestId(TEST_IDS.STATIC.SKELETON_FALLBACK),
    ).toHaveCount(0, { timeout: 0 })
    await expect(
      authorizedPage.getByTestId(TEST_IDS.STATIC.MARK_ITEM(anotherWebmark.id)),
    ).toBeVisible({ timeout: 0 })
  })
})
