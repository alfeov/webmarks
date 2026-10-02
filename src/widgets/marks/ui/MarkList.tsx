import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import { ViewTransition } from 'react'

import { getUserMarks } from '@/entities/mark/api/getUserMarks'
import { MarkItem } from '@/entities/mark/ui/MarkItem'
import { getUserTag } from '@/entities/tag/api/getUserTag'
import { MarkDropdownMenu } from '@/features/manage-mark/ui/MarkDropdownMenu'
import { Tag } from '@/shared/lib/prisma/generated/client'
import { verifySession } from '@/shared/lib/session'
import { ErrorEmpty } from '@/shared/ui/ErrorEmpty'

import { MarkGrid } from './MarkGrid'

interface MarkListProps {
  params?: Promise<{
    tagId: Tag['id']
  }>
  searchParams?: Promise<{
    query?: string | string[]
  }>
}

export async function MarkList({ params, searchParams }: MarkListProps) {
  const tagId = (await params)?.tagId
  const query = (await searchParams)?.query

  const session = await verifySession()
  if (tagId) {
    const { tag } = await getUserTag({ id: tagId, userId: session?.userId })
    if (!tag) return notFound()
  }
  const { marks, error } = await getUserMarks({
    tagId,
    query: Array.isArray(query) ? query[0] : query,
    userId: session?.userId,
  })

  const t = await getTranslations('markList')

  return (
    <>
      {Boolean(marks.length) && (
        <MarkGrid>
          {marks.map((mark) => (
            <ViewTransition
              name={mark.id}
              key={`${mark.id}-${mark.updatedAt}`}
              update='auto'
              share='auto'
              default='none'
            >
              <MarkItem {...mark}>
                <MarkDropdownMenu {...mark} />
              </MarkItem>
            </ViewTransition>
          ))}
        </MarkGrid>
      )}
      {error === 'UNAUTHORIZED' && (
        <ErrorEmpty
          title={t('errorTitle')}
          description={t('unauthorizedDescription')}
        />
      )}
      {error === 'NOT_FOUND' && (
        <ErrorEmpty
          title={t('errorTitle')}
          description={t('notFoundDescription')}
        />
      )}
    </>
  )
}
