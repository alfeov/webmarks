'use client'

import { createContext, use } from 'react'

import { Tag } from '@/shared/lib/prisma/generated/client'

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

export function useTagsContext() {
  const tagsContext = use(TagsContext)
  if (!tagsContext)
    throw new Error(
      'Component must be wrapped in ContextProvider to use this hook',
    )

  return tagsContext
}
