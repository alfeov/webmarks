'use client'

import { createContext, useActionState } from 'react'

import { loadMetaAction } from '@/features/create-mark/api/loadMetaAction'
import { createUseContextHook } from '@/shared/lib/utils/createUseContextHook'

import { LoadMetaFormState } from './types'

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
  >(loadMetaAction, initialState)

  return (
    <MetaContext value={{ state, formAction, isPending }}>
      {children}
    </MetaContext>
  )
}

export const useMetaContext = createUseContextHook(MetaContext)
