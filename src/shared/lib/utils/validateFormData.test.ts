import z from 'zod'

import { validateFormData } from './validateFormData'

const message = 'Not correct length'
const Schema = z.object({
  data: z.string().max(5, message),
})

describe('validateFormData', () => {
  it('should return validatedData on success', () => {
    const data = 'hello'

    const result = validateFormData({ data }, Schema)

    expect(result.validatedData?.data).toBe(data)
  })
  it('should return validationErrors on failure', () => {
    const data = 'errorString'

    const result = validateFormData({ data }, Schema)

    expect(result.validationErrors?.data).toContain(message)
  })
  it('should accept FormData and validate its fields', () => {
    const data = 'hello'
    const formData = new FormData()
    formData.set('data', data)

    const result = validateFormData(formData, Schema)

    expect(result.validatedData?.data).toBe(data)
  })
})
