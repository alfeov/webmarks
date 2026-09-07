'use client'

import { useParams } from 'next/navigation'

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

  return (
    <FieldSet>
      <FieldLegend>Create new WebMark</FieldLegend>
      <FieldDescription>
        Please fill in the fields below to create new WebMark
      </FieldDescription>
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
