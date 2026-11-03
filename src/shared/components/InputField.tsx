import { useTranslations } from 'next-intl'
import { useId } from 'react'

import { Field, FieldError, FieldLabel } from '@/shared/ui/field'
import { Input } from '@/shared/ui/input'

interface InputFieldProps extends React.ComponentProps<'input'> {
  label: string
  req?: boolean
  errors?: string[]
}

export function InputField({
  name,
  label,
  errors,
  req = false,
  className,
  ...props
}: InputFieldProps) {
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
      <Input
        id={id}
        data-testid={`${name}-input`}
        name={name}
        aria-invalid={Boolean(errors?.length)}
        {...props}
      />
      <FieldError
        data-testid={`${name}-error`}
        errors={errors?.map((error) => ({ message: t(error) }))}
      />
    </Field>
  )
}
