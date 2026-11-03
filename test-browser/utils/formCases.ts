import type { Page } from '@playwright/test'
import { expect, test } from '@playwright/test'

import { TEST_IDS } from '@/shared/config/testids'

interface SubmitFormParams {
  page: Page
  inputs: Record<string, string>
  submitButtonName: string | RegExp
}

export const submitForm = async ({
  page,
  inputs,
  submitButtonName,
}: SubmitFormParams) => {
  await test.step('fill inputs', async () => {
    for (const [name, value] of Object.entries(inputs)) {
      await page.getByTestId(`${name}-input`).fill(value)
    }
  })

  await test.step('click submit btn', () =>
    page.getByRole('button', { name: submitButtonName }).click())

  await test.step('show fetching indicator during submitting', () =>
    expect(page.getByTestId(TEST_IDS.STATIC.FETCHING_INDICATOR)).toBeVisible())
}

export const expectSubmitSuccess = async (page: Page) => {
  await test.step('close dialog', () =>
    expect(page.getByTestId(TEST_IDS.STATIC.DIALOG)).toBeHidden())

  await test.step('hide fetching indicator', () =>
    expect(page.getByTestId(TEST_IDS.STATIC.FETCHING_INDICATOR)).toBeHidden())

  await test.step('show success toast', () =>
    expect(page.getByText(/success!/i).first()).toBeVisible())
}

export const expectSubmitError = async (page: Page, fields: string[]) => {
  await test.step('hide fetching indicator', () =>
    expect(page.getByTestId(TEST_IDS.STATIC.FETCHING_INDICATOR)).toBeHidden())
  await test.step('show error toast', () =>
    expect(page.getByText(/something went wrong!/i).first()).toBeVisible())
  for (const field of fields) {
    await test.step(`show error for ${field} field`, () =>
      expect(page.getByTestId(`${field}-error`)).toBeVisible())
  }
}
