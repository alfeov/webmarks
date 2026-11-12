'use client'

import { useParams } from 'next/navigation'
import { startTransition, useActionState } from 'react'
import { useForm } from 'react-hook-form'

import { createMarkAction } from '@/features/create-mark/api/createMarkAction'
import { useMetaStateContext } from '@/features/create-mark/model/MetaContext'
import type { CreateMarkFormState } from '@/features/create-mark/model/types'
import type { Tag } from '@/shared/lib/prisma/generated/client'

import { CREATE_MARK_FORM } from './constants'

export const initialState: CreateMarkFormState = {
  isSuccess: false,
}

export function useCreateMarkForm() {
  const params = useParams<{ tagId?: Tag['id'] }>()

  const metadata = useMetaStateContext()
  const { register, handleSubmit } = useForm({
    values: {
      [CREATE_MARK_FORM.URL]: metadata.url ?? '',
      [CREATE_MARK_FORM.TITLE]: metadata.title ?? '',
      [CREATE_MARK_FORM.DESCRIPTION]: metadata.description ?? '',
      [CREATE_MARK_FORM.LOGO_URL]: metadata.logoUrl ?? '',
    },
    resetOptions: {
      keepDirtyValues: true,
    },
  })

  const [state, formAction, isPending] = useActionState(
    createMarkAction.bind(null, params.tagId),
    initialState,
  )

  const onSubmit = handleSubmit((data) => {
    startTransition(() => formAction(data))
  })

  return { register, onSubmit, state, isPending }
}
