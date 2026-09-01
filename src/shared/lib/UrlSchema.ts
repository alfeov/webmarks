import z from 'zod'

export const UrlSchema = z
  .url('Not correct URL')
  .max(2048, 'Maximum 2048 characters')
