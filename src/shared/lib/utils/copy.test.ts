import { MESSAGE_CODES } from '@/shared/api/types'
import { spyOnConsoleError } from '@/test/vitest.setup'

import { copy } from './copy'

const text = 'copy text'

const spy = vi.spyOn(navigator.clipboard, 'writeText')

describe('copy', () => {
  it('should copy text in clipboard and return success with according message when copy is success', async () => {
    const result = await copy(text)

    expect(spy).toHaveBeenCalledOnce()
    expect(spy).toHaveBeenCalledWith(text)
    expect(result).toEqual({
      isSuccess: true,
      message: MESSAGE_CODES.COPY_SUCCESS,
    })
  })
  it('should log error in console and return not success with according message when thrown exception', async () => {
    const error = new Error('Copy error')
    spy.mockThrowOnce(error)

    const result = await copy(text)

    expect(spyOnConsoleError).toHaveBeenCalledOnce()
    expect(spyOnConsoleError).toHaveBeenCalledWith(error)
    expect(spy).toHaveBeenCalledOnce()
    expect(spy).toHaveBeenCalledWith(text)
    expect(result.isSuccess).toBe(false)
    expect(result.message).toBe(MESSAGE_CODES.COPY_ERROR)
  })
})
