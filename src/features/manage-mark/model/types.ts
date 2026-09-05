export type ChangeMarkTagsFormState = {
  isSuccess: boolean
  message: string | null
}

export type PinMarkFormState = {
  isSuccess: boolean
  message: string | null
}

export type DeleteMarkFormState = {
  isSuccess: boolean
  message: string | null
}

export interface EditMarkFormState {
  isSuccess: boolean
  errors: {
    title?: string[]
    url?: string[]
    description?: string[]
    logoUrl?: string[]
  } | null
  message: string | null
}
