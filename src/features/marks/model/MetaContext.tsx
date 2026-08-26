'use client'

import { createContext, useActionState } from 'react'

import { FormState, initialState, loadMeta } from '../api/loadMeta'

export const MetaContext = createContext<null | ContextValue>(null)

export interface ContextValue {
  state: FormState
  formAction: (payload: FormData) => void
  isPending: boolean
}

export function MetaProvider({ children }: { children: React.ReactNode }) {
  const [state, formAction, isPending] = useActionState(loadMeta, initialState)

  return (
    <MetaContext value={{ state, formAction, isPending }}>
      {children}
    </MetaContext>
  )
}
