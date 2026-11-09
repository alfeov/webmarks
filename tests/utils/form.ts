import type { Locator, Page } from '@playwright/test'
import { expect, test } from '@playwright/test'

import { TEST_IDS } from '@/shared/config/testids'

import {
  expectErrorToastToBeVisible,
  expectFetchingIndicatorToBeHidden,
  expectFetchingIndicatorToBeVisible,
  expectSuccessToastToBeVisible,
} from './tooltip'

interface FillInputsParams {
  page: Page
  fields: Record<string, string>
}

export const fillInputs = async ({ page, fields }: FillInputsParams) => {
  await test.step('fill inputs', async () => {
    for (const [name, value] of Object.entries(fields)) {
      await page.getByTestId(`${name}-input`).fill(value)
    }
  })
}

interface SubmitFormParams {
  page: Page
  submitButton?: Locator
}

export const submitForm = async ({ page, submitButton }: SubmitFormParams) => {
  await test.step('click submit form button', () =>
    submitButton
      ? submitButton.click()
      : page.getByTestId(TEST_IDS.CLICKABLE.BUTTON.SUBMIT).click())

  await expectFetchingIndicatorToBeVisible(page)
}

export const expectSubmitSuccess = async (page: Page) => {
  await test.step('close dialog', () =>
    expect(page.getByTestId(TEST_IDS.STATIC.DIALOG)).toBeHidden())

  await expectFetchingIndicatorToBeHidden(page)

  await expectSuccessToastToBeVisible(page)
}

interface ExpectSubmitErrorParams {
  page: Page
  inputs?: string[]
}

export const expectSubmitError = async ({
  page,
  inputs = [],
}: ExpectSubmitErrorParams) => {
  await expectFetchingIndicatorToBeHidden(page)

  await expectErrorToastToBeVisible(page)

  for (const input of inputs) {
    await test.step(`show error for ${input} input`, () =>
      expect(page.getByTestId(`${input}-error`)).toBeVisible())
  }
}
