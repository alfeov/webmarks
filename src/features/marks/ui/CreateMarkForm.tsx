'use client'

import { useNotificationManager } from '@/shared/lib/useNotificationManager'
import { Button } from '@/shared/ui/button'
import { FieldLegend, FieldSet } from '@/shared/ui/field'
import { InputField } from '@/shared/ui/InputField'

import { CREATE_MARK_FORMDATA } from '../lib/constants'
import { useCreateMarkForm } from '../lib/useCreateMarkForm'

export function CreateMarkForm() {
  const { state, isPending, onSubmit, register } = useCreateMarkForm()
  useNotificationManager(state.message, state.isSuccess)

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
          <FieldLegend>Images Fields (Optional)</FieldLegend>
          <InputField
            label='Logo URL'
            placeholder='https://logo.com'
            errors={state.errors?.logoUrl}
            {...register(CREATE_MARK_FORMDATA.LOGO_URL)}
          />
        </FieldSet>
        <p className='text-sm font-normal text-destructive empty:hidden'>
          {!state.isSuccess && state.message}
        </p>
        <Button type='submit'>Create WebMark</Button>
      </FieldSet>
    </form>
  )
}
