import type { MessageCode } from './constants'

type ZodFieldErrors = Record<string, string[] | undefined> | null

export interface ActionFormState {
  isSuccess: boolean
  message?: MessageCode
}

export type ActionFormStateWithErrors<T extends ZodFieldErrors = null> =
  ActionFormState & {
    errors?: T
  }
