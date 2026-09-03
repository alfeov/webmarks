export interface DeleteTagFormState {
  isSuccess: boolean
  message: string | null
}

export interface EditTagFormState {
  isSuccess: boolean
  errors: {
    id?: string[]
    title?: string[]
  } | null
  message: string | null
}
