export interface SigninFormState {
  isSuccess: boolean
  errors: {
    email?: string[]
    password?: string[]
  } | null
  message: string | null
}
