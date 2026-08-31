'use client'

import { createContext, Dispatch, SetStateAction, use, useState } from 'react'

import { Tag } from '@/shared/lib/prisma/generated/client'

type TagsContextValue = {
  tags: Tag[]
  setTags: Dispatch<SetStateAction<Tag[]>>
}

const TagsContext = createContext<null | TagsContextValue>(null)

export function TagsProvider({
  initialTags = [],
  children,
}: {
  initialTags: Tag[]
  children: React.ReactNode
}) {
  const [tags, setTags] = useState<Tag[]>(initialTags)

  return <TagsContext value={{ tags, setTags }}>{children}</TagsContext>
}

export function useTagsContext() {
  const tagsContext = use(TagsContext)
  if (!tagsContext)
    throw new Error(
      'Component must be wrapped in ContextProvider to use this hook',
    )

  return tagsContext
}
