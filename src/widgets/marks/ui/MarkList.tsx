import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import { ViewTransition } from 'react'

import { getUserMarks } from '@/entities/mark/api/getUserMarks'
import { MarkItem } from '@/entities/mark/ui/MarkItem'
import { getUserTag } from '@/entities/tag/api/getUserTag'
import { MarkDropdownMenu } from '@/features/manage-mark/ui/MarkDropdownMenu'
import type { Tag } from '@/shared/lib/prisma/generated/client'
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

  const t = await getTranslations('MarkList')

  const session = await verifySession()
  if (!session) {
    return (
      <ErrorEmpty
        title={t('unauthorizedTitle')}
        description={t('unauthorizedDescription')}
      />
    )
  }

  const [tag, marks] = await Promise.all([
    tagId
      ? getUserTag({ id: tagId, userId: session.userId })
      : Promise.resolve(null),
    getUserMarks({
      tagId,
      query: resultQuery,
      userId: session.userId,
    }),
  ])

  if (tagId && !tag) return notFound()

  return Boolean(marks.length) ? (
    <MarkGrid>
      {marks.map((mark) => (
        <ViewTransition
          name={mark.id}
          // to animate on update
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
  ) : (
    <ErrorEmpty
      title={t('notFoundTitle')}
      description={
        resultQuery ? t('notFoundByQueryDescription') : t('notFoundDescription')
      }
    />
  )
}
