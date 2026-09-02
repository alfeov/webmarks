export interface SignupFormState {
  isSuccess: boolean
  errors: {
    username?: string[]
    email?: string[]
    password?: string[]
    confirmPassword?: string[]
  } | null
  message: string | null
}
