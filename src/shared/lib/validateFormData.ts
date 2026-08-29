import z, { flattenError } from 'zod'

export function validateFormData<T extends z.ZodObject>(
  formData: FormData | Record<string, unknown>,
  zodSchema: T,
) {
  const validatedFields = zodSchema.safeParse(
    formData instanceof FormData ? Object.fromEntries(formData) : formData,
  )

  if (!validatedFields.success)
    return {
      validatedData: null,
      validationErrors: flattenError(validatedFields.error).fieldErrors,
    }

  return {
    validatedData: validatedFields.data,
    validationErrors: null,
  }
}
