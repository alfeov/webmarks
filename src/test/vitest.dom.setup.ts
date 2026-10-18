import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'

vi.mock('next/cache')
vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => 'en',
}))

afterEach(() => {
  cleanup()
  vi.clearAllMocks()
})
