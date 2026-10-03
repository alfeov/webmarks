import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import { ViewTransition } from 'react'

import { getUserMarks } from '@/entities/mark/api/getUserMarks'
import { MarkItem } from '@/entities/mark/ui/MarkItem'
import { getUserTag } from '@/entities/tag/api/getUserTag'
import { MarkDropdownMenu } from '@/features/manage-mark/ui/MarkDropdownMenu'
import { MESSAGE_CODES } from '@/shared/api/types'
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
  const resultQuery = Array.isArray(query) ? query[0] : query

  const session = await verifySession()
  if (tagId) {
    const { tag } = await getUserTag({ id: tagId, userId: session?.userId })
    if (!tag) return notFound()
  }
  const { marks, error } = await getUserMarks({
    tagId,
    query: resultQuery,
    userId: session?.userId,
  })

  const t = await getTranslations('MarkList')

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
      {error === MESSAGE_CODES.UNAUTHORIZED && (
        <ErrorEmpty
          title={t('unauthorizedTitle')}
          description={t('unauthorizedDescription')}
        />
      )}
      {error === MESSAGE_CODES.MARKS_NOT_FOUND && (
        <ErrorEmpty
          title={t('notFoundTitle')}
          description={
            resultQuery
              ? t('notFoundByQueryDescription')
              : t('notFoundDescription')
          }
        />
      )}
    </>
  )
}
