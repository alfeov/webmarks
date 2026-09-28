import { Field, FieldError, FieldLabel } from '@/shared/ui/field'

import { Textarea } from './textarea'

interface TextareaFieldProps extends React.ComponentProps<'textarea'> {
  label: string
  req?: boolean
  errors?: string[]
  className?: string
}

export function TextareaField({
  label,
  errors,
  req = false,
  className,
  ...props
}: TextareaFieldProps) {
  return (
    <Field data-invalid={Boolean(errors?.length)} className={className}>
      <FieldLabel
        className={req ? "after:text-red-500 after:content-['*']" : ''}
      >
        {label}
      </FieldLabel>
      <Textarea aria-invalid={Boolean(errors?.length)} {...props} />
      <FieldError errors={errors?.map((error) => ({ message: error }))} />
    </Field>
  )
}
