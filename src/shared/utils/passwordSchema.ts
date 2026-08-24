import z from 'zod'

export const passwordSchema = z
  .string()
  .regex(/^[A-Za-z0-9]+$/, 'Only english letters and numbers allowed')
  .regex(/[A-Z]/, 'At least one uppercase letter')
  .regex(/[0-9]/, 'At least one digit')
  .min(8, 'At least 8 characters')
