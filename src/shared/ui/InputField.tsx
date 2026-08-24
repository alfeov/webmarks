import { Field, FieldError, FieldLabel } from '@/shared/ui/field'
import { Input } from '@/shared/ui/input'

interface InputFieldProps extends React.ComponentProps<'input'> {
  label: string
  errors?: string[]
  className?: string
}

export function InputField({
  label,
  errors,
  className,
  ...props
}: InputFieldProps) {
  return (
    <Field data-invalid={Boolean(errors?.length)} className={className}>
      <FieldLabel>{label}</FieldLabel>
      <Input aria-invalid={Boolean(errors?.length)} {...props} />
      <FieldError errors={errors?.map((error) => ({ message: error }))} />
    </Field>
  )
}
