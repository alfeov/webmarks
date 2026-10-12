import { cleanup } from '@testing-library/react'

import '@testing-library/jest-dom/vitest'

export const spyOnConsoleError = vi
  .spyOn(console, 'error')
  .mockImplementation(vi.fn())

afterEach(() => {
  cleanup()
  vi.clearAllMocks()
})
