'use client'

import { useTranslations } from 'next-intl'

import { useCloseDialogOn } from '@/shared/lib/hooks/useCloseDialogOn'
import { useFetchingIndicatorManager } from '@/shared/lib/hooks/useFetchingIndicatorManager'
import { useNotificationManager } from '@/shared/lib/hooks/useNotificationManager'
import { Button } from '@/shared/ui/button'
import { FieldLegend, FieldSet } from '@/shared/ui/field'
import { InputField } from '@/shared/ui/InputField'
import { TextareaField } from '@/shared/ui/TextareaField'

import { CREATE_MARK_FORMDATA } from '../lib/constants'
import { useCreateMarkForm } from '../lib/useCreateMarkForm'

export function CreateMarkForm() {
  const { state, isPending, onSubmit, register } = useCreateMarkForm()

  useNotificationManager(state.message, state.isSuccess, !isPending)
  useFetchingIndicatorManager(isPending)
  useCloseDialogOn(state.isSuccess)

  const tMarkForm = useTranslations('MarkForm')
  const tCreateMarkForm = useTranslations('CreateMarkForm')

  return (
    <form onSubmit={onSubmit}>
      <FieldSet disabled={isPending}>
        <FieldSet>
          <FieldLegend>{tCreateMarkForm('requiredFields')}</FieldLegend>
          <InputField
            label={tMarkForm('fields.url.label')}
            placeholder='https://webmarks.com'
            errors={state.errors?.url}
            {...register(CREATE_MARK_FORMDATA.URL)}
            req
          />
          <InputField
            label={tMarkForm('fields.title.label')}
            placeholder='WebMark'
            errors={state.errors?.title}
            {...register(CREATE_MARK_FORMDATA.TITLE)}
            req
          />
          <TextareaField
            label={tMarkForm('fields.description.label')}
            placeholder={tMarkForm('fields.description.placeholder')}
            errors={state.errors?.description}
            {...register(CREATE_MARK_FORMDATA.DESCRIPTION)}
            req
          />
        </FieldSet>
        <FieldSet>
          <FieldLegend>{tCreateMarkForm('optionalFields')}</FieldLegend>
          <InputField
            label={tMarkForm('fields.logoUrl.label')}
            placeholder='https://logo.com'
            errors={state.errors?.logoUrl}
            {...register(CREATE_MARK_FORMDATA.LOGO_URL)}
          />
        </FieldSet>
        <Button type='submit'>{tCreateMarkForm('submit')}</Button>
      </FieldSet>
    </form>
  )
}
