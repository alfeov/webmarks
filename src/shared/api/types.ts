type ZodFieldErrors = Record<string, string[] | undefined> | null

export interface ActionFormState<T extends ZodFieldErrors = null> {
  isSuccess: boolean
  errors: T
  message: string | null
}
