import { IdsSchema } from './IdsSchema'

export function validateChangeMarkTagsForm(formData: FormData) {
  const rawData = Array.from(formData.values())

  const validatedValues = IdsSchema.safeParse(rawData)
  if (!validatedValues.success)
    return {
      markId: null,
      tagIds: null,
      validationError: 'Provided incorrect Ids data',
    }

  return {
    markId: validatedValues.data[0],
    tagIds: validatedValues.data.slice(1),
    validationError: null,
  }
}
