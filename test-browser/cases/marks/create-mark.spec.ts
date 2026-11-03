import { expect, test } from 'tests/fixtures/auth'
import { expectSubmitSuccess } from 'tests/utils/formCases'

import {
  CREATE_MARK_FORM,
  LOAD_META_FORM,
} from '@/features/create-mark/lib/constants'
import { TEST_IDS } from '@/shared/config/testids'

test('should create mark and show it in interface', async ({
  authorizedPage,
}) => {
  await authorizedPage.goto('/')
  await authorizedPage
    .context()
    .grantPermissions(['clipboard-read', 'clipboard-write'])
  await authorizedPage.evaluate(() =>
    navigator.clipboard.writeText('https://vitest.dev/'),
  )

  await authorizedPage
    .getByTestId(TEST_IDS.CLICKABLE.BUTTON.CREATE_MARK)
    .click()
  expect(authorizedPage.getByTestId(TEST_IDS.STATIC.DIALOG)).toBeVisible()

  await test.step('should paste url from clipboard', async () => {
    await authorizedPage.getByTestId(TEST_IDS.CLICKABLE.BUTTON.PASTE).click()

    await expect(
      authorizedPage.getByTestId(`${LOAD_META_FORM.URL}-input`),
    ).toHaveValue('https://vitest.dev/')
  })

  await test.step('should get meta by url', async () => {
    await authorizedPage.getByTestId(TEST_IDS.CLICKABLE.BUTTON.LOAD).click()

    await test.step('should show fetching indicator', () =>
      expect(
        authorizedPage.getByTestId(TEST_IDS.STATIC.FETCHING_INDICATOR),
      ).toBeVisible())

    await test.step('inputs should have corresponding values', async () => {
      await expect(
        authorizedPage.getByTestId(`${CREATE_MARK_FORM.URL}-input`),
      ).toHaveValue('https://vitest.dev/', {
        timeout: 30_000,
      })
      await expect(
        authorizedPage.getByTestId(`${CREATE_MARK_FORM.TITLE}-input`),
      ).not.toBeEmpty()
      await expect(
        authorizedPage.getByTestId(`${CREATE_MARK_FORM.DESCRIPTION}-input`),
      ).not.toBeEmpty()
      await expect(
        authorizedPage.getByTestId(`${CREATE_MARK_FORM.LOGO_URL}-input`),
      ).not.toBeEmpty()
    })

    await test.step('show success toast', () =>
      expect(authorizedPage.getByText(/success!/i)).toBeVisible())
    await test.step('hide fetching indicator', () =>
      expect(
        authorizedPage.getByTestId(TEST_IDS.STATIC.FETCHING_INDICATOR),
      ).toBeHidden())
  })

  await authorizedPage.getByTestId(TEST_IDS.CLICKABLE.BUTTON.SUBMIT).click()

  await expectSubmitSuccess(authorizedPage)

  await test.step('show corresponding item on page', () =>
    expect(authorizedPage.getByTestId(TEST_IDS.STATIC.MARK_ITEM)).toHaveText(
      /vitest/i,
    ))
})
