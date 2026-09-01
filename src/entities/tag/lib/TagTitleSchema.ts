import z from 'zod'

export const TagTitleSchema = z.string().trim().min(2, 'At least 2 characters')
