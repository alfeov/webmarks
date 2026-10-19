import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'

import { ReturnChildren } from './stubs/ReturnChildren'

vi.mock('next/cache')
vi.mock('next-intl', () => ({
  NextIntlClientProvider: ReturnChildren,
  useTranslations: () => (key: string) => key,
  useLocale: () => 'en',
}))

afterEach(() => {
  cleanup()
  vi.clearAllMocks()
})
