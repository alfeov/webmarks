import { expect, test } from 'tests/fixtures/base'
import { gotoAndWaitForHydration } from 'tests/utils/navigation'

import type { Theme } from '@/features/toggle-theme/lib/useToggleTheme'
import { TEST_IDS } from '@/shared/config/testids'

test('set dark class on html if local storage theme is dark', async ({
  page,
}) => {
  await page.addInitScript(() => {
    window.localStorage.setItem(
      'webmarks/theme',
      JSON.stringify('dark' satisfies Theme),
    )
  })

  await gotoAndWaitForHydration(page)

  await test.step('html has dark class', () =>
    expect(page.getByTestId(TEST_IDS.STATIC.HTML)).toContainClass('dark'))
})

test('should not set dark theme if preferred light scheme (no-preference) and local storage is empty', async ({
  page,
}) => {
  await page.emulateMedia({ colorScheme: 'light' })

  await gotoAndWaitForHydration(page)

  await test.step('html has not dark class', () =>
    expect(page.getByTestId(TEST_IDS.STATIC.HTML)).not.toContainClass('dark'))
})

test('should set dark theme if preferred dark scheme and local storage is empty', async ({
  page,
}) => {
  await page.emulateMedia({ colorScheme: 'dark' })

  await gotoAndWaitForHydration(page)

  await test.step('html has dark class', () =>
    expect(page.getByTestId(TEST_IDS.STATIC.HTML)).toContainClass('dark'))
})
