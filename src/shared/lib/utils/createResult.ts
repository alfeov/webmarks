interface Result<Errors> {
  isSuccess?: boolean
  errors?: Errors | null
  message?: string | null
}

export function createResult<Errors = null>({
  isSuccess = false,
  errors = null,
  message = null,
}: Result<Errors>) {
  return {
    isSuccess,
    errors,
    message,
  }
}
