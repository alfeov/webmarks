import { expect, test } from 'tests/fixtures/auth'
import {
  expectSubmitError,
  expectSubmitSuccess,
  submitForm,
} from 'tests/utils/formCases'
import { waitForHydration } from 'tests/utils/hydration'

import {
  CREATE_MARK_FORM,
  LOAD_META_FORM,
} from '@/features/create-mark/lib/constants'
import { TEST_IDS } from '@/shared/config/testids'

test.use({
  permissions: ['clipboard-read', 'clipboard-write'],
  browserName: 'chromium',
})

test.describe('create-mark', () => {
  test('should create mark and show it in interface', async ({
    authorizedPage,
  }) => {
    await authorizedPage.goto('/')
    await waitForHydration(authorizedPage)

    await authorizedPage.evaluate(() =>
      navigator.clipboard.writeText('https://vitest.dev/'),
    )

    await authorizedPage
      .getByTestId(TEST_IDS.CLICKABLE.BUTTON.CREATE_MARK)
      .click()
    await expect(
      authorizedPage.getByTestId(TEST_IDS.STATIC.DIALOG),
    ).toBeVisible()

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

  test('should show corresponding error states', async ({ authorizedPage }) => {
    await authorizedPage.goto('/')
    await waitForHydration(authorizedPage)

    await authorizedPage
      .getByTestId(TEST_IDS.CLICKABLE.BUTTON.CREATE_MARK)
      .click()
    await expect(
      authorizedPage.getByTestId(TEST_IDS.STATIC.DIALOG),
    ).toBeVisible()

    await test.step('errors for load form', async () => {
      await submitForm({
        page: authorizedPage,
        fields: {},
        submitButton: authorizedPage.getByTestId(
          TEST_IDS.CLICKABLE.BUTTON.LOAD,
        ),
      })

      await expectSubmitError(authorizedPage, Object.values(LOAD_META_FORM))
    })

    await test.step('errors for create form', async () => {
      await submitForm({
        page: authorizedPage,
        fields: {
          [CREATE_MARK_FORM.LOGO_URL]: 'error',
        },
      })

      await expectSubmitError(authorizedPage, Object.values(CREATE_MARK_FORM))
    })
  })

  test('should create mark with corresponding tag if on tag page', async ({
    authorizedPage,
    tag,
  }) => {
    await authorizedPage.goto(`/${tag.id}`)
    await waitForHydration(authorizedPage)

    await authorizedPage
      .getByTestId(TEST_IDS.CLICKABLE.BUTTON.CREATE_MARK)
      .click()
    await expect(
      authorizedPage.getByTestId(TEST_IDS.STATIC.DIALOG),
    ).toBeVisible()

    const url = 'https://some-url.com'
    const title = 'webmark'
    const desc = 'some webmark description'
    await submitForm({
      page: authorizedPage,
      fields: {
        [CREATE_MARK_FORM.URL]: url,
        [CREATE_MARK_FORM.TITLE]: title,
        [CREATE_MARK_FORM.DESCRIPTION]: desc,
      },
    })

    await expectSubmitSuccess(authorizedPage)

    await test.step('show webmark with tag on page', async () => {
      await expect(
        authorizedPage.getByTestId(TEST_IDS.STATIC.MARK_ITEM_TAG_BADGE),
      ).toHaveText(tag.title)
    })
  })
})
