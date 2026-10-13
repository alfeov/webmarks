import { locales } from '@/test/locales'

describe('IdSchema', () => {
  it.each(locales)('should have message path in locale', (locale) => {
    expect(locale.errors.id).toBeTruthy()
  })
})
