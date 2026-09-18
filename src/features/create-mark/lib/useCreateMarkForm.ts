'use client'

import { startTransition, useActionState } from 'react'
import { useForm } from 'react-hook-form'

import { Tag } from '@/shared/lib/prisma/generated/client'

import { createMarkAction } from '../api/createMarkAction'
import { useMetaContext } from '../model/MetaContext'
import { CreateMarkFormState } from '../model/types'

export const initialState: CreateMarkFormState = {
  isSuccess: false,
  errors: null,
  message: null,
}

export function useCreateMarkForm({
  defaultTagId,
}: {
  defaultTagId?: Tag['id']
}) {
  const { metadata } = useMetaContext()
  const { register, handleSubmit } = useForm({
    values: {
      ...metadata,
    },
    resetOptions: {
      keepDirtyValues: true,
    },
  })

  const [state, formAction, isPending] = useActionState(
    createMarkAction.bind(null, defaultTagId ?? null),
    initialState,
  )

  const onSubmit = handleSubmit((data) => {
    startTransition(() => formAction(data))
  })

  return { register, onSubmit, state, isPending }
}
