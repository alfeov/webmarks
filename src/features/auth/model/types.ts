interface SignupFormState {
  isSuccess: boolean
  errors: {
    username?: string[]
    email?: string[]
    password?: string[]
    confirmPassword?: string[]
  } | null
  message: string | null
}

interface LoginFormState {
  isSuccess: boolean
  errors: {
    email?: string[]
    password?: string[]
  } | null
  message: string | null
}
