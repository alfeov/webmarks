'use client'

import {
  createContext,
  type Dispatch,
  type SetStateAction,
  useState,
} from 'react'

import { createUseContextHook } from '@/shared/lib/utils/createUseContextHook'

import type { MetaData } from './types'

type MetaContextValue = {
  metadata: MetaData
  setMetadata: Dispatch<SetStateAction<MetaData>>
}

const MetaContext = createContext<null | MetaContextValue>(null)

export function MetaProvider({ children }: { children: React.ReactNode }) {
  const [metadata, setMetadata] = useState<MetaData>(null)

  return <MetaContext value={{ metadata, setMetadata }}>{children}</MetaContext>
}

export const useMetaContext = createUseContextHook(MetaContext)
