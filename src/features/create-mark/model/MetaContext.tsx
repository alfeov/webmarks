'use client'

import {
  createContext,
  type Dispatch,
  type SetStateAction,
  useState,
} from 'react'

import { createUseContextHook } from '@/shared/lib/utils/createUseContextHook'

import type { MetaData } from './types'

type MetaStateContextValue = MetaData

type MetaActionContextValue = Dispatch<SetStateAction<MetaData>>

const MetaStateContext = createContext<null | MetaStateContextValue>(null)
const MetaActionContext = createContext<null | MetaActionContextValue>(null)

export function MetaProvider({ children }: { children: React.ReactNode }) {
  const [metadata, setMetadata] = useState<MetaData>({})

  return (
    <MetaStateContext value={metadata}>
      <MetaActionContext value={setMetadata}>{children}</MetaActionContext>
    </MetaStateContext>
  )
}

export const useMetaStateContext = createUseContextHook(MetaStateContext)
export const useMetaActionContext = createUseContextHook(MetaActionContext)
