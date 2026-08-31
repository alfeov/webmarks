import { CUIDsSchema } from './CUIDsSchema'

export function validateMarkTagsForm(formData: FormData) {
  const rawData = Array.from(formData.values())

  const validatedValues = CUIDsSchema.safeParse(rawData)
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
