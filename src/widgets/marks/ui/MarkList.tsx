import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import { ViewTransition } from 'react'

import { getUserMarks } from '@/entities/mark/api/getUserMarks'
import { MarkItem } from '@/entities/mark/ui/MarkItem'
import { getUserTag } from '@/entities/tag/api/getUserTag'
import { MarkDropdownMenu } from '@/features/manage-mark/ui/MarkDropdownMenu'
import type { Tag } from '@/shared/lib/prisma/generated/client'
import { verifySession } from '@/shared/lib/session'
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/shared/ui/empty'

import { MarkGrid } from './MarkGrid'

import { FaceSlightlyFrowning } from 'lucide-react'

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
      <Empty className='h-full'>
        <EmptyHeader>
          <EmptyMedia variant='icon'>
            <FaceSlightlyFrowning />
          </EmptyMedia>
          <EmptyTitle>{t('unauthorizedTitle')}</EmptyTitle>
          <EmptyDescription>{t('unauthorizedDescription')}</EmptyDescription>
        </EmptyHeader>
      </Empty>
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
    <Empty className='h-full'>
      <EmptyHeader>
        <EmptyMedia variant='icon'>
          <FaceSlightlyFrowning />
        </EmptyMedia>
        <EmptyTitle>{t('notFoundTitle')}</EmptyTitle>
        <EmptyDescription>
          {resultQuery
            ? t('notFoundByQueryDescription')
            : t('notFoundDescription')}
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}
