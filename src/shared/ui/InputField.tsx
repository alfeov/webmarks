import { Field, FieldError, FieldLabel } from '@/shared/ui/field'
import { Input } from '@/shared/ui/input'

interface InputFieldProps extends React.ComponentProps<'input'> {
  label: string
  req?: boolean
  errors?: string[]
  className?: string
}

export function InputField({
  label,
  errors,
  req = false,
  className,
  ...props
}: InputFieldProps) {
  return (
    <Field data-invalid={Boolean(errors?.length)} className={className}>
      <FieldLabel
        className={req ? "after:content-['*'] after:text-red-500" : ''}
      >
        {label}
      </FieldLabel>
      <Input aria-invalid={Boolean(errors?.length)} {...props} />
      <FieldError errors={errors?.map((error) => ({ message: error }))} />
    </Field>
  )
}
