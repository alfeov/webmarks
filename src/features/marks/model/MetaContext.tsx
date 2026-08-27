'use client'

import { createContext, use, useActionState } from 'react'

import { loadMeta } from '../api/loadMeta'

type MetaContextValue = {
  state: LoadMetaFormState
  formAction: (payload: FormData) => void
  isPending: boolean
}

const MetaContext = createContext<null | MetaContextValue>(null)

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

export function useMetaContext() {
  const meta = use(MetaContext)
  if (!meta)
    throw new Error(
      'Component must be wrapped in ContextProvider to use this hook',
    )
  return meta
}
