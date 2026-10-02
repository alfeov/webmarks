type ZodFieldErrors = Record<string, string[] | undefined> | null

export type MessageCode =
  | 'UNAUTHORIZED'
  | 'VALIDATION_ERROR'
  | 'INTERNAL_ERROR'
  | 'LOAD_META_ERROR'
  | 'LOAD_META_SUCCESS'
  | 'MARK_CREATE_SUCCESS'
  | 'MARK_EXISTS'

export interface ActionFormState<T extends ZodFieldErrors = null> {
  isSuccess: boolean
  errors?: T
  message?: MessageCode
}
