import { expect, test } from 'tests/fixtures/auth'
import { gotoAndWaitForHydration } from 'tests/utils/navigation'

test('app in light (no-preference) theme has corresponding design', async ({
  authorizedPage,
  tag: _tag,
  webmark: _webmark,
}) => {
  await authorizedPage.emulateMedia({ colorScheme: 'light' })

  await gotoAndWaitForHydration(authorizedPage)

  await expect(authorizedPage).toHaveScreenshot()
})

test('app in dark theme has corresponding design', async ({
  authorizedPage,
  tag: _tag,
  webmark: _webmark,
}) => {
  await authorizedPage.emulateMedia({ colorScheme: 'dark' })

  await gotoAndWaitForHydration(authorizedPage)

  await expect(authorizedPage).toHaveScreenshot()
})
