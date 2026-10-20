import { messages } from '@/test/helpers/messages'

describe('EmailSchema', () => {
  it.each(messages)('should have path in locale message', (locale) => {
    expect(locale.errors.email.invalid).toBeTruthy()
  })
})
