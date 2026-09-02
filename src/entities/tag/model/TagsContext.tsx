'use client'

import { createContext } from 'react'

import { Tag } from '@/shared/lib/prisma/generated/client'
import { createUseContextHook } from '@/shared/lib/utils/createUseContextHook'

type TagsContextValue = {
  tags: Tag[]
}

const TagsContext = createContext<null | TagsContextValue>(null)

export function TagsProvider({
  tags = [],
  children,
}: {
  tags: Tag[]
  children: React.ReactNode
}) {
  return <TagsContext value={{ tags }}>{children}</TagsContext>
}

export const useTagsContext = createUseContextHook(TagsContext)
