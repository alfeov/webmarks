'use client'

import { startTransition, useActionState } from 'react'
import { useForm } from 'react-hook-form'

import type { Tag } from '@/shared/lib/prisma/generated/client'

import { createMarkAction } from '../api/createMarkAction'
import { useMetaStateContext } from '../model/MetaContext'
import type { CreateMarkFormState } from '../model/types'

export const initialState: CreateMarkFormState = {
  isSuccess: false,
}

export function useCreateMarkForm({
  defaultTagId,
}: {
  defaultTagId?: Tag['id']
}) {
  const metadata = useMetaStateContext()
  const { register, handleSubmit } = useForm({
    values: {
      ...metadata,
    },
    resetOptions: {
      keepDirtyValues: true,
    },
  })

  const [state, formAction, isPending] = useActionState(
    createMarkAction.bind(null, defaultTagId),
    initialState,
  )

  const onSubmit = handleSubmit((data) => {
    startTransition(() => formAction(data))
  })

  return { register, onSubmit, state, isPending }
}
