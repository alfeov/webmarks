'use client'

import { createContext, useActionState } from 'react'

import { loadMeta } from '../api/loadMeta'

export const MetaContext = createContext<null | ContextValue>(null)

export interface ContextValue {
  state: LoadMetaFormState
  formAction: (payload: FormData) => void
  isPending: boolean
}

export const initialState = {
  error: null,
  data: {
    title: '',
    url: '',
    description: '',
    logoUrl: '',
  },
}

export function MetaProvider({ children }: { children: React.ReactNode }) {
  const [state, formAction, isPending] = useActionState<
    LoadMetaFormState,
    FormData
  >(loadMeta, initialState)

  return (
    <MetaContext value={{ state, formAction, isPending }}>
      {children}
    </MetaContext>
  )
}
