import { IdsSchema } from './IdsSchema'

export function validateChangeMarkTagsForm(formData: FormData) {
  const rawData = Array.from(formData.values())

  const validatedValues = IdsSchema.safeParse(rawData)
  if (!validatedValues.success)
    return {
      tagIds: null,
      validationError: 'Provided incorrect Ids data',
    }

  return {
    tagIds: validatedValues.data,
    validationError: null,
  }
}
