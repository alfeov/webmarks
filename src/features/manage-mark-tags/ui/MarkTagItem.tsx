import { Tag } from '@/shared/lib/prisma/generated/client'
import { Checkbox } from '@/shared/ui/checkbox'
import { Field, FieldLabel } from '@/shared/ui/field'

type MarkTagItemProps = Pick<Tag, 'id' | 'title'> & {
  defaultChecked?: boolean
}

export function MarkTagItem({ defaultChecked, id, title }: MarkTagItemProps) {
  return (
    <FieldLabel>
      <Field orientation='horizontal' aria-label='Toggle tag'>
        <Checkbox
          name={`tagId-${id}`}
          value={id}
          defaultChecked={defaultChecked}
        />
        <FieldLabel>{title}</FieldLabel>
      </Field>
    </FieldLabel>
  )
}
