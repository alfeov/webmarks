import z from 'zod'

export const MAX_URL_LENGTH = 2048

export const UrlSchema = z
  .url('url.invalid')
  .max(MAX_URL_LENGTH, 'url.maxLength')
