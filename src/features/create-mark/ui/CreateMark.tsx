'use client'

import { useParams } from 'next/navigation'
import { useTranslations } from 'next-intl'

import { useTagsContext } from '@/entities/tag/model/TagsContext'
import { Tag } from '@/shared/lib/prisma/generated/client'
import { FieldDescription, FieldLegend, FieldSet } from '@/shared/ui/field'

import { MetaProvider } from '../model/MetaContext'
import { CreateMarkForm } from './CreateMarkForm'
import { LoadMetaForm } from './LoadMetaForm'

export function CreateMark() {
  const params = useParams<{ tagId?: Tag['id'] }>()
  const tags = useTagsContext()
  const currentTagId = params.tagId
  const currentTagTitle = tags.find((tag) => tag.id === params.tagId)?.title

  const t = useTranslations('createMark')

  return (
    <FieldSet>
      <FieldLegend>{t('formTitle')}</FieldLegend>
      <FieldDescription>{t('formDescription')}</FieldDescription>
      <MetaProvider>
        <LoadMetaForm />
        <CreateMarkForm
          currentTagId={currentTagId}
          currentTagTitle={currentTagTitle}
        />
      </MetaProvider>
    </FieldSet>
  )
}
