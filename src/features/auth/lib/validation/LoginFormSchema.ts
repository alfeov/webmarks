import z from 'zod'

import { PasswordSchema } from '@/shared/utils/PasswordSchema'

import { LOGIN_FORMDATA } from '../constants'

export const LoginFormSchema = z.object({
  [LOGIN_FORMDATA.EMAIL]: z.email('Email is not correct'),
  [LOGIN_FORMDATA.PASSWORD]: PasswordSchema,
})
