import { useTranslations } from 'next-intl'
import { useId } from 'react'

import { Field, FieldError, FieldLabel } from '@/shared/ui/field'
import { Textarea } from '@/shared/ui/textarea'

interface TextareaFieldProps extends React.ComponentProps<'textarea'> {
  label: string
  req?: boolean
  errors?: string[]
}

export function TextareaField({
  label,
  errors,
  req = false,
  className,
  ...props
}: TextareaFieldProps) {
  const id = useId()
  const t = useTranslations('errors')

  return (
    <Field data-invalid={Boolean(errors?.length)} className={className}>
      <FieldLabel
        htmlFor={id}
        className={req ? "after:text-red-500 after:content-['*']" : ''}
      >
        {label}
      </FieldLabel>
      <Textarea id={id} aria-invalid={Boolean(errors?.length)} {...props} />
      <FieldError errors={errors?.map((error) => ({ message: t(error) }))} />
    </Field>
  )
}
