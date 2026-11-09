import type { Page } from '@playwright/test'
import { expect, test } from 'tests/fixtures/auth'
import {
  expectSubmitError,
  expectSubmitSuccess,
  fillInputs,
  submitForm,
} from 'tests/utils/form'
import { gotoAndWaitForHydration } from 'tests/utils/navigation'
import {
  expectFetchingIndicatorToBeHidden,
  expectSuccessToastToBeVisible,
} from 'tests/utils/tooltip'

import {
  CREATE_MARK_FORM,
  LOAD_META_FORM,
} from '@/features/create-mark/lib/constants'
import { TEST_IDS } from '@/shared/config/testids'

import { NEW_MARK } from './(utils)/constants'

test.use({
  permissions: ['clipboard-read', 'clipboard-write'],
  browserName: 'chromium',
})

const openCreateMarkDialog = async (page: Page) => {
  await test.step('open create mark dialog', async () => {
    await page.getByTestId(TEST_IDS.CLICKABLE.BUTTON.CREATE_MARK).click()
    await expect(page.getByTestId(TEST_IDS.STATIC.DIALOG)).toBeVisible()
  })
}

test('should create mark and show it in interface', async ({
  authorizedPage,
}) => {
  await gotoAndWaitForHydration(authorizedPage)

  await authorizedPage.evaluate(() =>
    navigator.clipboard.writeText('https://vitest.dev/'),
  )

  await openCreateMarkDialog(authorizedPage)

  await test.step('should paste url from clipboard', async () => {
    await authorizedPage.getByTestId(TEST_IDS.CLICKABLE.BUTTON.PASTE).click()

    await expect(
      authorizedPage.getByTestId(`${LOAD_META_FORM.URL}-input`),
    ).toHaveValue('https://vitest.dev/')
  })

  await test.step('should get meta by url on load button click', async () => {
    await submitForm({
      page: authorizedPage,
      submitButton: authorizedPage.getByTestId(TEST_IDS.CLICKABLE.BUTTON.LOAD),
    })

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

    await expectSuccessToastToBeVisible(authorizedPage)
    await expectFetchingIndicatorToBeHidden(authorizedPage)
  })

  await submitForm({
    page: authorizedPage,
  })

  await expectSubmitSuccess(authorizedPage)

  await test.step('show corresponding item on page', async () => {
    await expect(
      authorizedPage.getByTestId(TEST_IDS.STATIC.MARK_ITEM_TITLE),
    ).toHaveText('Vitest')
    await expect(
      authorizedPage.getByTestId(TEST_IDS.STATIC.MARK_ITEM_DESCRIPTION),
    ).toHaveText('Next generation testing framework powered by Vite')
    await expect(
      authorizedPage.getByTestId(TEST_IDS.STATIC.MARK_ITEM_URL),
    ).toHaveText('vitest.dev/')
  })
})

test('should show corresponding error states', async ({ authorizedPage }) => {
  await gotoAndWaitForHydration(authorizedPage)

  await openCreateMarkDialog(authorizedPage)

  await test.step('errors for load form', async () => {
    await submitForm({
      page: authorizedPage,
      submitButton: authorizedPage.getByTestId(TEST_IDS.CLICKABLE.BUTTON.LOAD),
    })

    await expectSubmitError({
      page: authorizedPage,
      inputs: Object.values(LOAD_META_FORM),
    })
  })

  await test.step('errors for create form', async () => {
    await authorizedPage
      .getByTestId(`${CREATE_MARK_FORM.LOGO_URL}-input`)
      .fill('error')

    await submitForm({ page: authorizedPage })

    await expectSubmitError({
      page: authorizedPage,
      inputs: Object.values(CREATE_MARK_FORM),
    })
  })
})

test('should create mark with corresponding tag if on tag page', async ({
  authorizedPage,
  tag,
}) => {
  await gotoAndWaitForHydration(authorizedPage, `/${tag.id}`)

  await openCreateMarkDialog(authorizedPage)

  await fillInputs({
    page: authorizedPage,
    fields: {
      [CREATE_MARK_FORM.URL]: NEW_MARK.URL,
      [CREATE_MARK_FORM.TITLE]: NEW_MARK.TITLE,
      [CREATE_MARK_FORM.DESCRIPTION]: NEW_MARK.DESCRIPTION,
      [CREATE_MARK_FORM.LOGO_URL]: NEW_MARK.LOGO_URL,
    },
  })

  await submitForm({ page: authorizedPage })

  await expectSubmitSuccess(authorizedPage)

  await test.step('show webmark with tag on page', async () => {
    await expect(
      authorizedPage.getByTestId(TEST_IDS.STATIC.MARK_ITEM_TAG_BADGE(tag.id)),
    ).toHaveText(tag.title)
  })
})
