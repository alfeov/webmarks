import { UrlOrEmptySchema } from './UrlOrEmptySchema'

describe('UrlOrEmptySchema', () => {
  it('should return data when url is correct', () => {
    const result = UrlOrEmptySchema.safeParse('https://some-url.com')
    expect(result.success).toBe(true)
    expect(result.data).toBeTruthy()
    expect(result.error).toBeFalsy()
  })
  it('should return error when url is not correct', () => {
    const result = UrlOrEmptySchema.safeParse('htt/error-url.com')
    expect(result.success).toBe(false)
    expect(result.data).toBeNullable()
    expect(result.error).toBeTruthy()
  })
  it("should return success without data or error if url is ''", () => {
    const result = UrlOrEmptySchema.safeParse('')
    expect(result.success).toBe(true)
    expect(result.data).toBeNullable()
    expect(result.error).toBeNullable()
  })
})
