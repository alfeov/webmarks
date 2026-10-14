'use client'

import { createContext } from 'react'

import type { Tag } from '@/shared/lib/prisma/generated/client'
import { createUseContextHook } from '@/shared/lib/utils/createUseContextHook'

type TagsContextValue = Tag[]

const TagsContext = createContext<null | TagsContextValue>(null)

export interface TagsProviderProps {
  tags?: Tag[]
  children: React.ReactNode
}

export function TagsProvider({ tags = [], children }: TagsProviderProps) {
  return <TagsContext value={tags}>{children}</TagsContext>
}

export const useTagsContext = createUseContextHook(TagsContext)
