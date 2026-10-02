import z from 'zod'

export const UrlSchema = z.url('url.invalid').max(2048, 'url.max')
