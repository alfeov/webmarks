import { messages } from '@/test/utils/messages'

describe('IdSchema', () => {
  it.each(messages)('should have path in locale message', (locale) => {
    expect(locale.errors.id).toBeTruthy()
  })
})
