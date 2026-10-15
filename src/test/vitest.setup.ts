import { cleanup } from '@testing-library/react'

import '@testing-library/jest-dom/vitest'

vi.mock('next/cache')
vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}))

export const spyOnConsoleError = vi
  .spyOn(console, 'error')
  .mockImplementation(vi.fn())

afterEach(() => {
  cleanup()
  vi.clearAllMocks()
})
