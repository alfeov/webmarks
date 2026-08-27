import z from 'zod'

export const MarkFormSchema = z.object({
  title: z.string().min(3, 'At least 3 characters'),
  url: z.url('Not correct URL'),
  description: z.string().min(10, 'At least 10 characters'),
  logoUrl: z.string().optional(),
})
