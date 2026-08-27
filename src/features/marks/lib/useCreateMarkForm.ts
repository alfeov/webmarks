import { useActionState, useTransition } from 'react'
import { useForm } from 'react-hook-form'

import { createMark } from '../api/createMark'
import { useMetaContext } from '../model/MetaContext'

export const initialState = {
  isSuccess: true,
  errors: null,
  message: null,
}

export function useCreateMarkForm() {
  const meta = useMetaContext()
  const { register, handleSubmit } = useForm({
    values: meta.state.data ?? undefined,
  })

  const [state, formAction, isPending] = useActionState<
    CreateMarkFormState,
    CreateMark
  >(createMark, initialState)
  const [_, startTransition] = useTransition()

  const onSubmit = handleSubmit((data) => {
    startTransition(() => formAction(data))
  })

  return { register, onSubmit, state, isPending }
}
