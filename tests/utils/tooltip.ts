import { expect, type Page, test } from '@playwright/test'

import { TEST_IDS } from '@/shared/config/testids'

export const expectFetchingIndicatorToBeVisible = async (page: Page) => {
  await test.step('show fetching indicator', () =>
    expect(page.getByTestId(TEST_IDS.STATIC.FETCHING_INDICATOR)).toBeVisible())
}

export const expectFetchingIndicatorToBeHidden = async (page: Page) => {
  await test.step('hide fetching indicator', () =>
    expect(page.getByTestId(TEST_IDS.STATIC.FETCHING_INDICATOR)).toBeHidden())
}

export const expectSuccessToastToBeVisible = async (page: Page) => {
  await test.step('show success toast', () =>
    expect(page.getByText(/success!/i).first()).toBeVisible())
}

export const expectErrorToastToBeVisible = async (page: Page) => {
  await test.step('show error toast', () =>
    expect(page.getByText(/something went wrong!/i).first()).toBeVisible())
}
