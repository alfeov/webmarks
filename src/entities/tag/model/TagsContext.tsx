'use client'

import { createContext, useMemo } from 'react'

import { Tag } from '@/shared/lib/prisma/generated/client'
import { createUseContextHook } from '@/shared/lib/utils/createUseContextHook'

type TagsContextValue = Tag[]

const TagsContext = createContext<null | TagsContextValue>(null)

export function TagsProvider({
  tags = [],
  children,
}: {
  tags: Tag[]
  children: React.ReactNode
}) {
  const value = useMemo(() => tags, [tags])
  return <TagsContext value={value}>{children}</TagsContext>
}

export const useTagsContext = createUseContextHook(TagsContext)
