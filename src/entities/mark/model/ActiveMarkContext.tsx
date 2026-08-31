'use client'

import {
  createContext,
  type Dispatch,
  type SetStateAction,
  use,
  useState,
} from 'react'

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

export function useActiveMarkContext() {
  const activeMark = use(ActiveMarkContext)
  if (!activeMark)
    throw new Error(
      'Component must be wrapped in ContextProvider to use this hook',
    )

  return activeMark
}
