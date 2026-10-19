import { renderHook } from '@testing-library/react'

import { Providers } from '@/app/[locale]/_providers/Providers'

export const renderHookWithProviders = <Result, Props extends unknown[]>(
  hook: (...initialProps: Props) => Result,
  initialProps?: Props,
) => {
  return renderHook((args: Props) => hook(...args), {
    wrapper: Providers,
    initialProps,
  })
}
