import type { Page } from '@playwright/test'
import { expect, test } from 'tests/fixtures/auth'
import { gotoAndWaitForHydration } from 'tests/utils/navigation'

import { TEST_IDS } from '@/shared/config/testids'
import { routing } from '@/shared/i18n/routing'

const changeLocale = async (page: Page, locale: string) => {
  await test.step(`switch locale on ${locale}`, async () => {
    await page.getByTestId(TEST_IDS.CLICKABLE.BUTTON.PROFILE).click()
    await page.getByTestId(TEST_IDS.CLICKABLE.BUTTON.SWITCH_LOCALE).click()
    await page.getByTestId(TEST_IDS.CLICKABLE.BUTTON.LOCALE(locale)).click()
  })
}

test('should switch locale to each language and save path and search', async ({
  authorizedPage,
  tag,
}) => {
  const path = `/${tag.id}?keyword`
  await gotoAndWaitForHydration(authorizedPage, path)

  for (const locale of routing.locales) {
    await changeLocale(authorizedPage, locale)

    await test.step('url has new path', () =>
      expect(authorizedPage).toHaveURL(`${locale}${path}=`))
  }
})
