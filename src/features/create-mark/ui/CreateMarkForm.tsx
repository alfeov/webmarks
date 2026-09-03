'use client'

import { useParams } from 'next/navigation'

import { useTagsContext } from '@/entities/tag/model/TagsContext'
import { useCloseDialogOn } from '@/shared/lib/hooks/useCloseDialogOn'
import { useNotificationManager } from '@/shared/lib/hooks/useNotificationManager'
import { BadgeField } from '@/shared/ui/BadgeField'
import { Button } from '@/shared/ui/button'
import { ErrorText } from '@/shared/ui/ErrorText'
import { FieldLegend, FieldSet } from '@/shared/ui/field'
import { InputField } from '@/shared/ui/InputField'

import { CREATE_MARK_FORMDATA } from '../lib/constants'
import { useCreateMarkForm } from '../lib/useCreateMarkForm'

export function CreateMarkForm() {
  const params = useParams<{ tagId?: string }>()

  const { state, isPending, onSubmit, register } = useCreateMarkForm({
    defaultTagId: params.tagId,
  })
  useNotificationManager(state.message, state.isSuccess)
  useCloseDialogOn(state.isSuccess)

  const { tags } = useTagsContext()
  const activeTagTitle = tags.find((tag) => tag.id === params.tagId)?.title

  return (
    <form onSubmit={onSubmit}>
      <FieldSet disabled={isPending}>
        <FieldSet>
          <FieldLegend>Required Fields</FieldLegend>
          <InputField
            label='Title'
            placeholder='WebMark'
            errors={state.errors?.title}
            {...register(CREATE_MARK_FORMDATA.TITLE)}
            req
          />
          <InputField
            label='URL'
            placeholder='https://webmarks.com'
            errors={state.errors?.url}
            {...register(CREATE_MARK_FORMDATA.URL)}
            req
          />
          <InputField
            label='Description'
            placeholder='Some cool description to your link'
            errors={state.errors?.description}
            {...register(CREATE_MARK_FORMDATA.DESCRIPTION)}
            req
          />
        </FieldSet>
        <FieldSet>
          <FieldLegend>Optional Fields</FieldLegend>
          <InputField
            label='Logo URL'
            placeholder='https://logo.com'
            errors={state.errors?.logoUrl}
            {...register(CREATE_MARK_FORMDATA.LOGO_URL)}
          />
          {/* default tag according to page params */}
          {params.tagId && activeTagTitle && (
            <BadgeField
              hidden
              label='Default Tag:'
              badgeLabel={activeTagTitle}
              errors={state.errors?.defaultTagId}
              {...register(CREATE_MARK_FORMDATA.DEFAULT_TAG_ID)}
            />
          )}
        </FieldSet>
        <ErrorText>{!state.isSuccess && state.message}</ErrorText>
        <Button type='submit'>Create WebMark</Button>
      </FieldSet>
    </form>
  )
}
