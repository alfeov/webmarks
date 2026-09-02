'use client'

import {
  createContext,
  type Dispatch,
  type SetStateAction,
  useState,
} from 'react'

import { createUseContextHook } from '@/shared/lib/utils/createUseContextHook'

import { WebMarkWithTags } from './types'

type ActiveMarkValue = {
  activeMark: WebMarkWithTags | null
  setActiveMark: Dispatch<SetStateAction<WebMarkWithTags | null>>
}

const ActiveMarkContext = createContext<ActiveMarkValue | null>(null)

export function ActiveMarkProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [activeMark, setActiveMark] = useState<null | WebMarkWithTags>(null)

  return (
    <ActiveMarkContext value={{ activeMark, setActiveMark }}>
      {children}
    </ActiveMarkContext>
  )
}

export const useActiveMarkContext = createUseContextHook(ActiveMarkContext)
