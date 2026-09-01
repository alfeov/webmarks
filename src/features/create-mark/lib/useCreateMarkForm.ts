'use client'

import { startTransition, useActionState } from 'react'
import { useForm } from 'react-hook-form'

import { Tag } from '@/shared/lib/prisma/generated/client'

import { createMarkAction } from '../api/createMarkAction'
import { useMetaContext } from '../model/MetaContext'
import { CreateMark, CreateMarkFormState } from '../model/types'

export const initialState = {
  isSuccess: true,
  errors: null,
  message: null,
}

export function useCreateMarkForm({
  defaultTagId,
}: {
  defaultTagId?: Tag['id']
}) {
  const meta = useMetaContext()
  const { register, handleSubmit } = useForm({
    values: {
      ...meta.state.data,
      defaultTagId,
    },
  })

  const [state, formAction, isPending] = useActionState<
    CreateMarkFormState,
    CreateMark
  >(createMarkAction, initialState)

  const onSubmit = handleSubmit((data) => {
    startTransition(() => formAction(data))
  })

  return { register, onSubmit, state, isPending }
}
