'use client'

import { use, useActionState, useEffect, useTransition } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/shared/ui/button'
import { FieldLegend, FieldSet } from '@/shared/ui/field'
import { InputField } from '@/shared/ui/InputField'
import { showErrorToast } from '@/shared/utils/showErrorToast'
import { showSuccessToast } from '@/shared/utils/showSuccessToast'

import { createMark } from '../model/createMark'
import { MetaContext } from '../model/MetaContext'

export function CreateMarkForm() {
  const metaContext = use(MetaContext)
  if (!metaContext)
    throw new Error('Component must be wrapped in ContextProvider')

  const { register, handleSubmit } = useForm({
    values: metaContext.meta,
  })
  const [state, formAction, isPending] = useActionState(createMark, undefined)
  const [_, startTransition] = useTransition()

  const onSubmit = handleSubmit((data) => {
    startTransition(() => formAction(data))
  })

  useEffect(() => {
    if (state?.message) {
      if (state?.isSuccess) {
        showSuccessToast(state.message)
        return
      }
      showErrorToast(state.message)
    }
  }, [state?.message, state?.isSuccess])

  return (
    <form onSubmit={onSubmit}>
      <FieldSet disabled={isPending}>
        <FieldSet>
          <FieldLegend>Required Fields</FieldLegend>
          <InputField
            label='Title'
            placeholder='WebMark'
            errors={state?.errors?.title}
            {...register('title')}
            req
          />
          <InputField
            label='URL'
            placeholder='https://webmarks.com'
            errors={state?.errors?.url}
            {...register('url')}
            req
          />
          <InputField
            label='Description'
            placeholder='Some cool description to your link'
            errors={state?.errors?.description}
            {...register('description')}
            req
          />
        </FieldSet>
        <FieldSet>
          <FieldLegend>Images Fields (Optional)</FieldLegend>
          <InputField
            label='Logo URL'
            placeholder='https://logo.com'
            errors={state?.errors?.logoUrl}
            {...register('logoUrl')}
          />
        </FieldSet>
        <p className='text-sm font-normal text-destructive empty:hidden'>
          {!state?.isSuccess && state?.message}
        </p>
        <Button type='submit'>Create WebMark</Button>
      </FieldSet>
    </form>
  )
}
