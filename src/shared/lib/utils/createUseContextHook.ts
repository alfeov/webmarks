import { Context, use } from 'react'

export function createUseContextHook<T>(Context: Context<T | null>) {
  return function useCustomContext() {
    const contextValue = use(Context)
    if (!contextValue)
      throw new Error(
        'Component must be wrapped in ContextProvider to use this hook',
      )

    return contextValue
  }
}
