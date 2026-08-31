import z from 'zod'

export const CUIDsSchema = z.array(z.cuid2())
