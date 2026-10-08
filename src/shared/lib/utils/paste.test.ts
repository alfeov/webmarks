import { MESSAGE_CODES } from '@/shared/api/types'
import { spyOnConsoleError } from '@/test/vitest.setup'

import { paste } from './paste'

const spy = vi.spyOn(navigator.clipboard, 'readText')

describe('paste', () => {
  it('should return text from clipboard', async () => {
    const text = 'copy text'
    spy.mockResolvedValueOnce(text)
    const result = await paste()

    expect(spy).toHaveBeenCalledOnce()
    expect(result.clipText).toBe(text)
  })
  it('should log error in console and return message when thrown exception', async () => {
    const error = new Error('Copy error')
    spy.mockThrowOnce(error)

    const result = await paste()

    expect(spyOnConsoleError).toHaveBeenCalledOnce()
    expect(spyOnConsoleError).toHaveBeenCalledWith(error)
    expect(spy).toHaveBeenCalledOnce()
    expect(result.error).toBe(MESSAGE_CODES.PASTE_ERROR)
  })
})
