export interface CreateTagFormState {
  isSuccess: boolean
  errors: {
    title?: string[]
  } | null
  message: string | null
}
