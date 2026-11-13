import { expect, test } from 'tests/fixtures/auth'
import { gotoAndWaitForHydration } from 'tests/utils/navigation'

import { TEST_IDS } from '@/shared/config/testids'

test('should follow to external link', async ({
  authorizedPage,
  webmark,
  context,
}) => {
  await gotoAndWaitForHydration(authorizedPage)

  const newPagePromise = context.waitForEvent('page')

  await test.step('click open mark link', async () => {
    await authorizedPage
      .getByTestId(TEST_IDS.CLICKABLE.BUTTON.MANAGE_MARK)
      .click()
    await authorizedPage.getByTestId(TEST_IDS.CLICKABLE.LINK.OPEN_MARK).click()
  })

  const newPage = await newPagePromise
  await newPage.waitForURL(webmark.url, { waitUntil: 'commit' })
  expect(newPage).toHaveURL(webmark.url)
})
