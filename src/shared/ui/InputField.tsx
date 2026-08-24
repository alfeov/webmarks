import { Field, FieldError, FieldLabel } from '@/shared/ui/field'
import { Input } from '@/shared/ui/input'

interface InputFieldProps extends React.ComponentProps<'input'> {
  label: string
  error?: string
  className?: string
}

export function InputField({
  label,
  error,
  className,
  ...props
}: InputFieldProps) {
  return (
    <Field data-invalid={!!error} className={className}>
      <FieldLabel>{label}</FieldLabel>
      <Input aria-invalid={!!error} {...props} />
      <FieldError>{error}</FieldError>
    </Field>
  )
}
