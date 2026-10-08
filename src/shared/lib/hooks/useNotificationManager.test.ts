import { renderHook } from '@testing-library/react'

import { MESSAGE_CODES, type MessageCode } from '@/shared/api/types'
import {
  AllProviders,
  renderHookWithProviders,
} from '@/test/renderWithProviders'

import { showToast } from '../utils/showToast'
import { useNotificationManager } from './useNotificationManager'

vi.mock('@/shared/lib/utils/showToast')

vi.mock('next-intl', async () => {
  const actual = await vi.importActual('next-intl')
  return {
    ...actual,
    useTranslations: () => (key: string) => key,
  }
})

describe('useNotificationManager', () => {
  it('should show toast when trigger is fire and message is provided', () => {
    const message = MESSAGE_CODES.INVALID_ID
    const isSuccess = false
    renderHookWithProviders(() =>
      useNotificationManager(message, isSuccess, true),
    )

    expect(showToast).toHaveBeenCalledWith('errorTitle', message, isSuccess)
  })

  it('should call showToast with success title when provided isSuccess', () => {
    const message = MESSAGE_CODES.COPY_SUCCESS
    const isSuccess = true
    renderHookWithProviders(() =>
      useNotificationManager(message, isSuccess, true),
    )

    expect(showToast).toHaveBeenCalledWith('successTitle', message, isSuccess)
  })
  it('should not call showToast when trigger is false', () => {
    renderHookWithProviders(() =>
      useNotificationManager(MESSAGE_CODES.COPY_SUCCESS, true, false),
    )

    expect(showToast).not.toHaveBeenCalled()
  })
  it('should not call showToast when message is null and trigger is true', () => {
    renderHookWithProviders(() => useNotificationManager(null, true, true))

    expect(showToast).not.toHaveBeenCalled()
  })
  it('should re-fire showToast when message is changed and trigger is not', () => {
    const initialProps: { messageCode: MessageCode } = {
      messageCode: MESSAGE_CODES.USER_EXISTS,
    }
    const { rerender } = renderHook(
      ({ messageCode }) => useNotificationManager(messageCode, true, true),
      {
        initialProps,
        wrapper: AllProviders,
      },
    )

    expect(showToast).toHaveBeenCalledTimes(1)

    rerender({ messageCode: MESSAGE_CODES.COPY_ERROR })

    expect(showToast).toHaveBeenCalledTimes(2)
  })
})
