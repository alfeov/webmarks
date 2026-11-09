import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { TEST_IDS } from '@/shared/config/testids'

import {
  FetchingIndicatorProvider,
  useFetchingIndicatorContext,
} from './FetchingIndicatorContext'

const Consumer = () => {
  const { hideFetchingIndicator, showFetchingIndicator } =
    useFetchingIndicatorContext()

  return (
    <div>
      <button onClick={showFetchingIndicator}>Show</button>
      <button onClick={hideFetchingIndicator}>Hide</button>
    </div>
  )
}

describe('FetchingIndicatorContext', () => {
  describe('FetchingIndicatorProvider', () => {
    it('should not show fetching indicator by default', () => {
      render(
        <FetchingIndicatorProvider>
          <Consumer />
        </FetchingIndicatorProvider>,
      )

      expect(
        screen.queryByTestId(TEST_IDS.STATIC.FETCHING_INDICATOR),
      ).not.toBeInTheDocument()
    })
    it('should show fetching indicator when showFetchingIndicator is called', async () => {
      render(
        <FetchingIndicatorProvider>
          <Consumer />
        </FetchingIndicatorProvider>,
      )

      const show = screen.getByRole('button', { name: /show/i })
      await userEvent.click(show)

      expect(
        screen.getByTestId(TEST_IDS.STATIC.FETCHING_INDICATOR),
      ).toBeInTheDocument()
    })
    it('should hide fetching indicator when hideFetchingIndicator is called', async () => {
      render(
        <FetchingIndicatorProvider>
          <Consumer />
        </FetchingIndicatorProvider>,
      )

      const show = screen.getByRole('button', { name: /show/i })
      await userEvent.click(show)

      expect(
        screen.getByTestId(TEST_IDS.STATIC.FETCHING_INDICATOR),
      ).toBeInTheDocument()

      const hide = screen.getByRole('button', { name: /hide/i })
      await userEvent.click(hide)

      expect(
        screen.queryByTestId(TEST_IDS.STATIC.FETCHING_INDICATOR),
      ).not.toBeInTheDocument()
    })
  })
})
