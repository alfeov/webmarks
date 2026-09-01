import { Badge } from '@/shared/ui/badge'
import { Field, FieldError, FieldLabel } from '@/shared/ui/field'
import { Input } from '@/shared/ui/input'

interface InputFieldProps extends React.ComponentProps<'input'> {
  label: string
  badgeLabel: string
  errors?: string[]
  className?: string
}

export function BadgeField({
  label,
  badgeLabel,
  errors,
  className,
  ...props
}: InputFieldProps) {
  return (
    <Field data-invalid={Boolean(errors?.length)} className={className}>
      <div className='flex gap-[10px]'>
        <FieldLabel>{label}</FieldLabel>
        <Badge>{badgeLabel}</Badge>
      </div>
      <Input aria-invalid={Boolean(errors?.length)} {...props} />
      <FieldError errors={errors?.map((error) => ({ message: error }))} />
    </Field>
  )
}
